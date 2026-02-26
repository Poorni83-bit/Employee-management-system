const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Attendance",
  new mongoose.Schema({
    
    date: String,
    checkIn: String,
    checkOut: String
  })
);
