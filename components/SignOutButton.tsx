"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const signOutButton = () => {
  return (
    <button onClick={() => signOut({
      callbackUrl: "/admin/login",
      redirect:true
    })} className='flex-col p-2 bg-dark-accent text-white'>Sign out</button>
  )
}

export default signOutButton
