const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const { Low, JSONFile } = require("lowdb");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Setup lowdb
const db = new Low(new JSONFile(path.join(__dirname, "db.json")));
db.data = db.data || { users: [] };

// Middleware
app.use(express.json());
app.use(cors()); // allow requests from frontend

// Signup endpoint
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = db.data.users.find(u => u.username === username);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  db.data.users.push({ username, password: hashedPassword });
  await db.write();
  res.json({ message: "Signup successful" });
});

// Signin endpoint
app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Signin successful" });
});

// Serve static files from dist
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all for frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
