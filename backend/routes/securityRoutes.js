const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const hr = require("../middlewares/hrMiddleware");
const {
  addSecurityLog,
  getSecurityLogs
} = require("../controllers/securityController");
router.post("/", auth, addSecurityLog);
router.get("/", auth, hr, getSecurityLogs);
module.exports = router;
