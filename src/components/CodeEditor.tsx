import React, { useState, useEffect } from 'react';
import { CODE_SNIPPETS } from '../data/portfolioData';
import { ChevronLeft, ChevronRight, Copy, Check, Terminal, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export const CodeEditor: React.FC = () => {
  const [activeSnippetIndex, setActiveSnippetIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const currentSnippet = CODE_SNIPPETS[activeSnippetIndex];

  const handleNext = () => {
    setActiveSnippetIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
  };

  const handlePrev = () => {
    setActiveSnippetIndex((prev) => (prev - 1 + CODE_SNIPPETS.length) % CODE_SNIPPETS.length);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighter for C# / TS
  const highlightCode = (code: string) => {
    return code.split('\n').map((line, idx) => {
      // Basic C# syntax coloring
      const formattedLine = line
        .replace(/\b(public|private|protected|class|namespace|using|async|await|return|new|var|string|int|task|override|get|set|readonly|void|virtual|static)\b/g, '<span class="text-purple-400 font-semibold">$1</span>')
        .replace(/\b(Task|ActionResult|ControllerBase|IEnumerable|IBookRepository|ApplicationDbContext|BooksController|BookDto|OrderRequestDto|FinanceService|Transaction)\b/g, '<span class="text-cyan-300 font-semibold">$1</span>')
        .replace(/("[^"]*")/g, '<span class="text-emerald-300">$1</span>')
        .replace(/(\/\/.+$)/g, '<span class="text-slate-500 italic">$1</span>')
        .replace(/(\[.*?\])/g, '<span class="text-amber-300">$1</span>');

      return (
        <div key={idx} className="table-row">
          <span className="table-cell select-none text-right pr-4 text-slate-600 text-xs font-mono">
            {idx + 1}
          </span>
          <span
            className="table-cell font-mono text-xs sm:text-sm text-slate-200 whitespace-pre"
            dangerouslySetInnerHTML={{ __html: formattedLine }}
          />
        </div>
      );
    });
  };

  return (
    <div className="relative group">
      {/* Decorative Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

      {/* Main VS Code Window */}
      <div
        className={`relative rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-slate-950/90 border-slate-800/90 shadow-purple-950/40'
            : 'bg-slate-900 border-slate-700 shadow-xl'
        }`}
      >
        {/* Editor Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 mr-3">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors" />
            </div>

            {/* Filename & Tabs */}
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800/80">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-mono font-semibold text-slate-200">
                {currentSnippet.filename}
              </span>
            </div>
          </div>

          {/* Right Snippet Badges & Navigation */}
          <div className="flex items-center gap-2">
            {/* Floating Badges */}
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/10 text-purple-300 border border-purple-500/30">
              <Sparkles className="w-3 h-3 text-purple-400" />
              {currentSnippet.badge}
            </span>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="p-1.5 text-slate-400 hover:text-white rounded-md bg-slate-800/60 hover:bg-slate-800 transition-colors focus:outline-none"
              title="Copy snippet code"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Arrow Snippet Switchers */}
            <div className="flex items-center gap-1 bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={handlePrev}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
                title="Previous snippet"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-slate-400 font-mono px-1">
                {activeSnippetIndex + 1}/{CODE_SNIPPETS.length}
              </span>
              <button
                onClick={handleNext}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700 transition-colors"
                title="Next snippet"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Snippet Description Bar */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span className="truncate pr-2">{currentSnippet.description}</span>
          <span className="flex items-center gap-1 text-emerald-400 font-mono font-semibold shrink-0">
            <Play className="w-3 h-3 fill-emerald-400" /> Compiled & Verified
          </span>
        </div>

        {/* Code Viewport with Line Numbers */}
        <div className="p-4 overflow-x-auto max-h-[380px] min-h-[320px] bg-slate-950 font-mono text-xs leading-relaxed">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSnippet.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="table w-full"
            >
              {highlightCode(currentSnippet.code)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Editor Footer Status Bar */}
        <div className="flex items-center justify-between px-4 py-1.5 bg-purple-950/40 border-t border-purple-900/30 text-[10px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-purple-300 font-bold">C# 12 / .NET 8.0</span>
            <span>UTF-8</span>
            <span>Spaces: 4</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Ujala Maurya Architecture</span>
          </div>
        </div>
      </div>
    </div>
  );
};
