import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Logo from '@/public/logo.png'
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center  justify-center mt-5 bg-[#DEE4E7] w-full overflow-hidden h-screen">
      <div className="  flex items-center justify-between max-w-7xl py-5  px-5">
        <div className="hero-content">
          <div className="text text-left">
            <h1 className="text-4xl text-[#333]  "> Homeopathy Made Easy </h1>
            {/* <span className="red-font text-3xl font-semibold text-red-600"></span>
            <h2 className="text-4xl text-[#333] "></h2> */}
            <p className="p-text my-2 font-medium text-lg">
              We introduced online Homeopathic treatment through this website ! 
              <br />
              That makes it possible to extend benefits of Homeopathy to people from all over the world and anyone can choose for online treatment
            </p>
          </div>

          <div className="links flex  ">
            <a href="#Appointment">
              <Button className="btn-main bg-[#333] text-white px-2 py-2 rounded text-center cursor-pointer hover:bg-[#222]">
                Book an Appointment
              </Button>
            </a>
            
          </div>
        </div>
        <Image src={Logo} height={300} width={300} alt='Hero Image' className=' h-auto rounded-md flex-col'/>
      </div>
      </section>
      <Footer/>

    </>
  );
}
