'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { ArrowUp, Terminal, Heart } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#05080E] text-slate-600 dark:text-slate-400 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-900 dark:text-slate-200">
            © {new Date().getFullYear()} {portfolioContent.personal.name}. All rights reserved.
          </span>
        </div>

        {/* Center: Tech Note */}
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
          <span>Engineered with Next.js 14, TypeScript & Tailwind CSS</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0D1527] border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-400 transition-colors shadow-sm"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
        </button>

      </div>
    </footer>
  );
}
