const SecurityLog = require("../models/SecurityLog");
exports.addSecurityLog = async (req, res) => {
  try {
    const log = await SecurityLog.create({
      employeeId: req.user.id,
      location: req.body.location,
      wifi: req.body.wifi,
      verified: true
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getSecurityLogs = async (req, res) => {
  try {
    const logs = await SecurityLog.find();
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
