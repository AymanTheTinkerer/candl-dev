import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.get("/", (_req, res) => {
  res.type("text/plain").send("Candl AP");
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
