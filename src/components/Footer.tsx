import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Github, Linkedin, Mail, Heart, ArrowUp, Code2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`relative z-10 border-t transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-slate-950 border-slate-900 text-slate-400'
          : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center font-bold text-white shadow-md">
              UM
            </div>
            <div>
              <p className="text-base font-extrabold text-white dark:text-white light:text-slate-900">
                Ujala Maurya
              </p>
              <p className="text-xs text-purple-400 font-semibold">
                Software Engineer • Bengaluru, India
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a>
            <a href="#skills" className="hover:text-purple-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#certificates" className="hover:text-purple-400 transition-colors">Certificates</a>
            <a href="#gallery" className="hover:text-purple-400 transition-colors">Gallery</a>
            <a href="#beyond-coding" className="hover:text-purple-400 transition-colors">Beyond Coding</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-sky-400" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-pink-400" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-500 transition-colors ml-2 shadow-md cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by{' '}
            <strong className="text-slate-300 font-bold">Ujala Maurya</strong>
          </p>
          <p>© {new Date().getFullYear()} Ujala Maurya. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
