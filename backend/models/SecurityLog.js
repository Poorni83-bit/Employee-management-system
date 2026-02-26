const mongoose = require("mongoose");

module.exports = mongoose.model(
  "SecurityLog",
  new mongoose.Schema({
    employeeId: String,
    location: String,
    wifi: String,
    verified: Boolean
  })
);
