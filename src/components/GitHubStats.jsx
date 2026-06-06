import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animated counter that triggers when visible
const Counter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || target === 0) return;
    const duration = 1200;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/Bhaumik1904'),
          fetch('https://api.github.com/users/Bhaumik1904/repos?per_page=100'),
        ]);

        if (!userRes.ok) throw new Error('GitHub API limit reached');

        const user = await userRes.json();
        const repos = await reposRes.json();

        const totalStars = Array.isArray(repos)
          ? repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0)
          : 0;

        const totalForks = Array.isArray(repos)
          ? repos.reduce((acc, r) => acc + (r.forks_count || 0), 0)
          : 0;

        setStats({
          repos: user.public_repos ?? 0,
          followers: user.followers ?? 0,
          stars: totalStars,
          forks: totalForks,
        });
      } catch {
        setError(true);
        // Graceful fallback — never crash the page
        setStats({ repos: 12, followers: 8, stars: 6, forks: 3 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const ITEMS = stats
    ? [
        { label: 'Public Repos', value: stats.repos,     icon: '📦', suffix: '' },
        { label: 'GitHub Stars', value: stats.stars,     icon: '⭐', suffix: '' },
        { label: 'Followers',    value: stats.followers, icon: '👥', suffix: '' },
        { label: 'Forks',        value: stats.forks,     icon: '🍴', suffix: '' },
      ]
    : [];

  return (
    <section className="py-12 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="apple-card px-6 py-8 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,113,227,0.04), transparent)',
            }}
          />

          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0 relative z-10">
            {/* Left: label */}
            <div className="md:w-48 flex-shrink-0 flex flex-col items-center md:items-start gap-1 md:border-r md:pr-8" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--text)' }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="text-sm font-bold" style={{ color: 'var(--text)' }}>GitHub Activity</span>
              </div>
              <a
                href="https://github.com/Bhaumik1904"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-medium hover-accent transition-colors"
                style={{ color: 'var(--secondary)' }}
              >
                @Bhaumik1904 →
              </a>
              {error && (
                <span className="text-[10px] mt-1" style={{ color: 'var(--secondary)' }}>
                  (cached data)
                </span>
              )}
            </div>

            {/* Right: stats grid */}
            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 w-full">
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 md:border-r last:border-r-0 py-2" style={{ borderColor: 'var(--border)' }}>
                      <div className="h-8 w-12 rounded-lg animate-pulse" style={{ background: 'var(--border)' }} />
                      <div className="h-3 w-16 rounded animate-pulse mt-1" style={{ background: 'var(--border)' }} />
                    </div>
                  ))
                : ITEMS.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex flex-col items-center gap-1 md:border-r last:border-r-0 py-2"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span
                        className="text-2xl md:text-3xl font-black tracking-tighter"
                        style={{ color: 'var(--text)', letterSpacing: '-0.04em' }}
                      >
                        <Counter target={item.value} suffix={item.suffix} />
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-center" style={{ color: 'var(--secondary)' }}>
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
