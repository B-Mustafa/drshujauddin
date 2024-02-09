"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Logo from '@/public/logo.png'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

function Navbar() {

    const [MenuOpen , setMenuOpen] = useState(false);
 
    const handleNav = () => {
        setMenuOpen(!MenuOpen)
    }
    useEffect(() => {
        const handleKeyPress = (e) => {
          if (e.key === "Escape") {
            handleNav();
          }
        };
    
        document.addEventListener("keydown", handleKeyPress);
    
        return () => {
          document.removeEventListener("keydown", handleKeyPress);
        };
      }, [handleNav, MenuOpen]);

  return (
      <nav className='sticky w-full h-24 shadow-xl bg-white'>
        <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16 '>
        <div className='flex items-center p-3 text-xl '> 
          {/* Logo Image needs to be changed  */}
            <Link href={"/"} >
                <Image src={Logo}  alt='Main-Logo' height={200} width={200} className='rounded-lg text-xl font-semibold' />
            </Link>
        </div>
        <div className='hidden sm:flex' > 
            {/* Main links */}
            <ul className='hidden sm:flex'>
            <Link href={"/"}>
                <li className='ml-10 uppercase hover:border-b-2 text-xl'>Home</li>
            </Link>
            <Link href={"/about"}>
                <li className='ml-10 uppercase hover:border-b-2 text-xl'>About</li>
            </Link>
            <Link href={"/blog"}>
                <li className='ml-10 uppercase hover:border-b-2 text-xl'>Blog</li>
            </Link>
            <Link href={"/contact"}>
                <li className='ml-10 uppercase hover:border-b-2 text-xl'>Contact</li>
            </Link>
            </ul>
        </div>
        <div onClick={handleNav} className='md:hidden cursor-pointer pl-24'>
            <AiOutlineMenu size={25}/>
        </div>
        </div>
        <div className={`fixed top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 ${
          MenuOpen ? "left-0" : "left-[-100%]"
        }`}>
            <div className='flex w-full items-center justify-end'>
                <div onClick={handleNav} className='cursor-pointer'>
                    <AiOutlineClose size={25}/>
                </div>
            </div>
                <div className='flex-col py-4' > 
                    {/* Main links */}
                    <ul>
                    <Link href={"/"}>
                        <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>Home</li>
                    </Link>
                    <Link href={"/about"}>
                        <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>About</li>
                    </Link>
                    <Link href={"/blog"}>
                        <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>Blog</li>
                    </Link>
                    <Link href={"/contact"}>
                        <li className='py-4 uppercase hover:border-b-2 text-xl cursor-pointer'>Contact</li>
                    </Link>
                    </ul>
                </div>
        </div>
      </nav>
 
  )
}

export default Navbar;
