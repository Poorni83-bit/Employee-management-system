const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  month: {
    type: String, 
    required: true
  },
  baseSalary: {
    type: Number,
    required: true
  },
  workingDays: {
    type: Number,
    required: true
  },
  leaveDays: {
    type: Number,
    required: true
  },
  lopAmount: {
    type: Number
  },
  netSalary: {
    type: Number
  }
}, { timestamps: true });

module.exports = mongoose.model("Payroll", payrollSchema);
