import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ y: -100 }}
      animate={{ y: scrolled ? 0 : -100 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-12 mt-4 pointer-events-auto">
        <nav
          className="flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.85)' : 'rgba(245,245,247,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0,0,0,0.06)',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.07)' : 'none',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-bold text-base tracking-tight transition-opacity hover:opacity-70"
            style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}
          >
            Bhaumik<span style={{ color: 'var(--accent)' }}>.</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.href.startsWith('#') ? (
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-black/5"
                    style={{ color: 'var(--secondary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
                  >
                    {item.label}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 hover:bg-black/5 block"
                    style={{ color: 'var(--secondary)' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text)'}
                    onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-apple text-sm"
            >
              Let's talk
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-black/5 transition-colors"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-2 rounded-2xl overflow-hidden apple-card"
            >
              <ul className="py-2">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.href.startsWith('#') ? (
                      <button
                        onClick={() => scrollTo(item.href)}
                        className="w-full text-left px-6 py-3 text-sm font-medium hover:bg-black/5 transition-colors"
                        style={{ color: 'var(--text)' }}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full text-left px-6 py-3 text-sm font-medium hover:bg-black/5 transition-colors block"
                        style={{ color: 'var(--text)' }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
                <li className="px-6 py-3">
                  <button
                    onClick={() => scrollTo('#contact')}
                    className="btn-apple w-full justify-center"
                  >
                    Let's talk
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
