import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import WorkspaceSection from './components/WorkspaceSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import NoiseOverlay from './components/NoiseOverlay';

function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    if (!splashDone) return;

    // Skip Lenis on mobile/touch devices — native scroll is much faster
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window);
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [splashDone]);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Splash screen — AnimatePresence handles the exit animation */}
      <AnimatePresence>
        {!splashDone && (
          <SplashScreen onDone={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      <NoiseOverlay />
      <Navbar />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <WorkspaceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
