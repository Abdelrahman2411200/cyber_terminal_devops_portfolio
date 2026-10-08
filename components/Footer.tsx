'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { ArrowUp, Terminal } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-[#14213D] bg-white dark:bg-black text-slate-600 dark:text-[#E5E5E5] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#FCA311]/15 border border-[#FCA311]/40 flex items-center justify-center text-[#FCA311]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-900 dark:text-[#E5E5E5]">
            © {new Date().getFullYear()} {portfolioContent.personal.name}. All rights reserved.
          </span>
        </div>

        {/* Center: Tech Note */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
          <span>Engineered with Next.js 14, TypeScript & Tailwind CSS</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E5E5E5] dark:bg-[#14213D] border border-slate-300 dark:border-[#FCA311]/30 text-slate-800 dark:text-[#E5E5E5] hover:text-[#FCA311] hover:border-[#FCA311] transition-colors"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#FCA311]" />
        </button>

      </div>
    </footer>
  );
}
