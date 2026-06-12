import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Framer']
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: ['Node.js', 'Python', 'Express', 'Django', 'GraphQL']
  },
  {
    id: 'database',
    title: 'Database',
    skills: ['MongoDB', 'PostgreSQL', 'Redis', 'Prisma', 'Supabase']
  },
  {
    id: 'cloud',
    title: 'DevOps',
    skills: ['Docker', 'AWS', 'Git', 'Linux', 'Vercel']
  }
];

// Option 4: Cinematic Marquee Background
const MarqueeRow = ({ items, direction }) => {
  return (
    <div className="flex whitespace-nowrap overflow-hidden py-2">
      <motion.div
        className="flex gap-16 items-center pr-16"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ repeat: Infinity, duration: 50, ease: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className="text-[8rem] md:text-[12rem] font-black uppercase text-transparent tracking-tighter" 
            style={{ WebkitTextStroke: '3px var(--border)' }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const MarqueeBg = () => {
  const row1 = ['Innovation', 'Scalability', 'Performance', 'Design'];
  const row2 = ['Architecture', 'Experiences', 'Interface', 'Systems'];
  
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center overflow-hidden rotate-[-4deg] scale-125 z-0">
      <MarqueeRow items={row1} direction="left" />
      <MarqueeRow items={row2} direction="right" />
      <MarqueeRow items={row1} direction="left" />
    </div>
  );
};

// Option 1 & 2: 3D Honeycomb / Carousel Item
const DraggableSkill = ({ skill, index, total, constraintsRef }) => {
  // Calculate circular/honeycomb position
  const angle = (index / total) * Math.PI * 2;
  const radius = window.innerWidth < 768 ? 90 : 160; 
  const initialX = Math.cos(angle) * radius;
  const initialY = Math.sin(angle) * radius;

  return (
    <motion.div
      layoutId={`skill-${skill}`}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragMomentum={true}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, x: initialX, y: initialY, rotate: 0 }}
      exit={{ opacity: 0, scale: 0, x: 0, y: 0, rotate: 20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20, delay: index * 0.04 }}
      className="absolute top-1/2 left-1/2 -mt-12 -ml-16 w-32 h-24 rounded-3xl border flex items-center justify-center cursor-grab active:cursor-grabbing bg-white/65 dark:bg-white/5 backdrop-blur-3xl border-white/80 dark:border-white/10"
      style={{
        boxShadow: '0 20px 40px var(--shadow-md), inset 0 2px 15px rgba(255,255,255,0.1)',
      }}
      whileHover={{ scale: 1.15, zIndex: 50 }}
      whileDrag={{ scale: 1.25, zIndex: 100, boxShadow: '0 30px 60px var(--shadow-lg)' }}
    >
      <span className="font-bold text-[var(--text)] text-lg tracking-tight">{skill}</span>
    </motion.div>
  );
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const constraintsRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  return (
    <section className="relative w-full flex items-center overflow-hidden py-10 md:py-14" style={{ background: 'var(--bg)' }}>
      {/* Background: Cinematic Marquee — desktop only */}
      {!isMobile && <MarqueeBg />}
      
      {/* Gradients to fade out marquee on edges */}
      <div className="absolute inset-x-0 top-0 h-32 z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, var(--bg), transparent)' }} />
      <div className="absolute inset-x-0 bottom-0 h-32 z-0 pointer-events-none" style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center h-full px-6">
        
        {/* Left Side: Agency Hover List (Option 3) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center gap-2 md:gap-4 z-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl font-bold tracking-widest text-blue-500 mb-4 md:mb-8 uppercase"
          >
            My Arsenal
          </motion.h2>
          
          <div className="flex flex-col">
            {CATEGORIES.map(cat => (
              <motion.div 
                key={cat.id} 
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => setActiveCategory(cat)}
                className="relative group cursor-pointer py-2 md:py-4 w-max"
                style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
              >
                <div 
                  className="text-5xl md:text-8xl font-black tracking-tighter transition-all duration-500"
                  style={{
                    color: activeCategory.id === cat.id ? 'var(--text)' : 'transparent',
                    WebkitTextStroke: activeCategory.id === cat.id ? 'none' : '2px rgba(0,0,0,0.25)',
                    transform: activeCategory.id === cat.id ? 'translateX(20px)' : 'translateX(0px)',
                  }}
                >
                  {cat.title}
                </div>
                {/* Accent line indicator */}
                <div 
                  className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-2 bg-blue-500 transition-all duration-500 rounded-full"
                  style={{ height: activeCategory.id === cat.id ? '60%' : '0%' }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: On desktop - Interactive Honeycomb. On mobile - Static grid */}
        {isMobile ? (
          <div className="w-full md:w-1/2 mt-8 z-30">
            <div className="flex flex-wrap gap-3 justify-center">
              {activeCategory.skills.map((skill) => (
                <div
                  key={skill}
                  className="px-5 py-2.5 rounded-2xl text-sm font-bold"
                  style={{
                    background: 'var(--card)',
                    border: '1.5px solid var(--accent)',
                    color: 'var(--text)',
                    boxShadow: '0 2px 10px rgba(0,113,227,0.12)',
                  }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ) : (
        <div 
           ref={constraintsRef} 
           className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative mt-12 md:mt-0 z-30"
        >
          {/* Subtle center glow where the skills orbit */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-blue-400/5 blur-[100px] pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div key={activeCategory.id} className="absolute inset-0">
              {activeCategory.skills.map((skill, i) => (
                <DraggableSkill 
                  key={skill} 
                  skill={skill} 
                  index={i} 
                  total={activeCategory.skills.length} 
                  constraintsRef={constraintsRef} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;
