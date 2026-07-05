import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Data Scientist Associate',
    issuer: 'DataCamp',
    date: '2025',
    description: 'Certified as a Data Scientist Associate by DataCamp, demonstrating proficiency in data analysis, statistical modeling, machine learning, and data wrangling using Python. Validated through rigorous skill assessments and a practical exam.',
    link: 'https://www.datacamp.com/certificate/DSA0017798379944',
    image: '/Data Scientist Associate.png',
  },
  {
    id: 2,
    title: 'MongoDB Associate Developer',
    issuer: 'MongoDB · Credly',
    date: '2026',
    description: 'Certified expertise in MongoDB, covering document database modeling, complex data aggregations, indexing strategies, and building scalable backend applications using NoSQL architecture.',
    link: 'https://www.credly.com/badges/fc861de6-29f9-4cd0-ae9a-f23416e97ee9/public_url',
    image: '/MongoDB Associate Developer.png',
  },
  {
    id: 3,
    title: 'Frontend Developer',
    issuer: 'HackerRank',
    date: '2026',
    description: 'Demonstrated proficiency in building responsive, interactive, and accessible user interfaces using modern web technologies including HTML5, CSS3, JavaScript, and React. Validated through rigorous practical assessments.',
    link: 'https://www.hackerrank.com/certificates/79a3773e493f',
    image: '/Hackerrank Frontend Developer.jpg',
  },
  {
    id: 4,
    title: 'Software Engineer',
    issuer: 'HackerRank',
    date: '2026',
    description: 'Validated strong core computer science fundamentals, algorithm design, data structures, and problem-solving skills necessary for building robust and scalable software solutions.',
    link: 'https://www.hackerrank.com/certificates/f51f6e9d9664',
    image: '/Hackerrank Software Engineer.jpg',
  },
];

const CertificationsSection = () => {
  const [activeId, setActiveId] = useState(CERTIFICATIONS[0].id);
  const activeCert = CERTIFICATIONS.find(c => c.id === activeId);

  // We duplicate the array to create a seamless infinite marquee effect
  const marqueeItems = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];

  return (
    <section id="certifications" className="pt-8 pb-14 md:pt-10 md:pb-20 overflow-hidden" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label mb-3">Credentials</p>
          <h2
            className="font-black tracking-tight leading-none"
            style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
          >
            Verified Expertise.
          </h2>
        </motion.div>
      </div>

      {/* Marquee Ticker */}
      <div 
        className="w-full border-y relative" 
        style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'var(--card)' }}
      >
        <div className="flex overflow-hidden whitespace-nowrap group">
          <motion.div
            className="flex items-center"
            animate={{ x: [0, '-33.33%'] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{ padding: '1rem 0' }}
          >
            {marqueeItems.map((cert, idx) => (
              <button
                key={`${cert.id}-${idx}`}
                onClick={() => setActiveId(cert.id)}
                className="flex items-center gap-4 px-8 transition-opacity duration-300"
                style={{ opacity: activeId === cert.id ? 1 : 0.3 }}
              >
                <span 
                  className={`w-2 h-2 rounded-full transition-colors duration-300`} 
                  style={{ background: activeId === cert.id ? 'var(--accent)' : 'var(--secondary)' }} 
                />
                <span 
                  className="text-2xl md:text-3xl font-bold tracking-tight" 
                  style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
                >
                  {cert.title}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
        
        {/* Subtle gradient masks for the edges */}
        <div className="absolute inset-y-0 left-0 w-12 md:w-32 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--card), transparent)' }} />
        <div className="absolute inset-y-0 right-0 w-12 md:w-32 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--card), transparent)' }} />
      </div>

      {/* Spotlight Content */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 mt-16 md:mt-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20"
          >
            {/* Image Side (70%) */}
            <div className="w-full lg:w-[65%] relative group">
              <div 
                className="absolute -inset-4 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(0, 113, 227, 0.08) 0%, transparent 70%)' }}
              />
              <div 
                className="rounded-2xl md:rounded-[2rem] overflow-hidden bg-white border relative z-10"
                style={{ 
                  borderColor: 'rgba(0,0,0,0.06)',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1), 0 0 20px rgba(0,0,0,0.02)'
                }}
              >
                <img
                  src={activeCert.image}
                  alt={activeCert.title}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Details Side (30%) */}
            <div className="w-full lg:w-[35%] flex flex-col justify-center pt-4 lg:pt-12">
              <span 
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4 block" 
                style={{ color: 'var(--accent)' }}
              >
                Verified • {activeCert.date}
              </span>
              
              <h3 
                className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-4"
                style={{ color: 'var(--text)', letterSpacing: '-0.03em' }}
              >
                {activeCert.title}
              </h3>
              
              <p 
                className="text-lg font-medium mb-6" 
                style={{ color: 'var(--secondary)' }}
              >
                Issued by {activeCert.issuer}
              </p>
              
              <p 
                className="text-base leading-relaxed mb-10" 
                style={{ color: 'var(--secondary)' }}
              >
                {activeCert.description}
              </p>
              
              <a
                href={activeCert.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all hover:scale-105 w-full sm:w-auto"
                style={{ background: 'var(--accent)', color: 'white', letterSpacing: '-0.01em' }}
              >
                Verify Credential ↗
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CertificationsSection;
