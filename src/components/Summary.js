import React from "react";
import useAppointments from "../hooks/useAppointments";
import "./SummaryPage.css"; // Import custom CSS

const SummaryPage = () => {
  const { appointments } = useAppointments();

  return (
    <div className="summary-page-container">
      <div className="summary-page-inner">
        <h1 className="summary-title">Upcoming Appointments</h1>
        {appointments.length === 0 ? (
          <p className="no-appointments">No upcoming appointments available.</p>
        ) : (
          <div className="appointments-table-container">
            <table className="appointments-table">
              <thead>
                <tr className="table-header">
                  <th className="table-cell">Patient Name</th>
                  <th className="table-cell">Time</th>
                  <th className="table-cell">Diagnosis Details</th>
                  <th className="table-cell">Diagnosis Notes</th>
                  <th className="table-cell">Doctor Name</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr
                    key={appointment._id}
                    className={`table-row ${index % 2 === 0 ? "even-row" : "odd-row"}`}
                  >
                    <td className="table-cell">{appointment.patientName}</td>
                    <td className="table-cell">
                      {new Date(appointment.startDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(appointment.endDate).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="table-cell">
                      {appointment.diagnosis.details || "N/A"}
                    </td>
                    <td className="table-cell">
                      {appointment.diagnosis.notes || "N/A"}
                    </td>
                    <td className="table-cell">{appointment.doctorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;
