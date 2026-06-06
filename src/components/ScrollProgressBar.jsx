import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left"
      style={{
        scaleX,
        height: '3px',
        background: 'linear-gradient(90deg, #0071E3, #7c3aed, #ec4899)',
        transformOrigin: '0%',
      }}
    />
  );
};

export default ScrollProgressBar;
