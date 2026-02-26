const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const hr = require("../middlewares/hrMiddleware");
const {
  generatePayroll,
  getMyPayroll,
  getAllPayrolls
} = require("../controllers/payrollController");
router.post("/", auth, hr, generatePayroll);
router.get("/all", auth, hr, getAllPayrolls);
router.get("/me", auth, getMyPayroll);
module.exports = router;
