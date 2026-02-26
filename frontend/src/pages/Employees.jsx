import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("/employees")
      .then(res => setEmployees(res.data))
      .catch(err => console.log(err));
  }, []); return (
    <>
      <div className="dashboard-card" onClick={() => setOpen(true)}>
        <h3>Employees</h3>
        <p>Total: {employees.length}</p>
      </div>

      {open && (
        <Modal title="Employee Details" onClose={() => setOpen(false)}>
          {employees.map(emp => (
            <p key={emp._id}>
              {emp.name} – {emp.role}
            </p>
          ))}
        </Modal>
      )}
    </>
  );
};

export default Employees;
