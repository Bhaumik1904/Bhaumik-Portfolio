import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, Environment, useCursor, Text } from '@react-three/drei';
import * as THREE from 'three';

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ---- Glow ring under objects ----
const GlowRing = ({ color }) => (
  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
    <ringGeometry args={[0.3, 0.45, 32]} />
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.5} toneMapped={false} />
  </mesh>
);

// ---- Interactive Laptop ----
const Laptop = ({ position }) => {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef();
  useCursor(hovered);

  useFrame(({ clock }) => {
    if (screenRef.current && hovered) {
      screenRef.current.material.emissiveIntensity = 0.8 + Math.sin(clock.getElapsedTime() * 4) * 0.2;
    } else if (screenRef.current) {
      screenRef.current.material.emissiveIntensity *= 0.9;
    }
  });

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => scrollTo('projects')}
    >
      {/* Base */}
      <mesh position={[0, 0.07, 0]}>
        <boxGeometry args={[1.4, 0.08, 1]} />
        <meshStandardMaterial color={hovered ? '#e0e7ff' : '#c7d2fe'} roughness={0.3} metalness={0.5} />
      </mesh>
      {/* Keyboard area */}
      <mesh position={[0, 0.12, 0.1]}>
        <boxGeometry args={[1.1, 0.02, 0.7]} />
        <meshStandardMaterial color="#312e81" roughness={0.8} />
      </mesh>
      {/* Screen hinge */}
      <mesh position={[0, 0.12, -0.5]}>
        <boxGeometry args={[1.4, 0.06, 0.06]} />
        <meshStandardMaterial color="#4338ca" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.75, -0.46]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.4, 1.0, 0.05]} />
        <meshStandardMaterial
          color={hovered ? '#4f46e5' : '#1e1b4b'}
          emissive={hovered ? '#4f46e5' : '#2d2778'}
          emissiveIntensity={hovered ? 0.8 : 0.2}
        />
      </mesh>
      {/* Screen glow when hovered */}
      {hovered && (
        <pointLight position={[0, 0.75, -0.3]} intensity={2} color="#4f46e5" distance={2} />
      )}
      {hovered && <GlowRing color="#6366f1" />}
    </group>
  );
};

// ---- Interactive Notebook ----
const Notebook = ({ position }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={position}
      rotation={[0, 0.3, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        window.open('/resume.pdf', '_blank');
      }}
    >
      {/* Book body */}
      <mesh>
        <boxGeometry args={[0.55, 0.04, 0.78]} />
        <meshStandardMaterial color={hovered ? '#ec4899' : '#9f1239'} roughness={0.7} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.02, 0.04, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.74]} />
        <meshStandardMaterial color="#f5f0e8" roughness={0.9} />
      </mesh>
      {/* Spine */}
      <mesh position={[-0.275, 0.02, 0]}>
        <boxGeometry args={[0.04, 0.09, 0.78]} />
        <meshStandardMaterial color={hovered ? '#f472b6' : '#be123c'} roughness={0.6} />
      </mesh>
      {/* Lines on cover */}
      {[0, 1, 2].map(i => (
        <mesh key={i} position={[0.06, 0.045, -0.15 + i * 0.18]}>
          <boxGeometry args={[0.3, 0.008, 0.01]} />
          <meshStandardMaterial color={hovered ? '#fce7f3' : '#fecdd3'} emissive={hovered ? '#fce7f3' : '#000'} emissiveIntensity={hovered ? 0.5 : 0} />
        </mesh>
      ))}
      {hovered && <GlowRing color="#ec4899" />}
    </group>
  );
};

// ---- Coffee Mug ----
const CoffeeMug = ({ position }) => {
  const [hovered, setHovered] = useState(false);
  const steamRef1 = useRef();
  const steamRef2 = useRef();
  useCursor(hovered);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (steamRef1.current) {
      steamRef1.current.position.y = 0.5 + (Math.sin(t * 2 + 0) * 0.1 + 0.1);
      steamRef1.current.material.opacity = Math.max(0, 0.4 - (steamRef1.current.position.y - 0.5) * 0.4);
    }
    if (steamRef2.current) {
      steamRef2.current.position.y = 0.5 + (Math.sin(t * 2 + 1.5) * 0.1 + 0.1);
      steamRef2.current.material.opacity = Math.max(0, 0.4 - (steamRef2.current.position.y - 0.5) * 0.4);
    }
  });

  return (
    <group
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => scrollTo('contact')}
    >
      {/* Mug body */}
      <mesh>
        <cylinderGeometry args={[0.22, 0.19, 0.42, 16]} />
        <meshStandardMaterial color={hovered ? '#06b6d4' : '#0e7490'} roughness={0.5} />
      </mesh>
      {/* Mug inside */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.19, 0.19, 0.08, 16]} />
        <meshStandardMaterial color="#1c1917" />
      </mesh>
      {/* Coffee surface */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.02, 16]} />
        <meshStandardMaterial color="#451a03" roughness={1} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.3, 0, 0]}>
        <torusGeometry args={[0.12, 0.04, 8, 12, Math.PI]} />
        <meshStandardMaterial color={hovered ? '#22d3ee' : '#0e7490'} roughness={0.5} />
      </mesh>
      {/* Steam */}
      <mesh ref={steamRef1} position={[-0.06, 0.4, 0]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.3} />
      </mesh>
      <mesh ref={steamRef2} position={[0.06, 0.5, 0]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.2} />
      </mesh>
      {hovered && <GlowRing color="#06b6d4" />}
    </group>
  );
};

// ---- Desk Surface ----
const Desk = () => (
  <>
    {/* Desktop surface */}
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[5.5, 0.12, 2.8]} />
      <meshStandardMaterial color="#1a1033" roughness={0.6} metalness={0.2} />
    </mesh>
    {/* Desk edge highlight */}
    <mesh position={[0, -0.02, 1.4]}>
      <boxGeometry args={[5.5, 0.08, 0.05]} />
      <meshStandardMaterial color="#4c1d95" emissive="#4c1d95" emissiveIntensity={0.5} />
    </mesh>
    {/* Desk legs */}
    {[[-2.5, -0.8, -1.2], [2.5, -0.8, -1.2], [-2.5, -0.8, 1.2], [2.5, -0.8, 1.2]].map((pos, i) => (
      <mesh key={i} position={pos}>
        <boxGeometry args={[0.12, 1.5, 0.12]} />
        <meshStandardMaterial color="#0f0a1e" roughness={0.8} />
      </mesh>
    ))}
    {/* Monitor stand */}
    <mesh position={[-1.4, 0.06, -0.5]}>
      <cylinderGeometry args={[0.08, 0.15, 0.12, 12]} />
      <meshStandardMaterial color="#312e81" metalness={0.6} roughness={0.3} />
    </mesh>
    <mesh position={[-1.4, 0.12, -0.5]}>
      <cylinderGeometry args={[0.05, 0.05, 1.1, 12]} />
      <meshStandardMaterial color="#312e81" metalness={0.6} roughness={0.3} />
    </mesh>
    {/* Monitor */}
    <mesh position={[-1.4, 0.9, -0.5]}>
      <boxGeometry args={[1.8, 1.1, 0.08]} />
      <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.5} />
    </mesh>
    <mesh position={[-1.4, 0.9, -0.46]}>
      <boxGeometry args={[1.6, 0.95, 0.02]} />
      <meshStandardMaterial color="#1e1b4b" emissive="#2e1065" emissiveIntensity={0.5} />
    </mesh>
    {/* Pen holder */}
    <mesh position={[2.0, 0.22, 0.5]}>
      <cylinderGeometry args={[0.12, 0.12, 0.35, 12]} />
      <meshStandardMaterial color="#7c3aed" roughness={0.6} />
    </mesh>
    {/* Pens */}
    {[[-0.04, 0], [0.04, 0.1], [0, -0.06]].map(([ox, oz], i) => (
      <mesh key={i} position={[2.0 + ox, 0.5, 0.5 + oz]}>
        <cylinderGeometry args={[0.015, 0.015, 0.5, 8]} />
        <meshStandardMaterial color={['#60a5fa', '#34d399', '#f472b6'][i]} emissive={['#60a5fa', '#34d399', '#f472b6'][i]} emissiveIntensity={0.5} />
      </mesh>
    ))}
    {/* Small plant */}
    <mesh position={[2.2, 0.2, -0.8]}>
      <cylinderGeometry args={[0.15, 0.12, 0.28, 10]} />
      <meshStandardMaterial color="#92400e" roughness={0.9} />
    </mesh>
    <mesh position={[2.2, 0.42, -0.8]}>
      <sphereGeometry args={[0.22, 12, 12]} />
      <meshStandardMaterial color="#15803d" roughness={0.8} />
    </mesh>
    <mesh position={[2.28, 0.55, -0.72]}>
      <sphereGeometry args={[0.14, 10, 10]} />
      <meshStandardMaterial color="#16a34a" roughness={0.8} />
    </mesh>
  </>
);

// ---- Main Desk Scene ----
const DeskScene = () => (
  <Canvas dpr={[1, 1.5]} camera={{ position: [0, 3, 6], fov: 50 }} style={{ background: 'transparent' }}>
    <ambientLight intensity={0.3} />
    <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
    <pointLight position={[0, 3, 3]} intensity={1.5} color="#7c3aed" />
    <pointLight position={[-3, 2, 0]} intensity={1} color="#06b6d4" />
    <pointLight position={[3, 2, 0]} intensity={0.8} color="#ec4899" />

    <Float speed={1.5} rotationIntensity={0.08} floatIntensity={0.15}>
      <group rotation={[0.25, -0.15, 0]}>
        <Desk />
        <Laptop position={[-1.4, 0.06, 0.3]} />
        <Notebook position={[0.9, 0.09, 0.4]} />
        <CoffeeMug position={[1.7, 0.22, -0.6]} />
      </group>
    </Float>

    <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={12} blur={2} color="#7c3aed" />
    <Environment preset="city" />
  </Canvas>
);

export default DeskScene;
