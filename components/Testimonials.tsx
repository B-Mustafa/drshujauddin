import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Profile from "../public/profile.webp"

interface TestimonialsProps {}

class Testimonials extends Component<TestimonialsProps> {
 render() {
    return (
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
        className="bg-dark-background text-dark-text"
      >
        <div>
    
          <div className="myCarousel">
            <h3>patient One</h3>
            <h4>Developer</h4>
            <p>
            I&apos;ve been seeing Dr. SHUJAUDDIN for my chronic headaches. Homeopathy has helped me significantly reduce the frequency and severity of my headaches. The treatments are natural and effective.
            </p>
          </div>
        </div>

        <div>
    
          <div className="myCarousel">
            <h3>Patient Two</h3>
            <h4>Business Man</h4>
            <p>
            Dr. Shujauddin&apos;s homeopathic remedies have been a game-changer for my allergies. I&apos;ve noticed a marked improvement in my symptoms  It&apos;s a more holistic approach to health.
            </p>
          </div>
        </div>

        <div>
          
          <div className="myCarousel">
            <h3>Patient Three</h3>
            <h4>Lawyer</h4>
            <p>
            I got relieved completely from my back pain after consulting with Dr.Shujauddin
            </p>
          </div>
        </div>
      </Carousel>
    );
 }
}

export default Testimonials;
