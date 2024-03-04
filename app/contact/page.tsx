"use client"
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';

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
              <p>123 Main Street, London, UK</p>
              <p>Phone: +123 456 7890</p>
              <p>Email: info@example.com</p>
            </div>
          </div>
          {/* Google Maps Iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253414.24408216558!2d-0.24168195788294994!3d51.5287718413816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487605c28617fc4d%3A0x6ac715bfab69f34c!2sLondon%2C%20UK!5e0!3m2!1sen!2sus!4v1630732959284!5m2!1sen!2sus"
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                placeholder="Your Name"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                placeholder="Your Email"
                required
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                placeholder="Subject"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500 resize-none"
                placeholder="Your Message"
                rows={5}
                required
              />
              <button
                type="submit"
                className="w-full p-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
