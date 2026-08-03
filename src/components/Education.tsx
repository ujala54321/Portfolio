import React from 'react';
import { EDUCATION_ITEMS } from '../data/portfolioData';
import { GraduationCap, Calendar, Award, CheckCircle2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Education: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="education" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Education & <span className="pink-purple-gradient-text">Academic Qualifications</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Strong foundation in Computer Applications, Software Engineering, and Mathematical Problem Solving.
          </p>
        </div>

        {/* Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EDUCATION_ITEMS.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-3xl border transition-all duration-300 hover:shadow-2xl flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-purple-950/20'
                  : 'bg-white border-slate-200 hover:border-purple-300 shadow-xl'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-xl bg-purple-950/60 border border-purple-800/40 text-purple-300 font-mono text-xs font-bold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {edu.period}
                  </span>
                </div>

                {/* Degree & Institution */}
                <h3 className="text-xl font-extrabold text-white dark:text-white light:text-slate-900 mb-1">
                  {edu.degree}
                </h3>
                <p className="text-xs font-bold text-purple-400 mb-2">{edu.fieldOfStudy}</p>
                
                {edu.grade && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 mb-4">
                    {edu.grade}
                  </span>
                )}
              </div>

              {/* Highlights List */}
              <div className="pt-6 border-t border-slate-800/80 space-y-2.5 mt-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Key Academic Achievements:
                </p>
                {edu.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
