// app/components/Scene3D.tsx
"use client";

import { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  Html
} from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// Import our 2D components
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';
import { experienceData } from './data/experienceData';
import { projectData } from './data/projectData';
import { skillsData } from './data/skillsData';
import { ClickableStars } from './ClickableStars';
import { CrystalModel } from './CrystalModel';


// Type for the main component's props
type Scene3DProps = {
  experienceData: typeof experienceData;
  projectData: typeof projectData;
  skillsData: typeof skillsData;
  activeSection?: string;
  setActiveSection?: (section: string) => void;
};

// --- Main 3D Scene Component ---
export default function Scene3D({ 
  experienceData, 
  projectData, 
  skillsData, 
  activeSection: externalActiveSection,
  setActiveSection: externalSetActiveSection
}: Scene3DProps) {
  const [internalActiveSection, setInternalActiveSection] = useState('home');
  
  // Use external state if provided, otherwise use internal state
  const activeSection = externalActiveSection ?? internalActiveSection;
  const setActiveSection = externalSetActiveSection ?? setInternalActiveSection;
  const controlsRef = useRef<CameraControls>(null!);

  const nodePositions = {
    home: { x: 0, y: 1, z: 12 },
    experience: { x: -5, y: 0, z: 0 },
    projects: { x: 0, y: 3, z: -3 },
    skills: { x: 5, y: 0, z: 0 },
    contact: { x: 0, y: -3, z: -3 },
  };

  // Optimization: Only run lookAt on activeSection change
  useEffect(() => {
    const { x, y, z } = nodePositions[activeSection as keyof typeof nodePositions];

    if (activeSection === 'home') {
      controlsRef.current?.setLookAt(0, 1, 12, 0, 1, 0, true);
    } else {
      controlsRef.current?.setLookAt(
        x, y + 1, z + 7,
        x, y, z,
        true
      );
    }
  }, [activeSection]);

  // Optimization: Use a click handler for navigation
  useEffect(() => {
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).dataset.target;
      if (target && nodePositions[target as keyof typeof nodePositions]) {
        setActiveSection(target);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Optimization: Defined pointer handlers once
  const handlePointerOver = useCallback(() => {
    if (controlsRef.current) controlsRef.current.mouseButtons.wheel = 0;
  }, []);
  const handlePointerOut = useCallback(() => {
    if (controlsRef.current) controlsRef.current.mouseButtons.wheel = 1;
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
    exit: { opacity: 0, scale: 0.8, x: 20, transition: { duration: 0.3 } },
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 12], fov: 60 }}
      gl={{
        antialias: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        failIfMajorPerformanceCaveat: false
      }}
      onCreated={({ gl }) => {
        // Add context loss recovery
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          console.log('WebGL context lost, attempting recovery...');
          e.preventDefault();
        });
        gl.domElement.addEventListener('webglcontextrestored', () => {
          console.log('WebGL context restored');
        });
      }}
    >
      {/* --- Simplified Lighting --- */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Optimization: Added camera bounds and faster smoothTime */}
      <CameraControls
        ref={controlsRef}
        smoothTime={0.3}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 2 - 0.1}
      />

      {/* --- Dense Clickable Stars Background --- */}
      <ClickableStars
        radius={300}
        depth={300}
        count={1000}
        factor={8}
        saturation={0}
        speed={0.4}
        onClick={() => setActiveSection('home')}
      />

      {/* --- CrystalModel calls (Added 'key' prop) --- */}
      <Suspense fallback={null}>
        <CrystalModel
          key="exp"
          position={[-5, 0, 0]}
          text="Experience"
          onClick={() => setActiveSection('experience')}
          isActive={activeSection === 'experience'}
        />
        <CrystalModel
          key="proj"
          position={[0, 3, -3]}
          text="Projects"
          onClick={() => setActiveSection('projects')}
          isActive={activeSection === 'projects'}
        />
        <CrystalModel
          key="skills"
          position={[5, 0, 0]}
          text="Skills"
          onClick={() => setActiveSection('skills')}
          isActive={activeSection === 'skills'}
        />
        <CrystalModel
          key="contact"
          position={[0, -3, -3]}
          text="Contact"
          onClick={() => setActiveSection('contact')}
          isActive={activeSection === 'contact'}
        />
        {/* --- Home / Hero Text (No Change) --- */}
        <Html
          position={[0, 1.5, 0]}
          center
          pointerEvents="none"
        >
          <AnimatePresence>
            {activeSection === 'home' && (
              <motion.div
                className="text-center w-[400px]"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h1
                  className="text-6xl font-bold text-white mb-3 cursor-pointer hover:text-cyan-400 transition-colors"
                  
                  style={{ pointerEvents: 'auto' }}
                >
                  Jai Kansal
                </h1>
                <p className="text-2xl text-cyan-400 mb-4">Full-Stack & Cloud Engineer</p>
                <p className="text-lg text-gray-300">
                  Click a node to explore my work, or click my name to return home.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Html>

        {/* --- HTML Overlays (Using optimized handlers) --- */}
        <Html position={[-5, 0, 0]} center>
          <AnimatePresence>
            {activeSection === 'experience' && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
              >
                <Experience data={experienceData} />
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
        <Html position={[0, 3, -3]} center>
          <AnimatePresence>
            {activeSection === 'projects' && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
              >
                <Projects data={projectData} />
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
        <Html position={[5, 0, 0]} center>
          <AnimatePresence>
            {activeSection === 'skills' && ( // <-- FIX 1 applied here
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
              >
                <Skills data={skillsData} />
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
        <Html position={[0, -3, -3]} center>
          <AnimatePresence>
            {activeSection === 'contact' && (
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
              >
                <Contact />
              </motion.div>
            )}
          </AnimatePresence>
        </Html>
      </Suspense>

      {/* --- Original Clickable "Floor" - Commented out --- */}
      {/* <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -5, 0]}
        receiveShadow
        onClick={() => setActiveSection('home')}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.3} />
      </mesh> */}

      {/* Post-processing remains disabled to reduce GPU load */}
    </Canvas>
  );
}