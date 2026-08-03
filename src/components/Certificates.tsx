import React, { useState } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Certificate } from '../types';
import { CertificateModal } from './CertificateModal';
import { Award, ShieldCheck, Sparkles, ExternalLink, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Certificates: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5" />
            <span>Certificates & Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Recognized <span className="pink-purple-gradient-text">Excellence & Credentials</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Microsoft Learn certifications, micro1 AI interview evaluation, academic honors, and competitive achievements.
          </p>
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => setSelectedCert(cert)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer group hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                theme === 'dark'
                  ? 'bg-slate-900/80 border-slate-800 hover:border-purple-500/50 shadow-purple-950/20'
                  : 'bg-white border-slate-200 hover:border-purple-300 shadow-lg'
              }`}
            >
              <div>
                {/* Image / Icon Header */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-5 border border-slate-800 bg-slate-950">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-extrabold bg-purple-950/90 text-purple-200 border border-purple-500/40 backdrop-blur-md">
                    {cert.category}
                  </div>

                  <div className="absolute bottom-3 right-3 p-2 rounded-full bg-purple-600 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Title & Issuer */}
                <h3 className="text-base font-extrabold text-white dark:text-white light:text-slate-900 mb-1 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-bold text-purple-400 mb-3 flex items-center gap-1">
                  <span>{cert.issuer}</span>
                  <span>•</span>
                  <span className="text-slate-400">{cert.date}</span>
                </p>

                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> View Credential
                </span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
    </section>
  );
};
