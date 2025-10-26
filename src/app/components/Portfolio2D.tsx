// app/components/Portfolio2D.tsx
"use client";

import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Link from 'next/link';

// Import all our sections and their data
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import { experienceData } from './data/experienceData';
import { projectData } from './data/projectData';
import { skillsData } from './data/skillsData';

export default function Portfolio2D() {
  return (
    // This is the main 2D container
    <main className="w-full min-h-screen px-4 py-6 pt-24 sm:px-6 md:px-12 md:pt-32 overflow-x-hidden">
      {/* 1. Mobile Hero Section */}
      <section 
        id="hero-2d" 
        className="flex flex-col items-center text-center mb-24"
      >
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 px-2">
          Jai Kansal
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-cyan-400 mb-6 px-2">
          Full-Stack & Cloud Engineer
        </p>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-8 px-4">
          Computer Science student with expertise in full-stack development, cloud infrastructure, and DSA. 
          Let's build something impactful.
        </p>
        <a 
          href="/Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-cyan-500 text-gray-950 font-medium py-3 px-6 rounded-md
                     hover:bg-cyan-400 transition-colors text-lg"
        >
          Download Resume
        </a>
      </section>

      {/* 2. Stacked Sections */}
      {/* We pass the data to each component just like we did in Scene3D */}
      <div className="max-w-4xl mx-auto flex flex-col gap-12 sm:gap-20 items-center">
        <section id="experience">
          <Experience data={experienceData} />
        </section>
        
        <section id="projects">
          <Projects data={projectData} />
        </section>
        
        <section id="skills">
          <Skills data={skillsData} />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </div>
      
      {/* 3. 2D Footer */}
      <footer className="mt-24 text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a 
            href="https://linkedin.com/in/jai-kansal-371738297" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-cyan-400 transition-colors text-3xl"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://github.com/JaiKansal"
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-cyan-400 transition-colors text-3xl"
          >
            <FaGithub />
          </a>
        </div>
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