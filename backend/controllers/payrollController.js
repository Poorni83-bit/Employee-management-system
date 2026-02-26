const Payroll = require("../models/Payroll");
exports.generatePayroll = async (req, res) => {
  try {
    const {
      employeeId,
      month,
      baseSalary,
      workingDays,
      leaveDays
    } = req.body;

    const perDaySalary = baseSalary / workingDays;
    const lopAmount = perDaySalary * leaveDays;
    const netSalary = baseSalary - lopAmount;

    const payroll = await Payroll.create({
      employeeId,
      month,
      baseSalary,
      workingDays,
      leaveDays,
      lopAmount,
      netSalary
    });

    res.status(201).json({
      message: "Payroll generated successfully",
      payroll
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.find({ employeeId: req.user.id });
    res.json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find()
      .populate("employeeId", "name email");
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
