const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

// Create Admin
const createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO admins (email, password) VALUES (?, ?)",
      [email, hashedPassword],
      function (err) {
        if (err) return res.status(500).send("Admin already exists");
        res.send("✅ Admin Created");
      }
    );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Login Admin
const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT * FROM admins WHERE email = ?",
    [email],
    async (err, user) => {
      if (err) return res.status(500).send(err.message);
      if (!user) return res.status(400).send("Invalid Email");

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) return res.status(400).send("Wrong Password");

      const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login Successful",
        token,
      });
    }
  );
};

module.exports = { createAdmin, loginAdmin };