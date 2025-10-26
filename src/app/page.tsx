// app/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import dynamic from 'next/dynamic'; // <-- 1. IMPORT DYNAMIC

// --- 2. IMPORT Scene3D DYNAMICALLY ---
// This tells Next.js to load the 3D scene in a separate file.
const Scene3D = dynamic(() => import('./components/Scene3D'), {
  ssr: false, // Never render this component on the server
  loading: () => <div className="w-full h-full bg-gray-950" /> // Show a blank screen while it loads
});

// Import the hook and 2D components (these are small and fine)
import { useIsMobile } from './hooks/useIsMobile';
import Portfolio2D from './components/Portfolio2D';

// Import the data
import { experienceData } from './components/data/experienceData';
import { projectData } from './components/data/projectData';
import { skillsData } from './components/data/skillsData';

export default function Home() {
  const isMobile = useIsMobile();
  const [isClient, setIsClient] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setIsClient(true);
  }, []);

  // --- THIS LOGIC IS NOW MUCH FASTER ---
  // The 2D version is shown by default, and no 3D code is loaded.
  if (!isClient || isMobile) {
    return <Portfolio2D />;
  }

  // Only if we're on a desktop client will we load the 3D code.
  return (
    <main className="w-full h-full relative">
      {/* 3D Header */}
      <header className="fixed top-0 left-0 w-full p-6 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            className="font-bold text-2xl text-white cursor-pointer hover:text-cyan-400 transition-colors bg-transparent border-none"
            onClick={() => setActiveSection('home')}
          >
           JAI KANSAL
          </button>
          <div className="flex items-center gap-6 text-gray-300">
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" data-target="experience">Experience</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" data-target="projects">Projects</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" data-target="skills">Skills</span>
            <span className="hover:text-cyan-400 transition-colors cursor-pointer" data-target="contact">Contact</span>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 text-gray-950 font-medium py-2 px-4 rounded-md hover:bg-cyan-400 transition-colors"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>

      {/* 3D Scene */}
      <div className="absolute top-0 left-0 w-full h-full z-10">
        <Scene3D
          experienceData={experienceData}
          projectData={projectData}
          skillsData={skillsData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* 3D Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-6 z-50 flex flex-col items-center justify-center gap-4">
        {/* Social Links */}
        <div className="flex justify-center gap-6">
          <a href="https://linkedin.com/in/jai-kansal-371738297" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-3xl">
            <FaLinkedin />
          </a>
          <a href="https://github.com/JaiKansal" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors text-3xl">
            <FaGithub />
          </a>
        </div>

        {/* Attribution */}
        <div className="text-xs text-gray-600">
          <a
            href="https://sketchfab.com/3d-models/crystal-stone-rock-1ad829e2f464446fa4945562ab611255"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition-colors"
          >
            "Crystal stone (rock)" by GenEugene
          </a>
          <span> licensed under </span>
          <a
            href="http://creativecommons.org/licenses/by-nc/4.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-500 transition-colors"
          >
            CC BY-NC 4.0
          </a>
        </div>
      </footer>
    </main>
  );
}