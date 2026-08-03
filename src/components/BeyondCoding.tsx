import React from 'react';
import { BEYOND_CODING } from '../data/portfolioData';
import { Crown, Activity, HeartPulse, Sparkles, BookOpen, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const BeyondCoding: React.FC = () => {
  const { theme } = useTheme();

  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-6 h-6 text-amber-400" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-400" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-400" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-sky-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="beyond-coding" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Holistic Lifestyle & Mindset</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Beyond <span className="pink-purple-gradient-text">Coding</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            How chess strategy, physical health, active sports, and continuous self-improvement sharpen engineering discipline.
          </p>
        </div>

        {/* Beyond Coding Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BEYOND_CODING.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-purple-950/20'
                  : 'bg-white border-slate-200 hover:border-purple-300 shadow-xl'
              }`}
            >
              {/* Subtle Ambient Card Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-50 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Header Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-inner">
                    {getItemIcon(item.icon)}
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-950/80 text-purple-200 border border-purple-500/30">
                    {item.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-extrabold text-white dark:text-white light:text-slate-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 light:text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Takeaways Bullets */}
              <div className="relative z-10 pt-4 border-t border-slate-800/80 space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Engineering Benefits:
                </p>
                {item.keyTakeaways.map((takeaway, tIdx) => (
                  <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{takeaway}</span>
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
