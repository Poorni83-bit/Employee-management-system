import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function EmployeeDashboard() {
  return (
    <>
      <Navbar />
      <div className="content">
        <h2>Employee Dashboard</h2>

        <div className="cards">
          <Card title="Attendance" description="Mark attendance" />
          <Card title="Leave" description="Apply leave" />
          <Card title="Payroll" description="View salary" />
        </div>
      </div>
    </>
  );
}
