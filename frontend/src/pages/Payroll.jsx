import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

const Payroll = () => {
  const [payroll, setPayroll] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("/payroll")
      .then(res => setPayroll(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="dashboard-card" onClick={() => setOpen(true)}>
        <h3>Payroll</h3>
        <p>Processed: {payroll.length}</p>
      </div>

      {open && (
        <Modal title="Payroll Details" onClose={() => setOpen(false)}>
          {payroll.map(p => (
            <p key={p._id}>
              {p.employeeId} – ₹{p.salary}
            </p>
          ))}
        </Modal>
      )}
    </>
  );
};

export default Payroll;
