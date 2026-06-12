import React from 'react';

const Footer = () => (
  <footer
    className="py-10 border-t"
    style={{ borderColor: 'rgba(0,0,0,0.07)', background: 'var(--bg)' }}
  >
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm" style={{ color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Bhaumik Hinunia
          </span>
          <span style={{ color: 'rgba(0,0,0,0.15)' }}>·</span>
          <span className="text-sm" style={{ color: 'var(--secondary)' }}>
            Full Stack Developer
          </span>
        </div>

        <p className="text-xs" style={{ color: 'var(--secondary)' }}>
          © 2026 Bhaumik Hinunia. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {[
            { label: 'GitHub', href: 'https://github.com/Bhaumik1904' },
            { label: 'LinkedIn', href: 'http://linkedin.com/in/bhaumikhinunia1904' },
            { label: 'Email', href: 'mailto:bhaumikhinunia019@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium transition-colors duration-200"
              style={{ color: 'var(--secondary)' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent)'}
              onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
