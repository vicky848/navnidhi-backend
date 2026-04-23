// const express = require("express");
// const router = express.Router();
// const multer = require("multer");

// const {
//   addCareer,
//   getCareers,
//   deleteCareer
// } = require("../controllers/careerController")

// const verifyToken =require("../middleware/verifyToken")

// // multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// // routes
// router.post("/", upload.single("resume"), addCareer);
// router.get("/", verifyToken, getCareers);
// router.delete("/:id", verifyToken, deleteCareer);

// module.exports = router;