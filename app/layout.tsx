import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './posts.css'
import NextAuthProvider from "@/provider/NextAuthProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Saifee Homeopathic Clinic",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <NextAuthProvider>

        <Navbar/>
      
        {children}
      
      
        {/* <Footer/> */}
      </NextAuthProvider>
        
      </body>
    </html>
  );
}
