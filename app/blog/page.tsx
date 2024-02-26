import Blog from '@/components/Blog'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const blog = () => {
  return (
    <section>
      <Navbar isAdminRoute={false}/>
      <Blog />
      <Footer/>
    </section>
  )
}

export default blog
