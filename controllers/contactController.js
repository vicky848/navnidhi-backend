const db = require("../db");

const addContact = (req, res) => {
  const { name, mobile_number, message } = req.body;

  db.run(
    "INSERT INTO contacts (name, mobile_number, message) VALUES (?, ?, ?)",
    [name, mobile_number, message],
    function (err) {
      if (err) return res.status(500).send(err.message);
      res.send("✅ Message Saved");
    }
  );
};

const getContacts = (req, res) => {
  db.all("SELECT * FROM contacts ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
};

const deleteContact = (req, res) => {
  db.run("DELETE FROM contacts WHERE id = ?", [req.params.id], function (err) {
    if (err) return res.status(500).send(err.message);
    res.send("🗑️ Deleted");
  });
};

module.exports = { addContact, getContacts, deleteContact };