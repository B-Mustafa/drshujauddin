'use client'
import React, { useEffect, useState } from 'react';
import { CustomSession } from '@/app/api/auth/[...nextauth]/options';
import Navbar from '@/components/Navbar';
import { getSession } from 'next-auth/react';
import getFormattedDate from '@/lib/getFormattedDate';
import toast from 'react-hot-toast';

interface ConsultingData { 
  _id: string; 
  firstName: string;
  lastName: string;
  gender: string;
  age: string;
  phoneNumber: string;
  email: string;
  complaints: string;
  prescription: string;
  consultingDate: string;
}

function Patients() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [consultingData, setConsultingData] = useState<ConsultingData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loadedDataCount, setLoadedDataCount] = useState<number>(9);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [deleteIndex , setDeleteIndex] = useState<number>(-1);
  const [deleteFormData , setDeleteFormData] = useState<consultingData>({
    _id: '',
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    phoneNumber: '',
    email: '',
    complaints: '',
    prescription: '',
    consultingDate: '',
  })
  const [editFormData, setEditFormData] = useState<ConsultingData>({
    _id: '',
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

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const session: CustomSession | null = await getSession();
      if (!session || !session.user || session.user.role !== 'Admin') {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        fetchConsultingData();
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };

  const fetchConsultingData = async () => {
    try {
      const response = await fetch('/api/patient');
      if (!response.ok) {
        throw new Error('Failed to fetch consulting data');
      }
      const data = await response.json();
      const formattedData = data.map((consulting: ConsultingData) => ({
        ...consulting,
        consultingDate: getFormattedDate(consulting.consultingDate),
      }));
      setConsultingData(formattedData);
    } catch (error) {
      console.error('Error fetching consulting data:', error);
    }
  };

  const handleLoadMore = () => {
    setLoadedDataCount(prevCount => prevCount + 9);
  };

  const filteredConsultingData = consultingData.filter((consulting) =>
    `${consulting.firstName} ${consulting.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditFormData({ ...filteredConsultingData[index] });
  };

  const handleDelete = async (index: number) => {
    try {
       // Get the ID of the item to delete
       const idToDelete = consultingData[index]._id;
   
       // Send a DELETE request to the server
       const response = await fetch(`/api/deletePatient?id=${idToDelete}`, {
         method: 'DELETE',
       });
   
       // Check if the request was successful
       if (!response.ok) {
         throw new Error('Failed to delete patient data');
       }
   
       // If successful, remove the item from the local state
       const updatedConsultingData = consultingData.filter((_, i) => i !== index);
       setConsultingData(updatedConsultingData);
   
       // Optionally, show a success message
       toast.success("Record deleted successfully!");
    } catch (error) {
       console.error('Error deleting patient data:', error);
       // Optionally, show an error message
       toast.error("An error occurred while deleting the record.");
    }
   };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/updatePatient?id=${consultingData[editIndex]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        toast.error("An unknown issue occured")
        // throw new Error('Failed to update patient data');
      }
      toast.success("Data Updated Sucessfully!")
      const updatedData = [...consultingData];
      updatedData[editIndex] = editFormData;
      setConsultingData(updatedData);

      setEditIndex(-1);
      setEditFormData({
        _id: '', 
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
      console.error('Error updating patient data:', error);
    }
  };
 return (
    <>
      {isAuthenticated ? (
        <div className="p-5 mx-auto">
          <input
            type="text"
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 mb-4"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredConsultingData.slice(0, loadedDataCount).map((consulting) => (
              <div key={index} className="border rounded p-4 w-full">
                <h2 className="text-xl font-bold mb-2">{consulting.firstName} {consulting.lastName}</h2>
                <p className="text-gray-600">Gender: {consulting.gender}</p>
                <p className="text-gray-600">Age: {consulting.age}</p>
                <p className="text-gray-600">Phone Number: {consulting.phoneNumber}</p>
                <p className="text-gray-600">Email: {consulting.email}</p>
                <p className="text-gray-600">Complaints: {consulting.complaints}</p>
                <p className="text-gray-600">Prescription: {consulting.prescription}</p>
                <p className="text-gray-600">Consulting Date: {consulting.consultingDate}</p>
                <button onClick={() => handleEdit(index)} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="mt-2 bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Delete Record
                </button>
              </div>
            ))}
          </div>
          {loadedDataCount < filteredConsultingData.length && (
            <div className="mt-4 text-center">
              <button onClick={handleLoadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Load More
              </button>
            </div>
          )}
          {editIndex !== -1 && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg">
                {/* Edit form fields */}
                <h2 className="text-xl font-bold mb-2">Edit Patient</h2>
                <label className="block mb-2">
                  First Name:
                  <input type="text" value={editFormData.firstName} onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Last Name:
                  <input type="text" value={editFormData.lastName} onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Gender:
                  <input type="text" value={editFormData.gender} onChange={(e) => setEditFormData({ ...editFormData, gender: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Age:
                  <input type="text" value={editFormData.age} onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Phone Number:
                  <input type="text" value={editFormData.phoneNumber } onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Email:
                  <input type="text" value={editFormData.email } onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Consulting Date:
                  <input type="text" value={editFormData.consultingDate } onChange={(e) => setEditFormData({ ...editFormData, consultingDate: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Complaints:
                  <input type="text" value={editFormData.complaints } onChange={(e) => setEditFormData({ ...editFormData, complaints: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                <label className="block mb-2">
                  Prescription:
                  <input type="text" value={editFormData.prescription } onChange={(e) => setEditFormData({ ...editFormData, prescription: e.target.value })} className="border border-gray-300 rounded-lg p-2 w-full" />
                </label>
                
                <div className="flex justify-between">
                  <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Update
                  </button>
                  <button onClick={() => setEditIndex(-1)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-xl mx-auto px-4 py-8">
          <p className="text-red-500">You are not authenticated. Please <a href="/admin/login" className="underline">log in</a> to access this page.</p>
        </div>
      )}
    </>
 );
}

export default Patients;
