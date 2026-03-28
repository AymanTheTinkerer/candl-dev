import "dotenv/config";
import express from "express";
import { supabase } from "./supabase.js";
import twilio from "twilio";
import jwt from "jsonwebtoken";

const app = express();
const port = Number(process.env.PORT) || 3001;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
const twilioClient = twilio(accountSid, authToken);

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";
const JWT_EXPIRES_IN = "24h";

app.use(express.json());

// Log every request and response status
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} - ${ms}ms`);
  });
  next();
});

app.get("/", (_req, res) => {
  res.type("text/plain").send("Candl API");
});

// Helper: Auth middleware
function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  console.log("Auth header:", auth);
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing or invalid token" });
  try {
    const token = auth.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

app.get("/users", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from("users").select("*").eq("id", req.user.userId).single();
    if (error) return res.status(500).json({ error: error.message });
    res.json(data ?? {});
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.get("/reminders", requireAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from("reminders").select("*").eq("user_id", req.user.userId);
    if (error) return res.status(500).json({ error: error.message });
    res.json(data ?? []);
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.post("/addreminder", requireAuth, async (req, res) => {
  const { name, birthday } = req.body;
  const user_id = req.user.userId;
  const notify_days_before = 3;
  try {
    const { data, error } = await supabase.from("reminders").insert([
      { user_id, name, birthday, notify_days_before }
    ]).select();
    if (error) return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.post("/verify-phone", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Phone number required" });
  try {
    const verification = await twilioClient.verify.v2.services(verifyServiceSid)
      .verifications.create({ to: phone, channel: "sms" });
    res.json({ sid: verification.sid, status: verification.status });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.post("/verify-phone-check", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ error: "Phone and code required" });
  try {
    const verification_check = await twilioClient.verify.v2.services(verifyServiceSid)
      .verificationChecks.create({ to: phone, code });
    if (verification_check.status === "approved") {
      // Check if user exists
      const { data: existing, error: findErr } = await supabase.from("users").select("id").eq("phone", phone).single();
      if (findErr && findErr.code !== 'PGRST116') return res.status(500).json({ error: findErr.message });
      let userId = existing?.id;
      if (!userId) {
        // Create new user
        const { data: newUser, error: insertErr } = await supabase.from("users").insert([{ phone }]).select("id").single();
        if (insertErr) return res.status(500).json({ error: insertErr.message });
        userId = newUser.id;
      }
      // Issue JWT token
      const token = jwt.sign({ userId, phone }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      return res.json({ status: verification_check.status, userId, token });
    } else {
      return res.json({ status: verification_check.status });
    }
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
