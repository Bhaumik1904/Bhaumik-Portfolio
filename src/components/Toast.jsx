import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="#30D158" strokeWidth="1.2" />
      <path d="M5 8l2.2 2.2L11 5.5" stroke="#30D158" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="#0071E3" strokeWidth="1.2" />
      <path d="M8 7v4M8 5.5v.5" stroke="#0071E3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7.5" stroke="#FF453A" strokeWidth="1.2" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#FF453A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const ACCENT = { success: '#30D158', info: '#0071E3', error: '#FF453A' };

let idCounter = 0;

const Toast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      const { type, message } = e.detail;
      const id = ++idCounter;
      setToasts(prev => [...prev.slice(-3), { id, type, message }]); // max 4 visible
      setTimeout(() => removeToast(id), 3500);
    };

    window.addEventListener('portfolio-toast', handler);
    return () => window.removeEventListener('portfolio-toast', handler);
  }, [removeToast]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99997] flex flex-col items-center gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium select-none cursor-default"
            style={{
              background: 'rgba(255,255,255,0.97)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${ACCENT[t.type]}30`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px ${ACCENT[t.type]}18`,
              color: 'var(--text)',
              minWidth: '200px',
              maxWidth: '340px',
            }}
            onClick={() => removeToast(t.id)}
          >
            {ICONS[t.type]}
            <span className="flex-1">{t.message}</span>
            <span className="text-xs opacity-30 ml-2">✕</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Toast;
