"use client"
import React, { useEffect, useState } from 'react';
import { IAppointment } from '../../../model/Appointment'; // Adjust the import path as necessary

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    // Fetch appointments from your API
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data: IAppointment[] = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{appointment.firstName} {appointment.lastName}</h2>
            <p className="text-gray-600">{appointment.email}</p>
            <p className="text-gray-600">{appointment.appointmentDate}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;