import React from 'react';
import { WORK_EXPERIENCES } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Building2, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Experience: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career & Work Experience</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Professional <span className="pink-purple-gradient-text">Engineering Journey</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Delivering impact through full-stack .NET engineering, scalable web platforms, and continuous technical growth.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 -translate-x-1/2 hidden sm:block opacity-60" />

          {WORK_EXPERIENCES.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mb-12"
            >
              {/* Timeline Center Badge */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 border-4 border-slate-950 items-center justify-center text-white shadow-lg shadow-purple-500/40 z-10">
                <Building2 className="w-4 h-4" />
              </div>

              {/* Experience Card */}
              <div
                className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl ${
                  theme === 'dark'
                    ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-purple-950/20'
                    : 'bg-white border-slate-200 hover:border-purple-300 shadow-xl'
                }`}
              >
                {/* Role Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900">
                      {exp.role}
                    </h3>
                    <p className="text-base font-bold text-purple-400 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4" />
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-950/40 border border-purple-800/40 text-purple-300 text-xs font-bold font-mono">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 mb-6 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Highlights Bullet List */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Key Impact & Deliverables:
                  </h4>
                  {exp.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-700 leading-relaxed">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
