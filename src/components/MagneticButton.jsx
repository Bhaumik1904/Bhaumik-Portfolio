import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps any child with a magnetic attraction toward the cursor on hover.
 * Desktop only (skips on touch devices).
 * 
 * Usage:
 *   <MagneticButton>
 *     <button className="btn-apple">Let's talk</button>
 *   </MagneticButton>
 */
const MagneticButton = ({ children, strength = 0.35, className = '' }) => {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  if (isTouch) return <>{children}</>;

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * strength;
    const y = (e.clientY - rect.top  - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 180, damping: 14, mass: 0.08 }}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
