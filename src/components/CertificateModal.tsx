import React, { useState } from 'react';
import { Certificate } from '../types';
import { X, Award, ZoomIn, ZoomOut, CheckCircle2, Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  if (!certificate) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-xl bg-slate-950/85">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 bg-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Verified Credential
                </span>
                <h3 className="text-xl font-extrabold text-white">{certificate.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Certificate Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Interactive Image Box with Zoom */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 group">
              <div className="overflow-hidden flex items-center justify-center min-h-[260px] max-h-[400px]">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className={`w-full h-auto object-cover transition-transform duration-500 ${
                    zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                  }`}
                  onClick={() => setZoomed(!zoomed)}
                />
              </div>

              {/* Zoom Control Overlay */}
              <button
                onClick={() => setZoomed(!zoomed)}
                className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white border border-slate-700 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md hover:bg-slate-800 transition-colors"
              >
                {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
                <span>{zoomed ? 'Reset Zoom' : 'Click to Zoom'}</span>
              </button>
            </div>

            {/* Issuer & Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Issuing Entity</p>
                <p className="text-xs font-bold text-purple-300 mt-0.5">{certificate.issuer}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Issued Date</p>
                <p className="text-xs font-bold text-slate-200 mt-0.5">{certificate.date}</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                <p className="text-[10px] text-slate-500 uppercase font-semibold">Credential Status</p>
                <p className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Valid
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Description & Relevance
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {certificate.description}
              </p>
            </div>

            {/* Skills Learned */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Validated Competencies:</h4>
              <div className="flex flex-wrap gap-2">
                {certificate.skillsLearned.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-950/60 border border-purple-800/40 text-purple-300"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs font-mono text-slate-500">
              ID: {certificate.credentialId || 'VERIFIED-UM-2024'}
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
