import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Environment, ContactShadows, useCursor } from '@react-three/drei';

const scrollTo = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// ---- Laptop ----
const Laptop = ({ position, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const handleHover = (v) => { setHovered(v); onHoverChange?.(v ? 'laptop' : null); };

  return (
    <group
      position={position}
      onPointerOver={() => handleHover(true)}
      onPointerOut={() => handleHover(false)}
      onClick={() => scrollTo('#work')}
    >
      {/* Base */}
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[1.6, 0.07, 1.1]} />
        <meshStandardMaterial color={hovered ? '#e8e8ed' : '#d1d1d6'} roughness={0.2} metalness={0.6} />
      </mesh>
      {/* Keyboard */}
      <mesh position={[0, 0.11, 0.08]}>
        <boxGeometry args={[1.3, 0.02, 0.75]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.9} />
      </mesh>
      {/* Screen hinge */}
      <mesh position={[0, 0.1, -0.55]}>
        <boxGeometry args={[1.6, 0.07, 0.05]} />
        <meshStandardMaterial color="#c7c7cc" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Screen panel */}
      <mesh position={[0, 0.72, -0.52]} rotation={[-0.22, 0, 0]}>
        <boxGeometry args={[1.6, 1.05, 0.04]} />
        <meshStandardMaterial color="#1c1c1e" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Screen display */}
      <mesh position={[0, 0.72, -0.50]} rotation={[-0.22, 0, 0]}>
        <boxGeometry args={[1.46, 0.95, 0.01]} />
        <meshStandardMaterial
          color={hovered ? '#0071E3' : '#2c2c2e'}
          emissive={hovered ? '#0071E3' : '#1c1c1e'}
          emissiveIntensity={hovered ? 0.6 : 0.15}
        />
      </mesh>
      {hovered && <pointLight position={[0, 0.72, -0.3]} intensity={1.5} color="#0071E3" distance={1.5} />}
    </group>
  );
};

// ---- Notebook ----
const Notebook = ({ position, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={position}
      rotation={[0, 0.4, 0]}
      onPointerOver={() => { setHovered(true); onHoverChange?.('notebook'); }}
      onPointerOut={() => { setHovered(false); onHoverChange?.(null); }}
      onClick={(e) => {
        e.stopPropagation();
        window.open('/resume.pdf', '_blank');
      }}
    >
      <mesh>
        <boxGeometry args={[0.6, 0.04, 0.85]} />
        <meshStandardMaterial color={hovered ? '#0071E3' : '#1c1c1e'} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.56, 0.04, 0.81]} />
        <meshStandardMaterial color="#f2f2f7" roughness={0.9} />
      </mesh>
      {[0, 1, 2, 3].map(i => (
        <mesh key={i} position={[0.04, 0.065, -0.25 + i * 0.17]}>
          <boxGeometry args={[0.35, 0.005, 0.01]} />
          <meshStandardMaterial color={hovered ? '#c8e0ff' : '#aeaeb2'} />
        </mesh>
      ))}
    </group>
  );
};

// ---- Coffee Mug ----
const Mug = ({ position, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={position}
      onPointerOver={() => { setHovered(true); onHoverChange?.('mug'); }}
      onPointerOut={() => { setHovered(false); onHoverChange?.(null); }}
      onClick={() => scrollTo('#about')}
    >
      <mesh>
        <cylinderGeometry args={[0.2, 0.17, 0.38, 20]} />
        <meshStandardMaterial color={hovered ? '#0071E3' : '#636366'} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.04, 20]} />
        <meshStandardMaterial color="#3a1a00" roughness={0.8} />
      </mesh>
      <mesh position={[0.27, 0.02, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.1, 0.035, 10, 16, Math.PI]} />
        <meshStandardMaterial color={hovered ? '#0071E3' : '#48484a'} roughness={0.5} />
      </mesh>
    </group>
  );
};

// ---- Plant ----
const Plant = ({ position, onHoverChange }) => {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  return (
    <group
      position={position}
      onPointerOver={() => { setHovered(true); onHoverChange?.('plant'); }}
      onPointerOut={() => { setHovered(false); onHoverChange?.(null); }}
      onClick={() => scrollTo('#contact')}
    >
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.16, 0.12, 0.28, 12]} />
        <meshStandardMaterial color="#8E6B3E" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.22, 14, 14]} />
        <meshStandardMaterial color={hovered ? '#34C759' : '#2d6a2d'} roughness={0.8} />
      </mesh>
      <mesh position={[0.14, 0.46, 0.08]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color={hovered ? '#30D158' : '#3a7a3a'} roughness={0.8} />
      </mesh>
      <mesh position={[-0.12, 0.50, -0.06]}>
        <sphereGeometry args={[0.12, 10, 10]} />
        <meshStandardMaterial color={hovered ? '#34C759' : '#2a6230'} roughness={0.8} />
      </mesh>
    </group>
  );
};

// ---- Desk surface ----
const DeskSurface = () => (
  <>
    <mesh position={[0, 0, 0]} receiveShadow>
      <boxGeometry args={[6, 0.1, 3.2]} />
      <meshStandardMaterial color="#f2f2f7" roughness={0.6} metalness={0.1} />
    </mesh>
    <mesh position={[0, -0.06, 0]}>
      <boxGeometry args={[6.1, 0.04, 3.3]} />
      <meshStandardMaterial color="#e5e5ea" roughness={0.7} />
    </mesh>
    {/* Legs */}
    {[[-2.8, -0.8, -1.4], [2.8, -0.8, -1.4], [-2.8, -0.8, 1.4], [2.8, -0.8, 1.4]].map((p, i) => (
      <mesh key={i} position={p}>
        <boxGeometry args={[0.1, 1.5, 0.1]} />
        <meshStandardMaterial color="#d1d1d6" metalness={0.5} roughness={0.3} />
      </mesh>
    ))}
    {/* Edge stripe */}
    <mesh position={[0, 0.02, 1.6]}>
      <boxGeometry args={[6, 0.06, 0.04]} />
      <meshStandardMaterial color="#c7c7cc" roughness={0.4} />
    </mesh>
  </>
);

const HINTS = {
  laptop: { label: '💻 Laptop', hint: 'Click to see projects' },
  notebook: { label: '📒 Notebook', hint: 'Click to view resume' },
  mug: { label: '☕ Coffee', hint: 'Click to read about me' },
  plant: { label: '🌿 Plant', hint: 'Click to get in touch' },
};

const WorkspaceSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="resume"
      className="py-32"
      style={{ background: 'var(--bg)' }}
    >
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Workspace</p>
          <h2
            className="font-black tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
          >
            My digital desk.
          </h2>
          <p className="text-base max-w-md" style={{ color: 'var(--secondary)' }}>
            Click on any object to explore. Every item tells a story.
          </p>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="apple-card overflow-hidden relative"
          style={{ height: '500px' }}
        >
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 3.5, 7], fov: 42 }} style={{ background: 'white' }}>
            <ambientLight intensity={0.9} />
            <directionalLight position={[6, 8, 4]} intensity={1.2} castShadow />
            <pointLight position={[-4, 3, 2]} intensity={0.5} color="#ffffff" />

            <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.1}>
              <group rotation={[0.18, -0.1, 0]}>
                <DeskSurface />
                <Laptop position={[-1.4, 0.05, 0.2]} onHoverChange={setHovered} />
                <Notebook position={[0.85, 0.07, 0.45]} onHoverChange={setHovered} />
                <Mug position={[1.8, 0.24, -0.5]} onHoverChange={setHovered} />
                <Plant position={[2.3, 0.07, 0.5]} onHoverChange={setHovered} />
              </group>
            </Float>

            <ContactShadows position={[0, -2, 0]} opacity={0.15} scale={14} blur={2.5} />
            <Environment preset="apartment" />
          </Canvas>

          {/* Hover tooltip */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-200 pointer-events-none"
            style={{ opacity: hovered ? 1 : 0, transform: `translateX(-50%) translateY(${hovered ? 0 : 6}px)` }}
          >
            {hovered && (
              <div
                className="px-5 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
                style={{
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
                  border: '1px solid rgba(0,0,0,0.07)',
                }}
              >
                <span>{HINTS[hovered]?.label}</span>
                <span className="text-xs" style={{ color: 'var(--secondary)' }}>—</span>
                <span style={{ color: 'var(--accent)' }}>{HINTS[hovered]?.hint}</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Object legend below */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {Object.entries(HINTS).map(([key, { label, hint }]) => (
            <button
              key={key}
              onClick={() => {
                if (key === 'notebook') {
                  window.open('/resume.pdf', '_blank');
                } else {
                  scrollTo(key === 'laptop' ? '#work' : key === 'mug' ? '#about' : '#contact');
                }
              }}
              className="apple-card p-4 text-left hover:border-blue-200 transition-all duration-200 group"
              style={{ border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <span className="text-xl block mb-2">{label.split(' ')[0]}</span>
              <p className="text-xs font-medium" style={{ color: 'var(--text)' }}>{label.split(' ').slice(1).join(' ')}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--secondary)' }}>{hint}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkspaceSection;
