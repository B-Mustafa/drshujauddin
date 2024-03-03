"use client"
import React, { useEffect, useState } from 'react';
import { IAppointment } from '../../../model/Appointment'; 
import { getSession } from 'next-auth/react';

import { CustomSession } from '@/app/api/auth/[...nextauth]/options';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [appointmentActions, setAppointmentActions] = useState<{ [key: string]: 'accept' | 'decline' | 'none' }>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const session: CustomSession | null = await getSession();
    if (!session || !session.user || session.user.role !== 'Admin') {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      const data: IAppointment[] = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAccept = async (appointmentId: string) => {
    try {
       const appointment = appointments.find(appointment => appointment._id === appointmentId);
       if (!appointment) {
         throw new Error('Appointment not found');
       }
   
       const response = await fetch('/api/appointments', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           action: 'accept',
           appointmentId: appointmentId,
          
           ...appointment,
         }),
       });
   
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
   
       const data = await response.json();
       
       toast.success('Appointment accepted successfully!');
   
    
       setAppointmentActions(prev => ({ ...prev, [appointmentId]: 'accept' }));
   
      
    } catch (error) {
       console.error('Error:', error);
       toast.error('Failed to accept appointment.');
    }
   };
   
   const handleDecline = async (appointmentId: string) => {
    try {
       const appointment = appointments.find(appointment => appointment._id === appointmentId);
       if (!appointment) {
         throw new Error('Appointment not found');
       }
   
       const response = await fetch('/api/appointments', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           action: 'decline',
           appointmentId: appointmentId,
           // Include the full appointment data
           ...appointment,
         }),
       });
   
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
   
       const data = await response.json();
       toast.error('Appointment declined successfully!');
   
       // Update the appointment's action state
       setAppointmentActions(prev => ({ ...prev, [appointmentId]: 'decline' }));
   
       
    } catch (error) {
       console.error('Error:', error);
       toast.error('Failed to decline appointment.');
    }
   };

  const handleDelete = async (appointmentId: string) => {
    try {
       const response = await fetch(`/api/deleteAppointment?id=${appointmentId}`, {
         method: 'DELETE',
       });
   
       if (!response.ok) {
         throw new Error('Failed to delete appointment data');
       }
   
       // Directly filter out the appointment to be deleted from the current state
       const updatedAppointments = appointments.filter(appointment => appointment._id !== appointmentId);
       setAppointments(updatedAppointments);
   
       // Optionally, show a success message
       toast.success('Appointment deleted successfully!');
    } catch (error) {
       console.error('Error deleting appointment data:', error);
       // Optionally, show an error message
       toast.error('An error occurred while deleting the appointment.');
    }
   };
   
  

  return (
    <main className='bg-dark-background text-dark-text h-screen'>
    {/* <Navbar isAdminRoute={true}/> */}
    <div className="container mx-auto px-4 ">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {isAuthenticated ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-dark-background rounded-lg shadow p-4 border border-gray-300">
              <h2 className="text-xl font-semibold mb-2">
                {' '}
                {appointment.firstName} {appointment.lastName}
              </h2>
              <p className="text-dark-text">
                <span className="font-semibold">Email :</span> {appointment.email}
              </p>
              <p className="text-dark-text">
                <span className="font-semibold">Age :</span> {appointment.age}
              </p>
              <p className="text-dark-text">
                <span className="font-semibold">Gender :</span>
                {appointment.gender}
              </p>
              <p className="text-dark-text">
                <span className="font-semibold">Date :</span> {appointment.appointmentDate}
              </p>
              <p className="text-dark-text">
                <span className="font-semibold">Date :</span> {appointment.appointmentTime}
              </p>
              <p className="text-dark-text">
                <span className="font-semibold">Complaints :</span> {appointment.complaints}
              </p>
              {appointmentActions[appointment._id] !== 'accept' && (
              <button onClick={() => handleAccept(appointment._id)} className="bg-green-500 text-white px-4 py-2 rounded-lg">Accept</button>
              )}
              {appointmentActions[appointment._id] === 'accept' && (
              <span className="bg-green-500 text-white px-4 py-2 rounded-lg">Accepted</span>
              )}
              {appointmentActions[appointment._id] !== 'decline' && (
              <button onClick={() => handleDecline(appointment._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Decline</button>
              )}
              {appointmentActions[appointment._id] === 'decline' && (
                <span className="bg-red-500 text-white px-4 py-2 rounded-lg">Declined</span>
              )}
               <button onClick={() => handleDelete(appointment._id)} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2">Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>You are not authenticated</p>
      )}
    </div>
    </main>
  );
};

export default AppointmentsPage;
