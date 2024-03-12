import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import Modal from 'react-modal';

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  gender: string;
  email: string;
  phoneNumber: string;
  appointmentDate: string;
  appointmentTime: string;
  complaints: string;
  minDate: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const availableTimes: string[] = [
  '9:30 AM', '9:45 AM', '10:00 AM', '10:15 AM',
  '10:30 AM', '10:45 AM', '11:00 AM'
  // ,'6:45 AM',
  // '7:00 AM', '7:15 AM', '7:30 AM', '7:45 AM',
  // '8:00 AM', '8:15 AM', '8:30 AM'
];

function AppointmentModal({ isOpen, onRequestClose }: AppointmentModalProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    phoneNumber: '',
    appointmentDate: '',
    appointmentTime: '',
    complaints: '',
    minDate: ''
  });

  const [bookedTimeSlots, setBookedTimeSlots] = useState<{ [date: string]: string[] }>({});


  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData(prevState => ({ ...prevState, minDate: today }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedFormData = {
        ...formData,
        email: formData.email,
      };

      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Email sent:', data);
    } catch (error) {
      console.error('Error:', error);
    }

    toast.success('Appointment form submitted successfully!');

    const newBookedTimeSlots = {
      ...bookedTimeSlots,
      [formData.appointmentDate]: [...(bookedTimeSlots[formData.appointmentDate] || []), formData.appointmentTime],
    };
    setBookedTimeSlots(newBookedTimeSlots);

    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      email: '',
      phoneNumber: '',
      appointmentDate: '',
      appointmentTime: '',
      complaints: '',
      minDate: formData.minDate
    });
    // Close the modal
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="fixed inset-0 flex justify-center items-center z-10 bg-dark-background text-dark-text">
      <div className="w-96 p-8 rounded-lg shadow-md">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onRequestClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-dark-background text-dark-text">
          <div className="flex space-x-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-1/2 px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-1/2 px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
              className="w-1/2 px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleSelectChange} // Use handleSelectChange for select elements
              required
              className="w-1/2 px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="w-full px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            min={formData.minDate}
            onChange={handleChange}
            placeholder="Appointment Date"
            required
            className="w-full px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            id="appointmentDate"
          />
          <select
          name="appointmentTime"
          value={formData.appointmentTime}
          onChange={handleSelectChange}
          required
          className="w-full px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
          <option value="">Select Time</option>
          {availableTimes.map(time => (
              <option
                key={time}
                value={time}
                disabled={bookedTimeSlots[formData.appointmentDate]?.includes(time)}
                style={{
                  backgroundColor: bookedTimeSlots[formData.appointmentDate]?.includes(time) ? '#ccc' : 'transparent',
                  color: bookedTimeSlots[formData.appointmentDate]?.includes(time) ? '#666' : 'inherit',
                }}
              >
                {time}
              </option>
            ))}
          </select>
          <textarea
            name="complaints"
            value={formData.complaints}
            onChange={handleChange}
            placeholder="Complaints (optional)"
            rows={4}
            className="w-full px-4 py-2 border bg-dark-background text-dark-text border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button type="submit" className="bg-dark-secondary text-white py-2 px-4 rounded-lg hover:bg-dark-secondary transition duration-300">Book Appointment</button>
        </form>
      </div>
    </Modal>
  );
}

export default AppointmentModal;
