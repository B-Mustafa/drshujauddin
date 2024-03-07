"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Profile from '../../public/profile.webp';
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-dark-background text-dark-text py-2">
        <Head>
          <title>About Us - Saifee Homeopathy</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className="w-full h-48 sm:h-64 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white text-center">
            About Dr. Shujauddin
          </h1>
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-6 sm:px-20 text-center">
          <div className="flex flex-wrap justify-center items-center mt-6">
            <div className="flex flex-col items-center justify-center m-2">
              <Image src={Profile} alt="Dr. Shujauddin" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-4">
                Dr. Shujauddin Bhikhapurwala
              </h2>
              <p className="text-lg">
                Homeopathic Doctor
              </p>
              <a href="#Appointment">
                <button
                  onClick={openModal}
                  className="mt-5 btn-main bg-dark-primary hover:bg-dark-secondary text-white px-4 py-2 rounded text-center cursor-pointer"
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

          <div className="mt-10 text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">About Dr. Shujauddin</h2>
            <p className="text-lg mt-4">
              Dr. Shujauddin Bhikhapurwala is a renowned Homeopathic Doctor heading Saifee Homeopathic Clinic. With years of experience and expertise, Dr. Shujauddin has helped numerous patients find relief from various ailments through homeopathic treatment.
            </p>
            <p className="text-lg mt-4">
              His compassionate approach towards patients, coupled with a deep understanding of homeopathy, makes him a trusted healthcare professional in the community. Dr. Shujauddin is dedicated to providing personalized care to each patient, focusing on holistic healing and well-being.
            </p>
            <p className="text-lg mt-4">
              Under his leadership, Saifee Homeopathic Clinic has become a beacon of hope for individuals seeking natural and effective treatment options. Dr. Shujauddin&apos;s commitment to excellence and patient-centric approach continue to drive the clinic towards its mission of restoring health and vitality to all.
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-10 text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Additional Information</h2>
            <p className="text-lg mt-4 mb-4">
              For more information about Dr. Shujauddin and the services offered at Saifee Homeopathic Clinic, feel free to reach out or visit our website. Our dedicated team is always available to assist you on your journey towards optimal health and well-being.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default About;
