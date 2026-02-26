const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const hr = require("../middlewares/hrMiddleware");
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus
} = require("../controllers/leaveController");
router.post("/", auth, applyLeave);
router.get("/my", auth, getMyLeaves);
router.get("/", auth, hr, getAllLeaves);
router.put("/:leaveId", auth, hr, updateLeaveStatus);

module.exports = router;
