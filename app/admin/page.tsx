
import React from 'react'
import { CustomSession, authOptions } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

import { redirect } from 'next/navigation';
import SignOutButton from '@/components/SignOutButton'


export default async function Dashboard() {

    

    const session: CustomSession | null = await getServerSession(authOptions);

    if (session == null || session?.user?.role != "Admin"){
        return redirect("admin/login?error=invalid-credentials");
    }

  return (
    <div>
      Hello Sujauddin Welcome to Dashboard
      <SignOutButton/>
    </div>
  )
}

