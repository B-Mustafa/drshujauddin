import React from 'react'
import NextAuthProvider from '@/provider/NextAuthProvider'
const Layout = ({children}: { children: React.ReactNode }) => {
  return (
    <div>
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
    </div>
  )
}

export default Layout
