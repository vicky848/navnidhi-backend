const db = require("../db");

// Add Admission
const addAdmission = (req, res) => {
  const {
    child_name,
    age,
    gender,
    disability_type,
    parent_name,
    mobile_number,
    address,
  } = req.body;

  const query = `
    INSERT INTO admissions 
    (child_name, age, gender, disability_type, parent_name, mobile_number, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    query,
    [
      child_name,
      age,
      gender,
      disability_type,
      parent_name,
      mobile_number,
      address,
    ],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send("✅ Admission Added");
    }
  );
};

// Get All
const getAdmissions = (req, res) => {
  db.all("SELECT * FROM admissions ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

// Delete
const deleteAdmission = (req, res) => {
  db.run("DELETE FROM admissions WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.send("🗑️ Deleted");
  });
};

module.exports = { addAdmission, getAdmissions, deleteAdmission };
