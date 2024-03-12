import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import './posts.css'
import NextAuthProvider from "@/provider/NextAuthProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons:{
    icon: "",
    apple: "",
  },
  title: "Saifee Homeopathic Clinic",
  description: "Welcome to Saifee Homeopathic Clinic, where Dr. Shujauddin offers holistic healing with personalized care. Discover natural remedies and alternative medicine for optimal wellness.",
  keywords: "homeopathic clinic, holistic healing, Dr. Shujauddin, homeopathy treatment, natural remedies, alternative medicine, personalized care, homeopathic remedies, homeopathic doctor, individualized treatment, wellness, health, vitality, balance, non-invasive therapies, alternative healthcare",
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
      <Toaster />

        
      
        {children}
      
      
        {/* <Footer/> */}
      </NextAuthProvider>
        
      </body>
    </html>
  );
}
