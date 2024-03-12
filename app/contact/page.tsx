"use client"

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';
import { sendEmail } from '@/actions/EmailSend';
import { FiPhone, FiClock, FiMail, FiInstagram, FiTwitter, FiFacebook, FiGlobe } from 'react-icons/fi';
import Footer from '@/components/Footer';


  function Contact() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      console.log(formData);
      
      setFormData({ name: '', email: '', subject: '', message: '' });
    };

  return (
    <main className='bg-dark-background text-white min-h-screen'>
      <Navbar isAdminRoute={false} />
      <section className="flex justify-center items-center flex-col">
        {/* Google Maps Iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14715.190886275966!2d73.6118983!3d22.7728869!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39609b002af539a1%3A0x501102952f4aba80!2sSaifee%20Homeopathic%20Clinic!5e0!3m2!1sen!2sin!4v1709661420914!5m2!1sen!2sin"
          width="80%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          title="Location"
        ></iframe>
        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl p-8 rounded-lg shadow-lg">
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Contact Details</h1>
            <div className="text-center mt-4">
              <div className="flex items-center justify-center mb-2">
                <FiPhone className="mr-2" />
                <p>Phone: 9879137042</p>
              </div>
              <div className="flex items-center justify-center mb-2">
                <FiClock className="mr-2" />
                <p>Clinic Timings: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="flex items-center justify-center mb-2">
                <FiMail className="mr-2" />
                <p>Email: info@sujauddin.com</p>
              </div>
              <div className="flex items-center justify-center mb-2">
                <FiGlobe className="mr-2" />
                <p>Website: drshujauddin.in</p>
              </div>
              
            </div>
          </div>
          {/* Get in Touch */}
          <div className="md:col-span-1">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Get in Touch</h1>
            <form className="mt-10 flex flex-col dark:text-black"
        action={async (formData) => {
          const { data, error } = await sendEmail(formData);

          if (error) {
            toast.error(error);
            return;
          }

          toast.success("Email sent successfully!");
        }}
            >
              <input
                className="h-14 px-4 rounded-lg borderBlack bg-dark-background border border-gray-100 transition-all "
                name="senderEmail"
                type="email"
                required
                maxLength={500}
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <textarea
                className="h-52 my-3 rounded-lg borderBlack p-4 bg-dark-background border border-gray-100 transition-all"
                name="message"
                placeholder="Your message"
                required
                maxLength={5000}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
              <button type='submit' className='bg-dark-primary p-3 rounded-lg hover:bg-[#6b6ebd] transition-all'> Submit </button>
            </form>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}

export default Contact;
