const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["hr", "employee"],
    default: "employee"
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
