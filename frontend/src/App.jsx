import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HrDashboard from "./pages/HrDashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/hr" element={<HrDashboard />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/leaves" element={<Leaves />} />
      <Route path="/payroll" element={<Payroll />} />
    </Routes>
  );
}

export default App;
