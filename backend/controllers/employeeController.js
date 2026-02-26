const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");


const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

exports.addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email } = req.body;

    if (!employeeId || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      role: "employee"
    });

    res.status(201).json({
      message: "Employee added successfully",
      loginPassword: plainPassword,
      employee
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find({ role: "employee" }).select("-password");
  res.json(employees);
};
