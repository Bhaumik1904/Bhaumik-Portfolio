import React from 'react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2024',
    title: 'Started Computer Science',
    description: 'Began my B.Tech in Computer Science Engineering at SRM AP University. Developed a strong foundation in programming, algorithms, data structures, and problem-solving while exploring the world of software development.',
    icon: '🎓',
    color: '#0071E3',
  },
  {
    year: '2024',
    title: 'Built My First Web Applications',
    description: 'Started creating web applications using modern technologies like JavaScript, React, and Node.js. Discovered a passion for building products that combine functionality with great user experience.',
    icon: '💻',
    color: '#30D158',
  },
  {
    year: '2025',
    title: 'Explored AI & Machine Learning',
    description: 'Dived into machine learning, computer vision, and neural networks. Built AI-powered projects including a breast cancer detection model, gaining hands-on experience with TensorFlow and deep learning concepts.',
    icon: '🤖',
    color: '#BF5AF2',
  },
  {
    year: '2025',
    title: 'Focused on Full-Stack Development',
    description: 'Expanded my skills into full-stack development, working with APIs, databases, authentication systems, and deployment workflows. Learned how to build scalable and production-ready applications.',
    icon: '🚀',
    color: '#FF9F0A',
  },
  {
    year: '2026',
    title: 'Building Products & Seeking Opportunities',
    description: 'Currently focused on creating impactful web applications, AI-powered tools, and interactive digital experiences while preparing for internships and continuously improving my engineering skills.',
    icon: '✦',
    color: '#0071E3',
  },
];

const AboutSection = () => (
  <section
    id="about"
    className="py-10 md:py-14"
    style={{ background: 'var(--bg)' }}
  >
    <div className="section-container">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">

        {/* Left: heading + bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label mb-4">About</p>
          <h2
            className="font-black tracking-tight leading-none mb-8"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.5rem)', letterSpacing: '-0.04em', color: 'var(--text)' }}
          >
            Curious by nature.<br />
            <span style={{ color: 'var(--accent)' }}>Builder</span> by choice.
          </h2>

          <div className="space-y-5">
            <p className="text-base leading-relaxed" style={{ color: 'var(--secondary)' }}>
              I'm Bhaumik — a CSE student who genuinely loves what he builds. I'm drawn to the intersection of elegant design and powerful technology, where software becomes something people actually enjoy using.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--secondary)' }}>
              My approach: understand the problem deeply, design with intention, and ship code that lasts. I care as much about the user experience as I do about the technical architecture.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--secondary)' }}>
              When I'm not coding, I'm reading about AI research, exploring new frameworks, or figuring out why my coffee tastes different every morning.
            </p>
          </div>

          {/* Quick facts */}
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { label: 'Location', value: 'India 🇮🇳' },
              { label: 'Focus', value: 'Full Stack + AI' },
              { label: 'Status', value: 'Open to work ✓' },
              { label: 'Education', value: 'B.Tech CSE' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="p-4 rounded-2xl"
                style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
              >
                <p className="text-xs font-medium mb-1" style={{ color: 'var(--secondary)' }}>{label}</p>
                <p className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: timeline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-px transition-colors"
              style={{ background: 'linear-gradient(to bottom, transparent, var(--border) 20%, var(--border) 80%, transparent)' }}
            />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-6 relative"
                >
                  {/* Circle on timeline */}
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-base flex-shrink-0 relative z-10"
                    style={{
                      background: `${item.color}12`,
                      border: `1.5px solid ${item.color}30`,
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="pb-2">
                    <span
                      className="text-xs font-semibold font-mono mb-1 block"
                      style={{ color: item.color }}
                    >
                      {item.year}
                    </span>
                    <h3
                      className="font-bold text-base mb-2"
                      style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--secondary)' }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AboutSection;
