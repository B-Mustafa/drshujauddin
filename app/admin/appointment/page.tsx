"use client"
import { useEffect, useState } from 'react';

// Define the type for an appointment
interface AppointmentData {
  _id: string;
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber: string;
  appointmentDate: string;
  complaints: string;
}

const Appointment = () => {
  // Use the AppointmentData interface to type the appointments state
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/appointments/create');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      {appointments.map((appointment) => (
        <div key={appointment._id} className="card">
          <h2>{appointment.firstName} {appointment.lastName}</h2>
          <p>Email: {appointment.email}</p>
          <p>Appointment Date: {appointment.appointmentDate}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  );
};

export default Appointment;