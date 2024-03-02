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

        {/* Hero Section */}
        <div className="w-full h-64 bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
            Saifee Homeopathy
          </h1>
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {/* Doctor's Information */}
          <div className="flex flex-wrap justify-center items-center mt-6">
            <div className="flex flex-col items-center justify-center m-2">
              <Image src={Profile} alt="Dr. Shujauddin" className="w-64 h-64 object-cover rounded-lg shadow-lg" />
              <h2 className="text-2xl font-semibold mt-4">
                Dr. Shujauddin Bhikhapurwala
              </h2>
              <p className="text-lg">
                Homeopathic Doctor
              </p>
              <a href="#Appointment">
                <button
                  onClick={openModal}
                  className="mt-5 btn-main bg-dark-primary hover:bg-dark-secondary text-white px-2 py-2 rounded text-center cursor-pointer"
                >
                  Book Appointment
                </button>
                <AppointmentModal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                />
              </a>
            </div>
            <div className="flex flex-col justify-center items-start m-2">
            </div>
          </div>

          {/* About Saifee Homeopathy */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">About Saifee Homeopathy</h2>
            <p className="text-lg mt-4">
              Saifee Homeopathy, run by Dr. Shujauddin Bhikhapurwala, is a compassionate organization dedicated to providing online homeopathic treatment and consultation services. Our team is committed to serving children and families suffering from allergies and behavioral problems. We focus on curing patients rather than just treating symptoms, ensuring that every child gets back to a normal life. Our mission is to eradicate disease from the very root and lead our patients back to the mainstream of life.
            </p>
            <p className="text-lg mt-4">
              At Saifee Homeopathy, patients receive personalized treatment plans from highly experienced and qualified homeopathic doctors. Our team focuses on alleviating the suffering, helplessness, and anxiety of our patients and their families, and we are dedicated to making sure that every patient receives the care they need to lead a healthy and happy life.
            </p>
            <p className="text-lg mt-4">
              What sets Saifee Homeopathy apart is our online homeopathic treatment and consultation services, which allow patients to access our care from the comfort of their own home. This is especially beneficial for those who are unable to visit the clinic in person due to geographical or other constraints. With our online services, patients receive the same level of care and attention as they would in person.
            </p>
          </div>

          {/* Additional Information */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold">Additional Information</h2>
            <p className="text-lg mt-4">
              If you want to learn more about Saifee Homeopathy and our approach to homeopathic treatment, feel free to contact us or visit our website. Our team is always available to answer any questions you may have and help you understand how homeopathy can benefit you and your family.
            </p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default About;
