import React from 'react';
import { motion } from 'motion/react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712] text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 flex items-center justify-center font-extrabold text-2xl shadow-2xl shadow-purple-500/40 border border-white/20 mb-6"
      >
        UM
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-xl font-extrabold tracking-tight">Ujala Maurya</h1>
        <p className="text-xs font-mono text-purple-400 mt-1 uppercase tracking-widest">
          Software Engineer & .NET Full Stack Developer
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-slate-900 rounded-full mt-8 overflow-hidden border border-slate-800">
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="w-full h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"
        />
      </div>
    </div>
  );
};
