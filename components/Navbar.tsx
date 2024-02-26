"use client"
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import Logo from '@/public/logo.png';
import { useEffect, useState } from 'react';

interface NavbarProps {
  isAdminRoute: boolean;
}

function Navbar({ isAdminRoute }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleNav();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleNav, menuOpen]);

  return (
    <nav className='sticky w-full h-24 shadow-xl bg-white'>
      <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16 '>
        <div className='flex items-center p-3 text-xl '>
          <Link href={isAdminRoute ? '/admin' : '/'}>
            <Image
              src={Logo}
              alt='Main-Logo'
              height={200}
              width={200}
              className='rounded-lg text-xl font-semibold'
            />
          </Link>
        </div>
        <div className='hidden sm:flex'>
          <ul className='hidden sm:flex'>
            <Link href={isAdminRoute ? '/admin' : '/'}>
              <li className='ml-10 uppercase hover:border-b-2 text-xl'>Home</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/appointment' : '/about'}>
              <li className='ml-10 uppercase hover:border-b-2 text-xl'>{isAdminRoute ? 'Appointment' : 'About'}</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/patient' : '/blog'}>
              <li className='ml-10 uppercase hover:border-b-2 text-xl'>{isAdminRoute ? 'Patients' : 'Blog'}</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/consulting' : '/contact'}>
              <li className='ml-10 uppercase hover:border-b-2 text-xl'>{isAdminRoute ? 'Consulting' : 'Contact'}</li>
            </Link>
          </ul>
        </div>
        <div onClick={handleNav} className='md:hidden cursor-pointer pl-24'>
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={`fixed top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 ${
          menuOpen ? 'left-0' : 'left-[-100%]'
        }`}
      >
        <div className='flex w-full items-center justify-end'>
          <div onClick={handleNav} className='cursor-pointer'>
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className='flex-col py-4'>
          <ul>
            <Link href={isAdminRoute ? '/admin' : '/'}>
              <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>Home</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/appointment' : '/about'}>
              <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>{isAdminRoute ? 'Appointment' : 'About'}</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/patient' : '/blog'}>
              <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>{isAdminRoute ? 'Patients' : 'Blog'}</li>
            </Link>
            <Link href={isAdminRoute ? '/admin/consulting' : '/contact'}>
              <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>{isAdminRoute ? 'Consulting' : 'Contact'}</li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
