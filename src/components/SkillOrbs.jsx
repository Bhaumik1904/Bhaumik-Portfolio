import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const SKILLS = [
  { label: 'React', color: '#61DAFB', bg: '#EFF9FE' },
  { label: 'Node.js', color: '#339933', bg: '#EFF7EF' },
  { label: 'Python', color: '#3776AB', bg: '#EEF4FA' },
  { label: 'TypeScript', color: '#3178C6', bg: '#EEF4FA' },
  { label: 'MongoDB', color: '#47A248', bg: '#EFF7EF' },
  { label: 'PostgreSQL', color: '#4169E1', bg: '#EEF2FB' },
  { label: 'Docker', color: '#2496ED', bg: '#EEF7FE' },
  { label: 'JavaScript', color: '#F7DF1E', bg: '#FDFBEE', textColor: '#7A6A00' },
];

// Spring config for Apple-quality motion
const springConfig = { stiffness: 200, damping: 20, mass: 0.8 };

// Positions around the avatar (as percentages of the container)
const ORB_POSITIONS = [
  { x: -260, y: -120 },
  { x: -240, y: 60 },
  { x: -180, y: 230 },
  { x: 220, y: -140 },
  { x: 250, y: 50 },
  { x: 200, y: 220 },
  { x: -60, y: -200 },
  { x: 50, y: -210 },
];

const FLOAT_DELAYS = [0, 0.8, 1.6, 0.4, 1.2, 2.0, 0.2, 1.4];
const FLOAT_DURATIONS = [4.5, 5.0, 4.0, 5.5, 4.2, 4.8, 5.2, 4.6];

const DraggableOrb = ({ skill, initialX, initialY, floatDelay, floatDuration, index }) => {
  const x = useMotionValue(initialX);
  const y = useMotionValue(initialY);
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const isDragging = useRef(false);
  const floatOffset = useRef(0);

  const handleDragStart = () => {
    isDragging.current = true;
  };

  const handleDragEnd = (_, info) => {
    isDragging.current = false;
    // Apply velocity then spring back
    const vx = info.velocity.x * 0.1;
    const vy = info.velocity.y * 0.1;
    x.set(initialX + vx);
    y.set(initialY + vy);
    setTimeout(() => {
      x.set(initialX);
      y.set(initialY);
    }, 80);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.15}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{
        x: springX,
        y: springY,
        position: 'absolute',
        left: '50%',
        top: '50%',
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 20,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      animate={{
        y: [initialY - 6, initialY + 6, initialY - 6],
      }}
      transition={{
        y: {
          duration: floatDuration,
          repeat: Infinity,
          delay: floatDelay,
          ease: 'easeInOut',
        },
      }}
      whileDrag={{ scale: 1.1, cursor: 'grabbing', zIndex: 30 }}
      whileHover={{ scale: 1.06 }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-2xl select-none"
        style={{
          background: skill.bg,
          border: `1px solid ${skill.color}30`,
          boxShadow: `0 4px 20px ${skill.color}18, 0 1px 4px rgba(0,0,0,0.06)`,
          backdropFilter: 'blur(8px)',
          whiteSpace: 'nowrap',
          minWidth: '110px',
          justifyContent: 'center',
        }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: skill.color }}
        />
        <span
          className="text-xs font-semibold"
          style={{ color: skill.textColor || skill.color }}
        >
          {skill.label}
        </span>
      </div>
    </motion.div>
  );
};

const SkillOrbs = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      {SKILLS.map((skill, i) => (
        <div key={skill.label} style={{ pointerEvents: 'auto' }}>
          <DraggableOrb
            skill={skill}
            initialX={ORB_POSITIONS[i].x}
            initialY={ORB_POSITIONS[i].y}
            floatDelay={FLOAT_DELAYS[i]}
            floatDuration={FLOAT_DURATIONS[i]}
            index={i}
          />
        </div>
      ))}
    </div>
  );
};

export default SkillOrbs;
