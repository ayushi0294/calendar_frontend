import React, { useState } from "react";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import "./AppointmentModal.css"; // Import custom CSS

const AppointmentModal = ({ closeModal, onSave ,doctors }) => {
  const [formData, setFormData] = useState({
    doctorId: '',
    patientName: "",
    startDate: new Date(),
    endDate: new Date(),
    type: "",
    diagnosis: {
      details: "",
      code: "",
      notes: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("diagnosis.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        diagnosis: { ...formData.diagnosis, [field]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDateChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const isEndDateValid = (current) => {
    return current.isSameOrAfter(formData.startDate);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      alert("End date must be greater than the start date.");
      return;
    }
    onSave(formData);
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">Add Appointment</h3>
        </div>
        <form onSubmit={handleSubmit} className="form">
          {/* Patient Name and Appointment Type */}
          <div className="form-row">
            <div className="form-group">
              <label>Patient Name</label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Enter patient name"
                required
              />
            </div>
            <div className="form-group">
              <label>Appointment Type</label>
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                placeholder="Enter appointment type"
                required
              />
            </div>
          </div>

          {/* Start and End Dates */}
          <div className="form-row">
            <div className="form-group">
              <label>Start Date and Time</label>
              <Datetime
                value={formData.startDate}
                onChange={(value) => handleDateChange("startDate", value)}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date and Time</label>
              <Datetime
                value={formData.endDate}
                onChange={(value) => handleDateChange("endDate", value)}
                isValidDate={isEndDateValid}
                required
              />
            </div>
          </div>

            {/* Doctor Selection Dropdown */}
            <div className="form-row">
            <div className="form-group">
              <label>Doctor</label>
              <select
                name="doctorId" // Use doctorId instead of doctorName
                value={formData.doctorId}
                onChange={handleChange}
                required
              >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}> {/* Use doctor._id as value */}
                    {doctor.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Diagnosis Section */}
          <fieldset className="diagnosis-fieldset">
            <legend>Diagnosis</legend>
            <div className="form-group">
              <label>Details</label>
              <textarea
                name="diagnosis.details"
                value={formData.diagnosis.details}
                onChange={handleChange}
                placeholder="Enter diagnosis details"
                required
              />
            </div>
            <div className="form-group">
              <label>Diagnosis Code (Optional)</label>
              <input
                type="text"
                name="diagnosis.code"
                value={formData.diagnosis.code}
                onChange={handleChange}
                placeholder="Enter diagnosis code"
              />
            </div>
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea
                name="diagnosis.notes"
                value={formData.diagnosis.notes}
                onChange={handleChange}
                placeholder="Enter additional notes"
              />
            </div>
          </fieldset>

          {/* Action Buttons */}
          <div className="form-actions">
            <button type="button" onClick={closeModal} className="btn cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
