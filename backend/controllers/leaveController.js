const Leave = require("../models/Leave");
exports.applyLeave = async (req, res) => {
  try {
    const leave = await Leave.create({
      employeeId: req.user.id,   
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      reason: req.body.reason
    });

    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.user.id });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "name email");
    const result = leaves.map((l) => ({
      name: l.employeeId?.name,   
      status: l.status,
      leaveType: l.leaveType,
      fromDate: l.fromDate,
      toDate: l.toDate,
      numberOfDays: l.numberOfDays,
      reason: l.reason
    }));
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body; 

    const leave = await Leave.findByIdAndUpdate(
      req.params.leaveId,        
      { status },
      { new: true }              
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
