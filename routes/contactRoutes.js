const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const {
  addContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.post("/", addContact);
router.get("/", verifyToken, getContacts);
router.delete("/:id", verifyToken, deleteContact);

module.exports = router;