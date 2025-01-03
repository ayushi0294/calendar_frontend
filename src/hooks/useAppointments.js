import { useState, useEffect, useCallback } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';

const useAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors,setDoctors]=useState([])

  // Fetch appointments from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await apiGet('/appointments');
        setAppointments(data);
      } catch (error) {
        console.error('Failed to fetch appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  // Add a new appointment
  const addAppointment = async (newAppointment) => {
    try {
      const savedAppointment = await apiPost('/appointments', newAppointment);
      setAppointments((prev) => [...prev, savedAppointment]);
    } catch (error) {
      console.error('Failed to add appointment:', error);
    }
  };

  // Update an existing appointment
  const updateAppointment = async (id, updatedData) => {
    try {
      await apiPut(`/appointments/${id}`, updatedData);
      setAppointments((prev) =>
        prev.map((appt) => (appt._id === id ? { ...appt, ...updatedData } : appt))
      );
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  // Delete an appointment
  const deleteAppointment = async (id) => {
    try {
      await apiDelete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const fetchDoctors = useCallback(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet('/users'); // Replace with your actual API call function
        setDoctors(data); // Assuming setDoctors is a state setter
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
  
    fetchData(); // Call the async function
  }, []); 
 
  return { appointments, addAppointment, updateAppointment, deleteAppointment ,fetchDoctors ,doctors};
};

export default useAppointments;
