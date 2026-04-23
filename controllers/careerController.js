// const db = require("../db");

// const addCareer = (req, res) => {
//   const { name, email, mobile, position } = req.body;
//   const resume = req.file ? req.file.filename : null;

//   db.run(
//     `INSERT INTO careers (name, email, mobile, position, resume)
//      VALUES (?, ?, ?, ?, ?)`,
//     [name, email, mobile, position, resume],
//     function (err) {
//       if (err) {
//         console.log(err);
//         return res.status(500).send("Database Error");
//       }
//       res.send("Application Submitted");
//     }
//   );
// };

// const getCareers = (req, res) => {
//   db.all("SELECT * FROM careers ORDER BY id DESC", [], (err, rows) => {
//     if (err) return res.status(500).send(err.message);
//     res.json(rows);
//   });
// };

// const deleteCareer = (req, res) => {
//   const { id } = req.params;

//   db.run("DELETE FROM careers WHERE id = ?", [id], function (err) {
//     if (err) return res.status(500).send(err.message);
//     res.send("Deleted");
//   });
// };

// module.exports = {
//   addCareer,
//   getCareers,
//   deleteCareer,
// };