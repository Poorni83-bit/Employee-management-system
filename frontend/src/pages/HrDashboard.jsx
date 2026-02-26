import { useState } from "react";
import api from "../services/api";
import Card from "../components/Card";
import "../styles/dashboard.css";

export default function HrDashboard() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");


  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    employeeId: "",
    email: "",
    role: "employee",
  });

  const hiddenFields = ["_id", "__v", "password"];

  const fetchData = async (endpoint, pageTitle) => {
    try {
      setError("");
      const res = await api.get(endpoint);
      setData(res.data || []);
      setTitle(pageTitle);
    } catch (err) {
      console.error(err);
      setError("Failed to load data");
      setData([]);
    }
  };

  const formatHeader = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (isNaN(date)) return value;
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (val) =>
    typeof val === "number" ? Math.round(val) : val ?? "—";

  
  const handleCreateEmployee = async () => {
    try {
      await api.post("/employees", newEmployee);
      setShowModal(false);
      fetchData("/employees", "Employees");
      setNewEmployee({
        name: "",
        employeeId: "",
        email: "",
        role: "employee",
      });
    } catch (err) {
      alert("Failed to create employee");
    }
  };

  return (
    <div className="dashboard">
      <h2>HR Dashboard</h2>

      <div className="card-grid">
        <Card title="Employees" onClick={() => fetchData("/employees", "Employees")} />
        <Card title="Attendance" onClick={() => fetchData("/attendance", "Attendance")} />
        <Card title="Leaves" onClick={() => fetchData("/leave", "Leaves")} />
        <Card title="Payroll" onClick={() => fetchData("/payroll/all", "Payroll")} />
      </div>

     
      {title === "Employees" && (
        <div style={{ margin: "10px 0" }}>
          <button onClick={() => setShowModal(true)}>
             Create Employee
          </button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data.length > 0 && (
        <>
          <h3>{title}</h3>

          <table>
            <thead>
              <tr>
                <th>Name</th>

                {title === "Attendance" && (
                  <>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                  </>
                )}

                {title === "Leaves" && (
                  <>
                    <th>Status</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Reason</th>
                  </>
                )}

                {title === "Payroll" && (
                  <>
                    <th>Salary Month</th>
                    <th>Basic Salary</th>
                    <th>Allowance</th>
                    <th>Deduction</th>
                    <th>Gross Salary</th>
                    <th>Tax Amount</th>
                    <th>PF Amount</th>
                    <th>Net Salary</th>
                  </>
                )}

                {title === "Employees" &&
                  Object.keys(data[0])
                    .filter((key) => !hiddenFields.includes(key))
                    .map((key) => (
                      <th key={key}>{formatHeader(key)}</th>
                    ))}
              </tr>
            </thead>

            <tbody>
              {data
                .filter((row) => title !== "Payroll" || row.salaryMonth)
                .map((row, i) => (
                  <tr key={i}>
                    <td>{row.employeeId?.name || row.name || "Arun"}</td>

                    {title === "Attendance" && (
                      <>
                        <td>{formatDate(row.date)}</td>
                        <td>{row.checkIn }</td>
                        <td>{row.checkOut }</td>
                      </>
                    )}

                    {title === "Leaves" && (
                      <>
                        <td>{row.status}</td>
                        <td>{formatDate(row.fromDate)}</td>
                        <td>{formatDate(row.toDate)}</td>
                        <td>{row.reason}</td>
                      </>
                    )}

                    {title === "Payroll" && (
                      <>
                        <td>{row.salaryMonth}</td>
                        <td>{formatNumber(row.basicSalary)}</td>
                        <td>{formatNumber(row.allowance)}</td>
                        <td>{formatNumber(row.deduction)}</td>
                        <td>{formatNumber(row.grossSalary)}</td>
                        <td>{formatNumber(row.taxAmount)}</td>
                        <td>{formatNumber(row.pfAmount)}</td>
                        <td>{formatNumber(row.netSalary)}</td>
                      </>
                    )}

                    {title === "Employees" &&
                      Object.keys(row)
                        .filter((key) => !hiddenFields.includes(key))
                        .map((key, j) => (
                          <td key={j}>{row[key]}</td>
                        ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create Employee</h3>

            <input
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
            />

            <input
              placeholder="Employee ID"
              value={newEmployee.employeeId}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, employeeId: e.target.value })
              }
            />

            <input
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
            />

            <select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>

            <div style={{ marginTop: "10px" }}>
              <button onClick={handleCreateEmployee}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
