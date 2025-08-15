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
const db = new Low(adapter, { users: [], createdVaccinesCount: 0 }); // ✅ Default data here


// Initialize database with default data and admin account
(async () => {
  await db.read();

  // If db is empty, set defaults
  db.data ||= { users: [], createdVaccinesCount: 0 };

  // Add admin if missing
  const adminUser = db.data.users.find(u => u.username === "admin");
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash("amzone", 10);
    db.data.users.push({ username: "admin", password: hashedPassword, role: "admin" });
    await db.write();
    console.log("Admin account created");
  }
})();


// Middleware
app.use(express.json());
app.use(cors());

// ===== API ROUTES =====

// Signup endpoint
app.post("/api/signup", async (req, res) => {
  await db.read();
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const existingUser = db.data.users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  db.data.users.push({ username, password: hashedPassword, role: "user" });
  await db.write();
  res.json({ message: "Signup successful" });
});

// Signin endpoint
app.post("/api/signin", async (req, res) => {
  await db.read();
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Signin successful", role: user.role });
});

// ===== SERVE REACT FRONTEND =====
app.use(express.static(path.join(__dirname, "client", "build"))); // change "client" to your React folder name

// Catch-all for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
