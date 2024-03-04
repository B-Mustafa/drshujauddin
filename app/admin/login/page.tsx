"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'; 

function AdminLogin() {
    const router = useRouter(); 

    const [authState, setAuthState] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const data = await signIn("credentials", {
            email: authState.email,
            password: authState.password,
            redirect: false
        });
        if (data?.status == 200) {
            router.push("/admin");
        }
    }

  return (
    <div className='bg-dark-background text-dark-text h-screen  flex justify-center items-center'>
      <div className='w-[500px] shadow-md rounded-lg p-5 border border-white'>
        <h1 className='text-xl font-bold'>Admin Login</h1>
        <p>Welcome Back</p>
        <form onSubmit={handleSubmit}>
            <div className='mt-5'>
            <label className='block' >
                Email
            </label>
            <input 
                type="email" 
                placeholder='Enter email' 
                className='w-full bg-dark-background border outline-blue-400 rounded-md p-2 h-10'
                onChange={(e) => setAuthState({...authState ,
                email:e.target.value})}
            />
            </div>
            <div className='mt-5'>
                <label className='block' >
                    Password
                </label>
                <input 
                 type="password"
                 placeholder='Enter password' 
                 className='w-full bg-dark-background border outline-blue-400 rounded-md p-2 h-10'
                 onChange={(e) => setAuthState({...authState ,
                    password:e.target.value})}
                />
            </div>
            <div className='mt-5'>
                
                <button type="submit"  className='w-full bg-blue-400 p-2 rounded-md text-white'>Login</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
