import { Link } from "react-router-dom";
// import "./sidebar.css";

export default function Sidebar({ open, toggle }) {
  return (
    <div className={`sidebar ${open ? "open" : ""}`}>
      <h2>Upturn</h2>

      <nav>
        <Link to="/hr">Dashboard</Link>
        <Link to="/attendance">Attendance</Link>
        <Link to="/leave">Leave</Link>
        <Link to="/payroll">Payroll</Link>
      </nav>

      <button className="close-btn" onClick={toggle}>✖</button>
    </div>
  );
}
