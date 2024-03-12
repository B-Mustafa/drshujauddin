import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
      <footer className=' flex flex-col justify-center items-center bg-dark-primary m-auto  p-[30px]  rounded-md'>
        <p className='text-dark-text '>&copy; Copyright <span>Saifee Homeopathy</span>  2024</p>
        <p className='text-dark-text'>Made with ❣️ by:<Link href={"https://github.com/B-Mustafa"} className='text-dark-text mr-2 ml-2'>Mustafa Bhikhapurwala</Link></p>
      </footer>
    </>
  )
}

export default Footer
