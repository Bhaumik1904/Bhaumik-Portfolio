import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  // Don't render on touch devices — there's no cursor, and it wastes resources
  if (typeof window !== 'undefined' && ('ontouchstart' in window || window.innerWidth < 768)) {
    return null;
  }

  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };
    const hideCursor = () => setIsVisible(false);
    
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
    };
  }, [cursorX, cursorY, isVisible]);

  return (
    <>
      {/* Trailing ring (halo effect) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-black/40 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor;
