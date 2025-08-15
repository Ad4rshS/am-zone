const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");

const app = express();
const PORT = process.env.PORT || 3000;

// Setup lowdb
const dbFile = path.join(__dirname, "db.json");
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { users: [], createdVaccinesCount: 0 });

// Initialize database with default data and admin account
(async () => {
  await db.read();
  db.data ||= { users: [], createdVaccinesCount: 0 };

  // Add admin if missing (using email instead of username)
  const adminUser = db.data.users.find(u => u.email === "adarsh@amzone.com");
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash("password123", 10);
    db.data.users.push({ email: "adarsh@amzone.com", password: hashedPassword, role: "admin" });
    await db.write();
    console.log("Admin account created");
  }
})();

// Middleware
app.use(express.json());
app.use(cors());

// ===== API ROUTES =====
app.post("/api/signup", async (req, res) => {
  await db.read();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const existingUser = db.data.users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  db.data.users.push({ email, password: hashedPassword, role: "user" });
  await db.write();
  res.json({ message: "Signup successful" });
});

app.post("/api/signin", async (req, res) => {
  await db.read();
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Signin successful", role: user.role });
});

// ===== SERVE VITE FRONTEND =====
app.use(express.static(path.join(__dirname, "../dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
