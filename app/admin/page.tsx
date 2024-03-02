import React from 'react';
import { CustomSession, authOptions } from '../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import SignOutButton from '@/components/SignOutButton';
import Navbar from '@/components/Navbar';
import { redirect } from 'next/navigation';


export default async function Dashboard() {
    const session: CustomSession | null = await getServerSession(authOptions);

    if (session == null || session?.user?.role !== "Admin"){
        return redirect("/admin/login?error=Invalid Credentials")
    }

    return (
        <main className='bg-dark-background h-screen text-dark-text'>
            {/* <Navbar isAdminRoute={true}/> */}
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <h2 className="text-2xl font-semibold mb-4">Hello, Dr. Shujauddin</h2>
                        <p className="text-lg">Welcome to your dashboard. Here you can manage appointments, patients, and more.</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <SignOutButton />
                    </div>
                </div>
                {/* Add more content here */}
            </div>
        </main>
    );
}
