import React, { useState } from 'react';
import { GALLERY_PHOTOS } from '../data/portfolioData';
import { Camera, ZoomIn, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const Gallery: React.FC = () => {
  const { theme } = useTheme();
  const photos = GALLERY_PHOTOS;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Office', 'Campus', 'Corporate'];

  const filteredPhotos =
    activeCategory === 'All'
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  const activePhoto =
    selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const handleNext = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            <span>Personal Gallery & Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Life at <span className="pink-purple-gradient-text">Work & Campus</span>
          </h2>
          <p
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Moments from software engineering at Gyansify & Upgrate Infotech, university campus life, and professional milestones.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : theme === 'dark'
                  ? 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => {
            const originalIndex = photos.findIndex((p) => p.id === photo.id);
            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelectedPhotoIndex(originalIndex)}
                className="relative rounded-3xl overflow-hidden group border border-slate-800/80 bg-slate-950 shadow-xl cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden bg-slate-900 flex items-center justify-center">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Glassmorphism Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity pointer-events-none" />

                  {/* Top Category Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-extrabold bg-purple-950/80 text-purple-200 border border-purple-500/30 backdrop-blur-md">
                    {photo.category}
                  </span>

                  {/* Zoom Indicator Icon */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-slate-900/80 text-white border border-slate-700/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  {/* Bottom Captions */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-base font-extrabold line-clamp-1">{photo.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">{photo.description}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-purple-400 font-mono mt-2">
                      <MapPin className="w-3 h-3" /> {photo.date}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-2xl bg-slate-950/90">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-colors border border-slate-700 focus:outline-none cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Main Image View */}
              <div className="relative bg-slate-950 max-h-[70vh] flex items-center justify-center overflow-hidden">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[70vh] w-auto object-contain"
                />

                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors border border-slate-700 cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Caption */}
              <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">{activePhoto.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{activePhoto.description}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-purple-400 font-mono mt-1">
                    <MapPin className="w-3 h-3" /> {activePhoto.date}
                  </span>
                </div>
                <span className="text-xs font-mono text-purple-400 px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/40">
                  {selectedPhotoIndex + 1} / {photos.length}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
