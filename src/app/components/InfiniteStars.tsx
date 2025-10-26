// app/components/InfiniteStars.tsx
"use client";

import React, { useRef } from 'react';
import { Stars } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function InfiniteStars() {
  const starsRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    // On every frame, update the starfield's position to match the camera's
    if (starsRef.current) {
      starsRef.current.position.copy(state.camera.position);
    }
  });

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={500000} factor={1} saturation={0} fade speed={1} />
    </group>
  );
}