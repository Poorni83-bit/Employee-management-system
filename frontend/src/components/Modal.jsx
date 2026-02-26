import "./modal.css";

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{title}</h3>
        <div className="modal-content">{children}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
