'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { ArrowUp, Terminal } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-[#B8B08D]/20 bg-white dark:bg-[#17202B] text-slate-600 dark:text-[#B8B08D] text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#F29559]/15 border border-[#F29559]/30 flex items-center justify-center text-[#F29559]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="text-slate-900 dark:text-[#F6F4EE]">
            © {new Date().getFullYear()} {portfolioContent.personal.name}. All rights reserved.
          </span>
        </div>

        {/* Center: Tech Note */}
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-[#B8B08D]/70 text-[11px]">
          <span>Engineered with Next.js 14, TypeScript & Tailwind CSS</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#283845] border border-slate-300 dark:border-[#B8B08D]/30 text-slate-700 dark:text-[#F6F4EE] hover:text-[#F29559] hover:border-[#F29559] transition-colors shadow-sm"
          aria-label="Back to top"
          id="back-to-top-btn"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#F29559]" />
        </button>

      </div>
    </footer>
  );
}
