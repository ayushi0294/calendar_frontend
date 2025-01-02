import { useCallback, useEffect, useState } from "react";
import moment from "moment";

const useEventHandlers = (appointments) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    initializeEvents();
  }, [appointments]);

  const initializeEvents = useCallback(() => {
    const formattedEvents = appointments.map((appt) => ({
      ...appt,
      id: appt._id,
      title: `PatientName :${appt.patientName} - Diagonis :${appt.diagnosis?.details || "No Diagnosis"}
      Time: ${moment(appt.startDate).format("hh:mm A")}`,
      start: new Date(appt.startDate),
      end: new Date(appt.endDate),
    }));
    setEvents(formattedEvents);
}, [appointments]); 

  return { events, setEvents, initializeEvents };
};

export default useEventHandlers;
