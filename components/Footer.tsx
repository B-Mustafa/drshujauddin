import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
      <footer className=' flex justify-center items-center bg-dark-primary m-auto  p-[30px]  rounded-md'>
        <p className='text-white'>&copy; Copyright <Link href={"https://github.com/B-Mustafa"} className='text-white mr-2 ml-2'>Mustafa Bhikhapurwala</Link>  2024</p>
      </footer>
    </>
  )
}

export default Footer
