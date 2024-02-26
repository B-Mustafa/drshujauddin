import Navbar from '@/components/Navbar';
import React from 'react'

function About () {
  return (
    <>
    <Navbar isAdminRoute={false}/>
      <section className="flex justify-center mt-5">
        <h1 className="font-semibold text-3xl">About Page</h1>
      </section>
    </>
  )
}

export default About;
