import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, CheckCircle2, Layers, Sparkles, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-slate-950/80">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-6 bg-slate-950 border-b border-slate-800">
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                {project.subtitle}
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{project.title}</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Banner Image */}
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-bold bg-purple-950/90 text-purple-200 border border-purple-500/30 backdrop-blur-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-sm font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> Executive Overview
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Core Capabilities & Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Details */}
            {project.architecture && (
              <div>
                <h4 className="text-sm font-bold uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-sky-400" /> Architecture & Data Flow
                </h4>
                <div className="space-y-2">
                  {project.architecture.map((arch, aIdx) => (
                    <div
                      key={aIdx}
                      className="p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-xs text-slate-300 font-mono"
                    >
                      💡 {arch}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveDemoUrl && (
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/25 flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 flex items-center gap-2 border border-slate-700"
                >
                  <Github className="w-4 h-4" /> GitHub Repository
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white"
            >
              Close Window
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
