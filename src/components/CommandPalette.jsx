import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  {
    group: 'Navigate',
    items: [
      { id: 'work',    icon: '💼', label: 'View Projects',   action: () => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'about',   icon: '👤', label: 'About Me',        action: () => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'certs',   icon: '🏅', label: 'Certifications',  action: () => document.querySelector('#certifications')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'contact', icon: '✉️', label: 'Contact',         action: () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'top',     icon: '⬆️', label: 'Back to Top',     action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    ],
  },
  {
    group: 'Links',
    items: [
      { id: 'github',   icon: '🐙', label: 'Open GitHub',      action: () => window.open('https://github.com/Bhaumik1904', '_blank') },
      { id: 'linkedin', icon: '💼', label: 'Open LinkedIn',     action: () => window.open('http://linkedin.com/in/bhaumikhinunia1904', '_blank') },
      { id: 'resume',   icon: '📄', label: 'Download Resume',   action: () => window.open('/resume.pdf', '_blank') },
    ],
  },
  {
    group: 'Quick Actions',
    items: [
      { id: 'email', icon: '📧', label: 'Copy Email Address', action: 'copy-email' },
    ],
  },
];

// Flat list for keyboard nav
const ALL_ITEMS = COMMANDS.flatMap(g => g.items);

const CommandItem = ({ item, isActive, onHover, onSelect, justCopied }) => (
  <button
    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-all rounded-xl mx-1"
    style={{
      width: 'calc(100% - 8px)',
      background: isActive ? 'rgba(0,113,227,0.08)' : 'transparent',
      color: isActive ? 'var(--accent)' : 'var(--text)',
    }}
    onMouseEnter={onHover}
    onClick={onSelect}
  >
    <span className="text-base w-6 text-center flex-shrink-0 leading-none">{item.icon}</span>
    <span className="font-medium flex-1">{item.id === 'email' && justCopied ? '✓ Copied to clipboard!' : item.label}</span>
    {isActive && (
      <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono opacity-40" style={{ background: 'var(--border)' }}>
        ↵
      </kbd>
    )}
  </button>
);

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [justCopied, setJustCopied] = useState(false);
  const inputRef = useRef(null);

  const filtered = query.trim()
    ? ALL_ITEMS.filter(i => i.label.toLowerCase().includes(query.toLowerCase()))
    : null;

  const displayItems = filtered ?? ALL_ITEMS;

  const runAction = useCallback((item) => {
    if (item.action === 'copy-email') {
      navigator.clipboard.writeText('bhaumikhinunia019@gmail.com');
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 2000);
      return; // stay open so user can see feedback
    }
    item.action?.();
    setOpen(false);
  }, []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(o => !o);
        setQuery('');
        setSelectedIdx(0);
        setJustCopied(false);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Focus input when opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 40);
  }, [open]);

  // Keyboard nav inside palette
  const onInputKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, displayItems.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter')     { e.preventDefault(); if (displayItems[selectedIdx]) runAction(displayItems[selectedIdx]); }
  };

  const isMac = typeof navigator !== 'undefined' && /Mac/i.test(navigator.platform);
  const shortcut = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <>
      {/* Floating hint pill — bottom right, fades in after 3s */}
      <motion.button
        onClick={() => { setOpen(true); setQuery(''); setSelectedIdx(0); }}
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0,0,0,0.08)',
          color: 'var(--secondary)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 0.5 }}
      >
        <span style={{ color: 'var(--accent)' }}>⌘</span>
        <kbd className="font-mono text-[11px]">{shortcut}</kbd>
        <span>Command</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="cp-backdrop"
              className="fixed inset-0 z-[9998]"
              style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(6px)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />

            {/* Palette panel */}
            <motion.div
              key="cp-panel"
              className="fixed top-[18vh] left-1/2 z-[9999] w-full max-w-lg px-4"
              style={{ x: '-50%' }}
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.98)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.5)',
                }}
              >
                {/* Search bar */}
                <div
                  className="flex items-center gap-3 px-5 py-4"
                  style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: 'var(--secondary)', flexShrink: 0 }}>
                    <path d="M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10ZM14 14l-2.9-2.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
                    onKeyDown={onInputKeyDown}
                    placeholder="Search commands..."
                    className="flex-1 bg-transparent outline-none text-base"
                    style={{ color: 'var(--text)', fontFamily: 'inherit' }}
                  />
                  <kbd
                    className="text-[11px] px-2 py-1 rounded-lg font-mono"
                    style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--secondary)' }}
                  >
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div className="overflow-y-auto max-h-[52vh] py-2">
                  {filtered ? (
                    filtered.length === 0 ? (
                      <p className="text-center py-10 text-sm" style={{ color: 'var(--secondary)' }}>
                        No results for "<span style={{ color: 'var(--text)' }}>{query}</span>"
                      </p>
                    ) : (
                      filtered.map((item, i) => (
                        <CommandItem
                          key={item.id} item={item}
                          isActive={i === selectedIdx}
                          onHover={() => setSelectedIdx(i)}
                          onSelect={() => runAction(item)}
                          justCopied={justCopied}
                        />
                      ))
                    )
                  ) : (
                    COMMANDS.map(group => (
                      <div key={group.group} className="mb-1">
                        <p
                          className="px-5 pt-3 pb-1 text-[10px] font-bold uppercase tracking-[0.15em]"
                          style={{ color: 'var(--secondary)' }}
                        >
                          {group.group}
                        </p>
                        {group.items.map(item => {
                          const globalIdx = ALL_ITEMS.indexOf(item);
                          return (
                            <CommandItem
                              key={item.id} item={item}
                              isActive={globalIdx === selectedIdx}
                              onHover={() => setSelectedIdx(globalIdx)}
                              onSelect={() => runAction(item)}
                              justCopied={justCopied}
                            />
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div
                  className="px-5 py-2.5 flex items-center gap-4 text-[11px]"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.06)', color: 'var(--secondary)' }}
                >
                  <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                  <span><kbd className="font-mono">↵</kbd> select</span>
                  <span><kbd className="font-mono">ESC</kbd> close</span>
                  <span className="ml-auto opacity-50">Bhaumik Hinunia</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
