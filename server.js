require("dotenv").config();
const express = require("express");
const db = require("./db");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// app.use("/uploads", express.static("uploads"));

// Routes
app.use("/admin", require("./routes/adminRoutes"));
app.use("/admissions", require("./routes/admissionRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));
// app.use("/careers", require("./routes/careerRoutes"));

// Tables + Default Admin
db.serialize(() => {

  // Admin Table
  db.run(`CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  // Admission Table
  db.run(`CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    child_name TEXT,
    age INTEGER,
    gender TEXT,
    disability_type TEXT,
    parent_name TEXT,
    mobile_number TEXT,
    address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Contact Table
  db.run(`CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    mobile_number TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`)

  // Career Applications Table


//   db.run(`CREATE TABLE IF NOT EXISTS careers (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   name TEXT,
//   email TEXT,
//   mobile TEXT,
//   position TEXT,
//   resume TEXT,
//   created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// )`);

  // 🔥 Default Admin Insert (IMPORTANT)
  db.get("SELECT * FROM admins WHERE email = ?", [process.env.ADMIN_EMAIL], async (err, user) => {
    if (!user) {
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

      db.run(
        "INSERT INTO admins (email, password) VALUES (?, ?)",
        [process.env.ADMIN_EMAIL , hashedPassword],
        () => console.log("✅ Default Admin Created")
      );
    }
  });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));