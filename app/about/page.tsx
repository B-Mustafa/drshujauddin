import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Profile from '../../public/profile.webp';
import Link from 'next/link';

const AboutUs: React.FC = () => {
 return (
    <>
      <Navbar isAdminRoute={false} />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-2">
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
          <p className="mt-3 text-2xl font-semibold text-gray-700">
            Experienced Homeopathic Doctor
          </p>
          
          <div className="flex flex-wrap justify-center items-center mt-6">
            <div className="w-64 m-2">
              <Image src={Profile} alt="Dr. Shujauddin" className="w-full h-64 object-cover rounded-lg shadow-lg" />
            </div>
           <div className='flex flex-col justify'>
           <div className="w-full md:w-96 m-2">
              <p className="text-lg text-gray-700  text-slate-00 font-bold ">
                Dr. Shujauddin is a renowned homeopathic doctor with over 15 years of experience in the field. He specializes in treating a wide range of conditions using homeopathic remedies. Dr. Shujauddin believes in the healing power of nature and is dedicated to providing personalized care to his patients.
              </p>
            </div>
            <div className="w-full md:w-96 m-2">
              <p className="text-lg text-gray-700">
                Dr. Shujauddin has received numerous awards for his exceptional work and dedication to patient care. He is a member of several professional associations and continues to stay updated with the latest advancements in homeopathy.
              </p>
            </div>
           </div>
          </div>

          

          <div className="mt-10">
            <Link href="mailto:bhikhapurwalasujauddin@gmail.com" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Contact Dr. Shujauddin  
            </Link>
          </div>
        </main>
      </div>
    </>
 );
};

export default AboutUs;
