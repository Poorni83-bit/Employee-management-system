const Attendance = require("../models/Attendance");
exports.markAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create({
      employeeId: req.user.id,
      date: req.body.date,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ employeeId: req.user.id });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
