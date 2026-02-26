const express = require("express");
const router = express.Router();

const {
  createHR,
  login
} = require("../controllers/authController");
router.post("/create-hr", createHR);
router.post("/login", login);
module.exports = router;
