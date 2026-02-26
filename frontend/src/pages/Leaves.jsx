import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

const Leaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get("/leaves")
      .then(res => setLeaves(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div className="dashboard-card" onClick={() => setOpen(true)}>
        <h3>Leaves</h3>
        <p>Total: {leaves.length}</p>
      </div>

      {open && (
        <Modal title="Leave Details" onClose={() => setOpen(false)}>
          {leaves.map(l => (
            <p key={l._id}>
              {l.employeeId} – {l.reason}
            </p>
          ))}
        </Modal>
      )}
    </>
  );
};

export default Leaves;
