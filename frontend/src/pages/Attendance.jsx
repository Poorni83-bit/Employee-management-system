import { useEffect, useState } from "react";
import api from "../services/api";
import Modal from "../components/Modal";

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get("/attendance");
        setRecords(res.data);
      } catch (err) {
        console.error("Attendance error:", err.response?.data || err.message);
      }
    };
    fetchAttendance();
  }, []);

  return (
    <>
      <div className="dashboard-card" onClick={() => setOpen(true)}>
        <h3>Attendance</h3>
        <p>Records: {records.length}</p>
      </div>

      {open && (
        <Modal title="Attendance Details" onClose={() => setOpen(false)}>
          {records.length === 0 ? (
            <p>No attendance records found</p>
          ) : (
            records.map(a => (
              <p key={a._id}>
                Employee: {a.employeeId?.name || a.employeeId} | Status: {a.status}
              </p>
            ))
          )}
        </Modal>
      )}
    </>
  );
};

export default Attendance;
