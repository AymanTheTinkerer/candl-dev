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

app.post("/send-birthday-reminders", requireAuth, async (req, res) => {
  try {
    // Get all reminders for the user
    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", req.user.userId);
    if (error) return res.status(500).json({ error: error.message });

    // Get user's phone number
    const { data: user, error: userErr } = await supabase
      .from("users")
      .select("phone")
      .eq("id", req.user.userId)
      .single();
    if (userErr) return res.status(500).json({ error: userErr.message });
    const userPhone = user.phone;

    // Filter reminders within notify_days_before
    const today = new Date();
    const upcoming = reminders.filter(r => {
      if (!r.birthday || !r.notify_days_before) return false;
      const bday = new Date(r.birthday);
      bday.setFullYear(today.getFullYear());
      if (bday < today) bday.setFullYear(today.getFullYear() + 1);
      const diffDays = Math.round((bday - today) / 86400000);
      return diffDays >= 0 && diffDays <= r.notify_days_before;
    });

    if (upcoming.length === 0) {
      console.log("No reminders met the criteria. No message sent.");
      return res.json({ message: "No upcoming birthdays within your notification window." });
    }

    // Compose message
    const msg = `Upcoming birthdays: ${upcoming.map(r => `${r.name} in ${(() => {
      const bday = new Date(r.birthday);
      bday.setFullYear(today.getFullYear());
      if (bday < today) bday.setFullYear(today.getFullYear() + 1);
      return Math.round((bday - today) / 86400000);
    })()} days`).join(", ")}`;

    // Send SMS via Twilio
    twilioClient.messages
      .create({
        body: msg,
        from: "+18335273433",
        to: userPhone
      })
      .then(message => {
        console.log("Twilio message SID:", message.sid);
        res.json({ message: "Message sent!" });
      })
      .catch(err => {
        console.error("Twilio error:", err);
        res.status(500).json({ error: "Failed to send SMS" });
      });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.post("/send-birthday-reminders-whatsapp", requireAuth, async (req, res) => {
  try {
    // Get all reminders for the user
    const { data: reminders, error } = await supabase
      .from("reminders")
      .select("*")
      .eq("user_id", req.user.userId);
    if (error) return res.status(500).json({ error: error.message });

    // Get user's phone number
    const { data: user, error: userErr } = await supabase
      .from("users")
      .select("phone")
      .eq("id", req.user.userId)
      .single();
    if (userErr) return res.status(500).json({ error: userErr.message });
    const userPhone = user.phone;

    // Filter reminders within notify_days_before
    const today = new Date();
    const upcoming = reminders.filter(r => {
      if (!r.birthday || !r.notify_days_before) return false;
      const bday = new Date(r.birthday);
      bday.setFullYear(today.getFullYear());
      if (bday < today) bday.setFullYear(today.getFullYear() + 1);
      const diffDays = Math.round((bday - today) / 86400000);
      return diffDays >= 0 && diffDays <= r.notify_days_before;
    });

    if (upcoming.length === 0) {
      console.log("No reminders met the criteria. No WhatsApp message sent.");
      return res.json({ message: "No upcoming birthdays within your notification window." });
    }

    // Compose WhatsApp message (parameter2) with date
    const msg = `Upcoming birthdays: ${upcoming.map(r => {
      const bday = new Date(r.birthday);
      bday.setFullYear(today.getFullYear());
      if (bday < today) bday.setFullYear(today.getFullYear() + 1);
      const dateStr = bday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      return `${r.name} on ${dateStr}`;
    }).join(", ")}`;

    // Send WhatsApp message via Twilio Content API
    twilioClient.messages
      .create({
        from: 'whatsapp:+14155238886',
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: JSON.stringify({
          "1": "Anything you want", // parameter1
          "2": msg // parameter2
        }),
        to: `whatsapp:${userPhone}`
      })
      .then(message => {
        console.log("Twilio WhatsApp message SID:", message.sid);
        res.json({ message: "WhatsApp message sent!" });
      })
      .catch(err => {
        console.error("Twilio WhatsApp error:", err);
        res.status(500).json({ error: "Failed to send WhatsApp message" });
      });
  } catch (e) {
    res.status(500).json({ error: e instanceof Error ? e.message : "Unknown error" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
