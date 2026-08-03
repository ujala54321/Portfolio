import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { CodeEditor } from './CodeEditor';
import {
  Download,
  FolderGit2,
  Mail,
  Linkedin,
  Github,
  ArrowRight,
  Building2,
  Code2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import confetti from 'canvas-confetti';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const { theme } = useTheme();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect loop
  useEffect(() => {
    const roles = PERSONAL_INFO.typingRoles;
    const targetRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === targetRole) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText(
          targetRole.substring(
            0,
            isDeleting ? currentText.length - 1 : currentText.length + 1
          )
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#38bdf8', '#818cf8'],
    });
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content (Cols 1-7) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Badge: Available for Opportunities */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold mb-6 shadow-inner backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4">
              <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>
                Hi, I'm{' '}
              </span>
              <br className="hidden sm:inline" />
              <span className="pink-purple-gradient-text drop-shadow-sm">
                {PERSONAL_INFO.name}
              </span>
            </h1>

            {/* Sub Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs sm:text-sm font-bold">
                <Building2 className="w-4 h-4 text-purple-400" />
                <span>{PERSONAL_INFO.title}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-500/10 text-pink-300 border border-pink-500/30 text-xs sm:text-sm font-bold">
                <Code2 className="w-4 h-4 text-pink-400" />
                <span>{PERSONAL_INFO.subtitle}</span>
              </span>
            </div>

            {/* Typing Role Animation */}
            <div className="h-10 sm:h-12 flex items-center mb-6">
              <span className="text-lg sm:text-2xl font-mono font-semibold text-slate-400 dark:text-slate-400 light:text-slate-600 mr-2">
                &gt;
              </span>
              <span className="text-lg sm:text-2xl font-mono font-bold text-sky-400 dark:text-sky-400 light:text-purple-700">
                {currentText}
              </span>
              <span className="w-2 h-6 sm:h-7 bg-purple-500 inline-block ml-1 animate-pulse" />
            </div>

            {/* Resume Summary */}
            <p
              className={`text-base sm:text-lg leading-relaxed mb-8 max-w-2xl ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
              }`}
            >
              I am a passionate <strong className="text-purple-400">Software Engineer</strong> specializing in{' '}
              <strong className="text-pink-400">ASP.NET Core (.NET 8/.NET 6)</strong>, C#, Angular, Entity Framework Core, SQL Server, and REST APIs.
              <br /><br />
              I enjoy designing scalable applications, writing clean code, solving real-world business problems, and continuously learning new technologies. I strongly believe that discipline, continuous learning, and healthy habits contribute directly to becoming a better engineer.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              {/* Resume Button */}
              <button
                onClick={() => {
                  triggerConfetti();
                  onOpenResumeModal();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 shadow-xl shadow-purple-500/25 border border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              {/* View Projects */}
              <a
                href="#projects"
                className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 border ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-700/80 text-white hover:bg-slate-800'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-purple-400" />
                <span>View Projects</span>
              </a>

              {/* Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-bold text-slate-300 hover:text-white transition-colors group"
              >
                <span>Contact Me</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/60 w-full">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Connect:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-all duration-200"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-all duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-200 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-all duration-200"
                  aria-label="Email Ujala Maurya"
                >
                  <Mail className="w-4 h-4 text-pink-400" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Floating 3D Code Editor (Cols 8-12) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="animate-float">
              <CodeEditor />
            </div>

            {/* Quick Stats Badges Floating around */}
            <div className="absolute -bottom-6 -left-6 hidden sm:flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">ASP.NET Core & .NET 8</p>
                <p className="text-[10px] text-slate-400">Clean Architecture & EF Core</p>
              </div>
            </div>

            <div className="absolute -top-6 -right-4 hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">Zebra TechnoSys Developer</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
