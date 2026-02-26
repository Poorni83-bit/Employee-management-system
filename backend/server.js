const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const payrollRoutes = require("./routes/payrollRoutes");
const securityRoutes = require("./routes/securityRoutes");
const authRoutes = require("./routes/authRoutes");
connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/payroll", payrollRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, () =>
  console.log("Server running on port", process.env.PORT)
);
