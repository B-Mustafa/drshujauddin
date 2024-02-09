import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
      <footer className='flex justify-items-end bg-[#DEE4E7] '>
        <p>&copy; Copyright <Link href={"https://github.com/B-Mustafa"} className='text-blue-600'>Mustafa Bhikhapurwala</Link>  2024</p>
      </footer>
    </>
  )
}

export default Footer
