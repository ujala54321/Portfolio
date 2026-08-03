import React from 'react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import {
  Code2,
  Server,
  Database,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Award,
  Terminal,
} from 'lucide-react';

export const About: React.FC = () => {
  const { theme } = useTheme();

  const corePillars = [
    {
      icon: <Server className="w-5 h-5 text-purple-400" />,
      title: 'ASP.NET Core & .NET 8',
      desc: 'Architecting robust RESTful Web APIs, C# 12 object-oriented design, Dependency Injection, and Entity Framework Core.',
    },
    {
      icon: <Code2 className="w-5 h-5 text-pink-400" />,
      title: 'Angular & Modern Frontend',
      desc: 'Building responsive user interfaces with Angular, TypeScript, Reactive Forms, and Tailwind/Bootstrap CSS.',
    },
    {
      icon: <Database className="w-5 h-5 text-sky-400" />,
      title: 'SQL Server & Database Design',
      desc: 'Designing relational database schemas, stored procedures, indexing, and LINQ query optimization.',
    },
    {
      icon: <GraduationCap className="w-5 h-5 text-emerald-400" />,
      title: 'MCA Graduate & Academic Excellence',
      desc: 'Postgraduate in Computer Applications with a strong foundation in Data Structures, Algorithms, and System Design.',
    },
  ];

  const quickStats = [
    { label: 'Primary Stack', value: 'ASP.NET Core & C#' },
    { label: 'Role', value: 'Software Engineer' },
    { label: 'Current Org', value: 'Zebra TechnoSys' },
    { label: 'Location', value: 'Bengaluru, India' },
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Passionate Software Engineer &{' '}
            <span className="pink-purple-gradient-text"> Full Stack .NET Developer</span>
          </h2>
          <p
            className={`text-base sm:text-lg leading-relaxed ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Engineering clean, scalable backend systems and intuitive frontend experiences for modern businesses.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Visual Card / Highlight Box */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div
              className={`p-8 rounded-3xl relative overflow-hidden border ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800/80 shadow-2xl'
                  : 'bg-white border-slate-200 shadow-xl'
              }`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-purple-500/30">
                  UM
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ujala Maurya</h3>
                  <p className="text-xs font-semibold text-purple-400">
                    Software Engineer @ Zebra TechnoSys
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-slate-300 dark:text-slate-300 light:text-slate-600">
                <p>
                  I am a <strong className="text-white dark:text-white light:text-slate-900 font-bold">Software Engineer</strong> and <strong className="text-white dark:text-white light:text-slate-900 font-bold">MCA Graduate</strong> currently crafting enterprise applications at Zebra TechnoSys in Bengaluru, India.
                </p>
                <p>
                  My core technical expertise revolves around <strong className="text-purple-400">C#</strong>, <strong className="text-pink-400">ASP.NET Core (.NET 8)</strong>, <strong className="text-sky-400">Angular</strong>, <strong className="text-emerald-400">Entity Framework Core</strong>, <strong className="text-amber-400">SQL Server</strong>, and <strong className="text-indigo-400">REST APIs</strong>.
                </p>
                <p>
                  I love building scalable web applications structured around Clean Architecture, Repository Pattern, and intuitive user experiences. Beyond writing code, I am deeply committed to physical fitness, playing chess, continuous learning, and maintaining a healthy work-life balance.
                </p>
              </div>

              {/* Quick Details Badges */}
              <div className="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-800/80">
                {quickStats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="text-xs font-bold text-slate-200 mt-0.5">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Core Pillars Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {corePillars.map((pillar, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  theme === 'dark'
                    ? 'bg-slate-900/60 border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900'
                    : 'bg-white border-slate-200 hover:border-purple-300 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/80 flex items-center justify-center mb-4 border border-slate-700/80">
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold mb-2">{pillar.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}

            {/* Bottom Highlight Banner */}
            <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/30 to-indigo-900/40 border border-purple-500/30 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Engineering Philosophy</h5>
                <p className="text-xs text-slate-300 mt-1">
                  "Clean code, scalable architecture, and disciplined daily learning create software that lasts."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
