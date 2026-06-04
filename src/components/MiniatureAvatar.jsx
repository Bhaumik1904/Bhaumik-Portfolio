import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// ---- Floating Orbs around avatar ----
const FloatingOrb = ({ position, color, speed = 1 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.2;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.1;
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
};

// ---- The 3D Miniature Character ----
const Character = ({ mouse }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Idle body bob
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }

    // Head tracks mouse
    if (headRef.current) {
      const targetX = -mouse.current.y * 0.4;
      const targetY = mouse.current.x * 0.5;
      headRef.current.rotation.x += (targetX - headRef.current.rotation.x) * 0.05;
      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * 0.05;
    }

    // Arms swing gently
    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.4 + Math.sin(t * 1.2) * 0.1;
    }
    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.4 - Math.sin(t * 1.2) * 0.1;
    }
  });

  const bodyMat = <meshStandardMaterial color="#1e1b4b" roughness={0.4} metalness={0.2} />;
  const skinMat = <meshStandardMaterial color="#fcd5ce" roughness={0.8} />;
  const hairMat = <meshStandardMaterial color="#1c1917" roughness={0.9} />;
  const shirtMat = <meshStandardMaterial color="#4f46e5" roughness={0.5} metalness={0.1} emissive="#4f46e5" emissiveIntensity={0.1} />;
  const pantsMat = <meshStandardMaterial color="#0f172a" roughness={0.7} />;
  const shoesMat = <meshStandardMaterial color="#1e1b4b" roughness={0.5} metalness={0.3} />;

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* Legs */}
      <mesh position={[-0.18, 0.45, 0]}>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        {pantsMat}
      </mesh>
      <mesh position={[0.18, 0.45, 0]}>
        <boxGeometry args={[0.25, 0.9, 0.25]} />
        {pantsMat}
      </mesh>
      {/* Shoes */}
      <mesh position={[-0.18, 0.06, 0.06]}>
        <boxGeometry args={[0.28, 0.14, 0.38]} />
        {shoesMat}
      </mesh>
      <mesh position={[0.18, 0.06, 0.06]}>
        <boxGeometry args={[0.28, 0.14, 0.38]} />
        {shoesMat}
      </mesh>

      {/* Body (torso) */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.7, 0.9, 0.38]} />
        {shirtMat}
      </mesh>

      {/* Collar glow accent */}
      <mesh position={[0, 1.52, 0.17]}>
        <boxGeometry args={[0.35, 0.08, 0.08]} />
        <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={2} toneMapped={false} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.52, 1.1, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.75, 0.22]} />
          {shirtMat}
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.46, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          {skinMat}
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.52, 1.1, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.22, 0.75, 0.22]} />
          {shirtMat}
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.46, 0]}>
          <sphereGeometry args={[0.12, 8, 8]} />
          {skinMat}
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 1.63, 0]}>
        <cylinderGeometry args={[0.12, 0.14, 0.2, 8]} />
        {skinMat}
      </mesh>

      {/* Head */}
      <group ref={headRef} position={[0, 1.98, 0]}>
        {/* Head base */}
        <mesh>
          <boxGeometry args={[0.6, 0.65, 0.58]} />
          {skinMat}
        </mesh>
        {/* Hair top */}
        <mesh position={[0, 0.33, 0]}>
          <boxGeometry args={[0.62, 0.2, 0.6]} />
          {hairMat}
        </mesh>
        {/* Hair sides */}
        <mesh position={[-0.3, 0.15, 0]}>
          <boxGeometry args={[0.06, 0.4, 0.58]} />
          {hairMat}
        </mesh>
        <mesh position={[0.3, 0.15, 0]}>
          <boxGeometry args={[0.06, 0.4, 0.58]} />
          {hairMat}
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.14, 0.05, 0.3]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1e1b4b" />
        </mesh>
        <mesh position={[0.14, 0.05, 0.3]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#1e1b4b" />
        </mesh>
        {/* Eye shine */}
        <mesh position={[-0.12, 0.08, 0.36]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.16, 0.08, 0.36]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="white" emissive="white" emissiveIntensity={2} />
        </mesh>
        {/* Smile */}
        <mesh position={[0, -0.12, 0.3]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.1, 0.018, 8, 12, Math.PI]} />
          <meshStandardMaterial color="#9f1239" />
        </mesh>
        {/* Glasses frame */}
        <mesh position={[-0.14, 0.06, 0.32]}>
          <torusGeometry args={[0.09, 0.015, 8, 20]} />
          <meshStandardMaterial color="#312e81" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.14, 0.06, 0.32]}>
          <torusGeometry args={[0.09, 0.015, 8, 20]} />
          <meshStandardMaterial color="#312e81" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Glasses bridge */}
        <mesh position={[0, 0.06, 0.32]}>
          <boxGeometry args={[0.1, 0.015, 0.02]} />
          <meshStandardMaterial color="#312e81" metalness={0.8} />
        </mesh>
      </group>

      {/* Floating orbs around character */}
      <FloatingOrb position={[-0.8, 1.5, 0.3]} color="#7c3aed" speed={1.3} />
      <FloatingOrb position={[0.9, 0.9, 0.2]} color="#06b6d4" speed={0.9} />
      <FloatingOrb position={[0.5, 2.2, -0.2]} color="#ec4899" speed={1.6} />
      <FloatingOrb position={[-0.6, 0.5, 0.4]} color="#a78bfa" speed={1.1} />
      <FloatingOrb position={[0.2, 2.6, 0.3]} color="#06b6d4" speed={0.7} />
    </group>
  );
};

// ---- Main Avatar Scene ----
const MiniatureAvatar = () => {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.5, 5], fov: 42 }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={1.5} color="#7c3aed" />
      <pointLight position={[3, 1, 2]} intensity={1} color="#06b6d4" />
      <pointLight position={[0, 3, 1]} intensity={0.5} color="#ec4899" />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <Character mouse={mouse} />
      </Float>

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.3}
        scale={5}
        blur={2.5}
        color="#7c3aed"
      />
      <Environment preset="city" />
    </Canvas>
  );
};

export default MiniatureAvatar;
