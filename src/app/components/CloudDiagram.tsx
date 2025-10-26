// app/components/CloudDiagram.tsx
"use client";

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import Link from 'next/link';
import { 
  FaUser, FaShieldAlt, FaServer, FaDocker, FaRoute, FaFileCode 
} from 'react-icons/fa';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

// --- Re-styled Components ---

const DiagramBox = ({ title, children, className = "" }: { title: string, children?: React.ReactNode, className?: string }) => (
  <div 
    className={`glass-card p-4 w-44 text-center 
                transition-all duration-300 ease-in-out ${className}`}
  >
    <div className="font-bold text-sm text-cyan-400 mb-2">{title}</div>
    {children}
  </div>
);

const Line = ({ className }: { className: string }) => (
  <div className={`absolute bg-gradient-to-r from-cyan-900 to-cyan-500 rounded-full shadow-lg shadow-cyan-500/30 ${className}`} />
);

// NEW: Data Packet component
const DataPacket = ({ className }: { className: string }) => (
  <div className={`absolute w-3 h-3 bg-cyan-300 rounded-full shadow-lg shadow-cyan-300 ${className}`} />
);

// --- Main Component ---

export default function CloudDiagram() {
  const main = useRef(null);
  
  // --- Animation Effect ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // --- Intro Animation ---
      const tl = gsap.timeline();
      
      gsap.set([".box", ".line", ".user-el"], { autoAlpha: 0 });
      gsap.set(".user-el", { x: -50 });
      gsap.set(".api-el", { x: -50 });
      gsap.set(".tf-el", { x: 50 });
      gsap.set([".ec2-el", ".nat-el"], { y: 50 });
      gsap.set(".line", { scaleX: 0 });
      gsap.set(".line-h", { transformOrigin: "left" });
      gsap.set(".line-tf-vpc", { transformOrigin: "right" });
      gsap.set(".vpc-el", { scale: 0.8 });

      tl
        .to(".user-el", { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" })
        .to(".line-user-api", { autoAlpha: 1, scaleX: 1, duration: 0.4 }, "-=0.2")
        .to(".api-el", { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .to(".line-api-vpc", { autoAlpha: 1, scaleX: 1, duration: 0.4 }, "-=0.2")
        .to(".vpc-el", { autoAlpha: 1, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.75)" }, "-=0.2")
        .to(".line-tf-vpc", { autoAlpha: 1, scaleX: 1, duration: 0.4 }, "<")
        .to(".tf-el", { autoAlpha: 1, x: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
        .to([".ec2-el", ".nat-el"], { autoAlpha: 1, y: 0, stagger: 0.2, duration: 0.5, ease: "power2.out" }, "-=0.5")
        .to(".line-internal", { autoAlpha: 1, scaleX: 1, duration: 0.3 });

      // --- NEW: Persistent Data Flow Animation ---
      const flow1 = gsap.timeline({ repeat: -1, delay: 1 });
      gsap.set(".packet1", { autoAlpha: 1, x: -280, y: 0 });
      flow1.to(".packet1", { x: 80, duration: 3, ease: "none" })
           .to(".packet1", { autoAlpha: 0, duration: 0 });

      const flow2 = gsap.timeline({ repeat: -1, delay: 2.5 });
      gsap.set(".packet2", { autoAlpha: 1, x: 280, y: 0 });
      flow2.to(".packet2", { x: 80, duration: 2, ease: "none" })
           .to(".packet2", { autoAlpha: 0, duration: 0 });
      
      // --- NEW: ScrollTrigger Parallax Effect ---
      gsap.to(".user-el", {
        scrollTrigger: { trigger: main.current, scrub: 1 },
        y: -150
      });
      gsap.to(".api-el", {
        scrollTrigger: { trigger: main.current, scrub: 1 },
        y: -100
      });
      gsap.to(".tf-el", {
        scrollTrigger: { trigger: main.current, scrub: 1 },
        y: -100
      });
      gsap.to([".ec2-el", ".nat-el"], {
        scrollTrigger: { trigger: main.current, scrub: 1 },
        y: 50
      });
      gsap.to(".vpc-el", {
        scrollTrigger: { trigger: main.current, scrub: 1 },
        y: 20
      });

    }, main);
    return () => ctx.revert();
  }, []);

  return (
    // We add the 'ref={main}' to the wrapper div
    <div className="w-full h-full flex items-center justify-center p-4 relative" ref={main}>
      {/* Increased max-w-3xl to give more space */}
      <div className="relative w-full max-w-3xl h-[400px] flex items-center justify-center">
        
        {/* Main VPC (Virtual Private Cloud) Box */}
        <div className="vpc-el box absolute inset-x-0 md:inset-x-20 top-0 bottom-0 border-4 border-dashed border-gray-700 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-center text-gray-500 font-semibold">
            Amazon VPC
          </div>
          <div className="relative flex justify-around items-center h-full">
            
            <Link href="#experience" className="z-10 cursor-pointer hover:scale-110 hover:shadow-cyan-400/50 transition-all duration-300">
              <DiagramBox title="AWS EC2 Instance" className="ec2-el box">
                <FaServer className="text-4xl text-cyan-400 mx-auto" />
                <p className="text-xs text-gray-400 mt-2 flex items-center justify-center gap-1"><FaDocker /> Docker</p>
              </DiagramBox>
            </Link>

            <Link href="#experience" className="z-10 cursor-pointer hover:scale-110 hover:shadow-cyan-400/50 transition-all duration-300">
              <DiagramBox title="NAT Gateway" className="nat-el box">
                <FaRoute className="text-4xl text-cyan-400 mx-auto" />
              </DiagramBox>
            </Link>
            
            <Line className="line-internal line line-h h-1 w-1/4 top-1/2 left-[37.5%] z-0" />
          </div>
          <div /> 
        </div>

        {/* --- Components Outside the VPC --- */}
        
        <Link href="#skills" className="absolute left-[-180px] top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 hover:shadow-cyan-400/50 transition-all duration-300">
          <DiagramBox title="Kong API Gateway" className="api-el box">
            <FaShieldAlt className="text-4xl text-cyan-400 mx-auto" />
          </DiagramBox>
        </Link>

        <div className="user-el box absolute left-[-310px] top-1/2 -translate-y-1/2 z-10 text-center">
           <FaUser className="text-5xl text-gray-400 mx-auto" />
           <p className="text-xs text-gray-400 mt-1">User</p>
        </div>
        
        <Link href="#skills" className="absolute right-[-180px] top-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-110 hover:shadow-cyan-400/50 transition-all duration-300">
          <DiagramBox title="Terraform (IaC)" className="tf-el box">
            <FaFileCode className="text-4xl text-cyan-400 mx-auto" />
          </DiagramBox>
        </Link>

        {/* --- Connecting Lines (h-1 for thickness) --- */}
        <Line className="line-user-api line line-h h-1 w-[80px] top-1/2 left-[-240px] z-0" />
        <Line className="line-api-vpc line line-h h-1 w-[110px] top-1/2 left-[-110px] z-0" />
        <Line className="line-tf-vpc line line-h h-1 w-[110px] top-1/2 right-[-110px] z-0" />
        
        {/* --- Data Packets (Positioned relative to center) --- */}
        <DataPacket className="packet1 z-20" />
        <DataPacket className="packet2 z-20" />
      </div>
    </div>
  );
}