// app/components/ClickableStars.tsx
"use client";

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Create a circular star texture
const createStarTexture = () => {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext('2d')!;
  
  // Create radial gradient for star effect
  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);
  
  return new THREE.CanvasTexture(canvas);
};

type ClickableStarsProps = {
  radius?: number;
  depth?: number;
  count?: number;
  factor?: number;
  saturation?: number;
  fade?: boolean;
  speed?: number;
  onClick?: () => void;
};

export function ClickableStars({
  radius = 100,
  depth = 50,
  count = 5000,
  factor = 4,
  saturation = 0,
  fade = false,
  speed = 1,
  onClick
}: ClickableStarsProps) {
  const ref = useRef<THREE.Points>(null!);

  const starTexture = useMemo(() => createStarTexture(), []);

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const r = radius + Math.random() * depth;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      color.setHSL(0, saturation, Math.random());
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, [count, radius, depth, saturation]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * speed * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * speed * 0.075;
      ref.current.rotation.z = state.clock.elapsedTime * speed * 0.1;

      if (fade) {
        const material = ref.current.material as THREE.PointsMaterial;
        material.opacity = Math.sin(state.clock.elapsedTime * 0.5) * 0.5 + 0.5;
      }
    }
  });

  return (
    <points 
      ref={ref} 
      onClick={onClick}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starTexture}
        size={factor}
        vertexColors
        transparent
        opacity={fade ? 0.8 : 1}
        sizeAttenuation={true}
        alphaTest={0.001}
        depthWrite={false}
      />
    </points>
  );
}