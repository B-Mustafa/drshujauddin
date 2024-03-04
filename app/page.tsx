"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import Hero from "@/public/hero.jpg";
import Footer from "@/components/Footer";
import { useState } from "react";
import AppointmentModal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";




export default function Home() {

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
      <main className="bg-dark-background">
        <section className="hero-container relative flex items-center justify-center h-screen">
          <Image
            src={Hero}
            alt="Banner Image Homeopathy"
            layout="fill"
            objectFit="cover"
            className=" absolute top-0 left-0 z-0 opacity-70 "
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          />
          <div className="hero-content-container flex flex-col items-center justify-center text-center relative ">
            <h1 className="text-5xl text-dark-text font-bold mb-6">Welcome to Our Homeopathy Center</h1>
            <p className="text-lg text-dark-text mb-8">Healing naturally, one person at a time.</p>
            <Button onClick={openModal} className="bg-dark-primary text-white px-8 py-4 rounded-md cursor-pointer">Book Appointment</Button>
            <AppointmentModal isOpen={isModalOpen} onRequestClose={closeModal} />
          </div>
        </section>
        <section className="services-section py-16 bg-dark-background">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-dark-text mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="service-card bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Individualized Treatment</h3>
                <p className="text-gray-700">Tailored homeopathic treatments for your unique health needs.</p>
              </div>
              <div className="service-card bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Holistic Approach</h3>
                <p className="text-gray-700">We treat the root cause, not just the symptoms, to promote lasting wellness.</p>
              </div>
              <div className="service-card bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">Wellness Programs</h3>
                <p className="text-gray-700">Comprehensive programs to support your journey to optimal health.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="testimonial-section py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-dark-text mb-12">What Our Patients Say</h2>
            <Testimonials/>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
