import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import AppointmentModal from "./AppointmentModal";
import useAppointments from "../hooks/useAppointments";
import useEventHandlers from "../hooks/useEventHandlers";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import "./CalendarComponent.css"; // Import your custom CSS

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = () => {
  const { appointments, addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const { events, setEvents } = useEventHandlers(appointments);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvent = { ...event, startDate: start, endDate: end };
    updateAppointment(event.id, updatedEvent);
  };

  const handleDeleteEvent = async () => {
    try {
      setEvents((prev) => prev.filter(({ id }) => id !== deleteEvent.id));
      await deleteAppointment(deleteEvent.id);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      setEvents((prev) => [...prev, deleteEvent]);
    } finally {
      setDeleteEvent(null);
    }
  };

  return (
    <div className="calendar-container">
      <header className="calendar-header">
        <h2 className="calendar-title">Appointment Calendar</h2>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setModalIsOpen(true);
          }}
          className="add-appointment-btn"
        >
          Add Appointment
        </button>
      </header>

      <DnDCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectEvent={(event) => setDeleteEvent(event)}
        onEventDrop={handleEventDrop}
        draggableAccessor={() => true}
      />

      {/* Appointment Modal */}
      {modalIsOpen && (
        <AppointmentModal
          closeModal={() => setModalIsOpen(false)}
          onSave={addAppointment}
          event={selectedEvent}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteEvent && (
        <DeleteConfirmationModal
          event={deleteEvent}
          onConfirm={handleDeleteEvent}
          onCancel={() => setDeleteEvent(null)}
        />
      )}
    </div>
  );
};

export default CalendarComponent;
