const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.createHR = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingHR = await Employee.findOne({ role: "hr" });
    if (existingHR) {
      return res.status(400).json({ message: "HR already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const hr = await Employee.create({
      name,
      email,
      password: hashedPassword,
      role: "hr"
    });

    res.status(201).json({
      message: "HR created successfully",
      hr: { id: hr._id, email: hr.email }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
console.log("JWT_SECRET:", process.env.JWT_SECRET);
