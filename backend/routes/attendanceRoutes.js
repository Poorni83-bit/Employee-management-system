const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  markAttendance,
  getAttendance
} = require("../controllers/attendanceController");

router.post("/", auth, markAttendance);
router.get("/", auth, getAttendance);

module.exports = router;
