const express = require("express");
const router = express.Router();
const { login, createHR } = require("../controllers/authController");

router.post("/login", login);
router.post("/create-hr", createHR);

module.exports = router;
