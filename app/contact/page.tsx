"use client"
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import toast from 'react-hot-toast';
import { sendEmail } from '@/actions/EmailSend';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle the form submission, e.g., send the data to your server
    console.log(formData);
    // Reset the form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <main className='bg-dark-background text-white min-h-screen'>
      <Navbar isAdminRoute={false} />
      <section className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl p-8 rounded-lg shadow-lg">
          {/* Contact Details */}
          <div>
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Contact Details</h1>
            <div className="text-center mt-4">
              <p>Address: Gujarat , Godhra-389001</p>
              <p>Email: info@sujauddin.com</p>
            </div>
          </div>
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14715.190886275966!2d73.6118983!3d22.7728869!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39609b002af539a1%3A0x501102952f4aba80!2sSaifee%20Homeopathic%20Clinic!5e0!3m2!1sen!2sin!4v1709661420914!5m2!1sen!2sin"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Location"
          ></iframe>
          {/* Doctor Image */}
          <div className="md:col-span-1">
            <img src="/doctor_image.jpg" alt="Doctor" className="w-full h-auto rounded-lg" />
          </div>
          {/* Form */}
          <div className="md:col-span-1">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Get in Touch</h1>
            <form
        className="mt-10 flex flex-col dark:text-black"
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
          className="h-14 px-4 rounded-lg borderBlack bg-dark-background transition-all border border-gray-100  "
          name="senderEmail"
          type="email"
          required
          maxLength={500}
          placeholder="Your email"
        />
        <textarea
          className="h-52 my-3 rounded-lg borderBlack p-4 bg-dark-background transition-all border border-gray-10"
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <button type='submit'> Submit </button>
      </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
