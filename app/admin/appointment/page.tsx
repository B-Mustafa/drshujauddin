"use client"
import React, { useEffect, useState } from 'react';
import { IAppointment } from '../../../model/Appointment'; // Adjust the import path as necessary
import { getSession } from 'next-auth/react';

import { CustomSession } from '@/app/api/auth/[...nextauth]/options';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

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
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'accept',
          appointmentId: appointmentId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Appointment accepted:', data);
      toast.success('Appointment accepted successfully!');
  
      // Update the appointment's action state
      setAppointmentActions(prev => ({ ...prev, [appointmentId]: 'accept' }));
  
      // Verify state update
      console.log('Updated appointmentActions state:', appointmentActions);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to accept appointment.');
    }
  };

  const handleDecline = async (appointmentId: string) => {
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'decline',
          appointmentId: appointmentId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Appointment declined:', data);
      toast.error('Appointment declined successfully!');
  
      // Update the appointment's action state
      setAppointmentActions(prev => ({ ...prev, [appointmentId]: 'decline' }));
  
      // Verify state update
      console.log('Updated appointmentActions state:', appointmentActions);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to decline appointment.');
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      {isAuthenticated ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="bg-white rounded-lg shadow p-4">
              <h2 className="text-xl font-semibold mb-2">
                {' '}
                {appointment.firstName} {appointment.lastName}
              </h2>
              <p className="text-gray-600">
                <span className="font-semibold">Email :</span> {appointment.email}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Age :</span> {appointment.age}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Gender :</span>
                {appointment.gender}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Date :</span> {appointment.appointmentDate}
              </p>
              <p className="text-gray-600">
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
            </div>
          ))}
        </div>
      ) : (
        <p>You are not authenticated</p>
      )}
    </div>
  );
};

export default AppointmentsPage;
