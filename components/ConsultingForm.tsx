import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import getFormattedDate from '@/lib/getFormattedDate';
import toast from 'react-hot-toast';

const ConsultingForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    email: '',
    complaints: '',
    prescription: '',
    consultingDate: '', // Corrected property name
  });

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate.toString()); // Use the getFormattedDate function
    setFormData(prevState => ({ ...prevState, consultingDate: formattedDate }));
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSubmit = formData;

    try {
      const response = await fetch('/api/consulting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });
      if (!response.ok) {
        toast.error("Error Saving Data!")
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      toast.success("Data Saved Successfully !")

      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
        phoneNumber: '',
        email: '',
        complaints: '',
        prescription: '',
        consultingDate: '',
    });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <input 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
          placeholder="First Name" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <input 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          placeholder="Last Name" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <select 
          name="gender" 
          value={formData.gender} 
          onChange={handleSelectChange} 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <input 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          placeholder="Age" 
          required 
          type="number" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <input  
          name="consultingDate"  
          value={formData.consultingDate}  
          onChange={handleChange}  
          type="text"  
          required  
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"  
          readOnly
        />
      </div>
      <div className="mb-4">
        <input 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
          placeholder="Phone Number" 
          type="tel" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <input 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Email (optional)" 
          type="email" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <textarea 
          name="complaints" 
          value={formData.complaints} 
          onChange={handleChange} 
          placeholder="Complaints" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="mb-4">
        <textarea 
          name="prescription" 
          value={formData.prescription} 
          onChange={handleChange} 
          placeholder="Prescription" 
          required 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500" 
        />
      </div>
      <div className="flex items-center justify-between">
        <button 
          type="submit" 
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ConsultingForm;
