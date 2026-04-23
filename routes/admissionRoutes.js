const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");

const {
  addAdmission,
  getAdmissions,
  deleteAdmission,
} = require("../controllers/admissionController");

router.post("/", addAdmission);
router.get("/", verifyToken, getAdmissions);
router.delete("/:id", verifyToken, deleteAdmission);

module.exports = router;