const express = require("express");
const router = express.Router();
const {
  addEmployee,
  getEmployees
} = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware");
const hrMiddleware = require("../middlewares/hrMiddleware");
router.post("/", authMiddleware, hrMiddleware, addEmployee);
router.get("/", authMiddleware, hrMiddleware, getEmployees);
module.exports = router;
