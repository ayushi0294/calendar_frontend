import React from "react";
import "./DeleteConfirmationModal.css"; // Import the custom CSS file

const DeleteConfirmationModal = ({ event, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-title">Delete Appointment</h3>
        <p className="modal-message">
          Are you sure you want to delete the appointment for:{" "}
          <span className="modal-highlight">{event.title}</span>?
        </p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn cancel-btn">
            No
          </button>
          <button onClick={onConfirm} className="btn confirm-btn">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
