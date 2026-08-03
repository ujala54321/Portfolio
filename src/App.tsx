import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ParticlesBackground } from './components/ParticlesBackground';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Gallery } from './components/Gallery';
import { BeyondCoding } from './components/BeyondCoding';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen text-slate-100 overflow-x-hidden selection:bg-purple-500 selection:text-white">
        {/* Interactive Cyberpunk Particles & Grid */}
        <ParticlesBackground />

        {/* Header Navigation Bar */}
        <Navbar onOpenResumeModal={() => setResumeModalOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero onOpenResumeModal={() => setResumeModalOpen(true)} />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Certificates />
          <Gallery />
          <BeyondCoding />
          <Education />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Resume View & Download Modal */}
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      </div>
    </ThemeProvider>
  );
}
