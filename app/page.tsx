"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
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
    <main className="bg-main-background">
      <Navbar isAdminRoute={false} /> 

      <section className="hero-container flex  items-center  justify-center mt-5  w-full overflow-hidden h-screen">
        <div className="hero-content-container flex items-center justify-between  w-full  py-5  px-5">
          <div className="hero-content">
            <div className="text text-left">
              <h1 className="text-4xl text-[#333]  "> Homeopathy Made Easy </h1>
              {/* <span className="red-font text-3xl font-semibold text-red-600"></span>
            <h2 className="text-4xl text-[#333] "></h2> */}
              <p className="p-text my-2 font-medium text-lg">
                We introduced online Homeopathic treatment through this website
                !
                <br />
                That makes it possible to extend benefits of Homeopathy to
                people from all over the world and anyone can choose for online
                treatment
              </p>
            </div>

            <div className="links flex  ">
              <a href="#Appointment">
                <button
                  onClick={openModal}
                  className="btn-main bg-main-primary text-white px-2 py-2 rounded text-center cursor-pointer "
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
          <Image
            src={Logo}
            height={300}
            width={300}
            alt="Hero Image"
            className=" h-auto rounded-md flex-col"
          />
        </div>
      </section>
      <section className=" py-8">
          <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>
          <Testimonials/>
      </section>
      <Footer />
    </main>
  );
}
