import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
      <footer className=' flex justify-center items-center bg-[#93939366] m-auto  p-[30px]  rounded-md'>
        <p>&copy; Copyright <Link href={"https://github.com/B-Mustafa"} className='text-blue-600 mr-2 ml-2'>Mustafa Bhikhapurwala</Link>  2024</p>
      </footer>
    </>
  )
}

export default Footer
