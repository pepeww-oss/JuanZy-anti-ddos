const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();
const port = 3000;

app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 30,
  message: { status: 429, error: "Terlalu banyak permintaan. Silakan coba lagi nanti." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/api", (req, res) => {
  res.json({ message: "Halo! Server kamu aman dari DDoS 🚀" });
});

app.listen(port, () => console.log(`🛡️ JuanZy Anti-DDoS aktif di http://localhost:${port}`));
