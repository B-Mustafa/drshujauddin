import Navbar from '@/components/Navbar'
import React from 'react'

function Contact() {
  return (
    <main className='bg-dark-background text-dark-white h-screen'>
    <Navbar isAdminRoute={false}/>
      <section className=" bg-dark-background text-dark-text flex justify-center mt-5">
        <h1 className="font-semibold text-3xl">Contact Page</h1>
        
      </section>
    </main>
  )
}

export default Contact
