"use client"
import { CustomSession } from '@/app/api/auth/[...nextauth]/options';
import Navbar from '@/components/Navbar';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

function Patients() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      // Optionally, handle the error more gracefully
    }
  };

  return (
    <>
      {/* <Navbar isAdminRoute={true} /> */}
      {isAuthenticated ? (
        <div>
          Patients Data Loads Here!
        </div>
      ) : (
        <div>
          <p>You are not authenticated. Please <a href="/login">log in</a> to access this page.</p>
        </div>
      )}
    </>
  );
}

export default Patients;
