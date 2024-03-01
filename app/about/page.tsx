"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Profile from '../../public/profile.webp';
import Link from 'next/link';
import Footer from '@/components/Footer';
import AppointmentModal from '@/components/Modal';



const About: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

 return (
    <>
      <Navbar isAdminRoute={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-main-background py-2">
        <Head>
          <title>About Us - Dr. Shujauddin</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Hero Section */}
        <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Dr. Shujauddin
          </h1>
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {/* Doctor's Information */}
          <div className="flex flex-wrap justify-center items-center mt-6">
            <div className="flex flex-col items-center justify-center m-2">
              <Image src={Profile} alt="Dr. Shujauddin" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
              <h2 className="text-2xl font-semibold text-gray-700 mt-4">
                Dr. Shujauddin Bhikhapurwala
              </h2>
              <p className="text-lg text-gray-700">
                Homeopathic Doctor
              </p>
            </div>
            <div className="flex flex-col justify-center items-start m-2">
              <div className="flex flex-col items-start">
                <div>
                <p className="text-lg text-gray-700">Phone: +1234567890</p>
                </div>
                <div>
                <p className="text-lg text-gray-700">Email: bhikhapurwalasujauddin@gmail.com</p>
                </div>
                <div>
                <p className="text-lg text-gray-700">Address: 123 Homeopathy Street, Homeopathy City, HP 12345</p>
                </div>
              </div>
              <a href="#Appointment">
                <button
                  onClick={openModal}
                  className="btn-main bg-main-primary hover:bg-main-secondary text-white px-2 py-2 rounded text-center cursor-pointer "
                >
                  Book Appointment
                </button>
                <AppointmentModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                />
              </a>
            </div>
          </div>

          {/* About Dr. Shujauddin */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-700">About Dr. Shujauddin</h2>
            <p className="text-lg text-gray-700 mt-4">
              Dr. Shujauddin is a renowned homeopathic doctor with over 15 years of experience in the field. He specializes in treating a wide range of conditions using homeopathic remedies. Dr. Shujauddin believes in the healing power of nature and is dedicated to providing personalized care to his patients.
            </p>
          </div>
        </main>
      </div>
      <Footer/>
    </>
 );
};

export default About;
