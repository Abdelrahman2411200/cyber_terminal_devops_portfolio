'use client';

import React, { useState, useEffect } from 'react';
import { portfolioContent } from '@/data/content';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, FileDown, Terminal } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Academic', href: '#academic' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl && sectionEl.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/90 dark:bg-black/90 backdrop-blur-md border-b border-[#14213D] shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a
            href="#"
            className="flex items-center gap-2 group text-white font-mono text-sm font-semibold tracking-tight"
            id="nav-brand-link"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#FCA311] to-[#FFB74D] p-[1px] transition-transform group-hover:scale-105 shadow-sm shadow-[#FCA311]/20">
              <div className="w-full h-full bg-[#14213D] rounded-[7px] flex items-center justify-center text-[#FCA311]">
                <Terminal className="w-4 h-4" />
              </div>
            </div>
            <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-white">
              Abdelrahman<span className="text-[#FCA311]">.dev</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-[#E5E5E5]/60 dark:bg-[#14213D]/80 p-1.5 rounded-full border border-slate-300 dark:border-[#14213D] backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FCA311] text-black font-semibold shadow-sm shadow-[#FCA311]/30'
                      : 'text-slate-700 dark:text-[#E5E5E5] hover:text-black dark:hover:text-white hover:bg-slate-300/40 dark:hover:bg-[#1C2D5A]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Actions: CV & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={portfolioContent.personal.cvPath}
              download="Abdelrahman_Mohamed_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono bg-[#FCA311]/10 text-[#FCA311] border border-[#FCA311]/30 hover:bg-[#FCA311]/20 hover:border-[#FCA311] transition-all duration-200"
              id="nav-cv-download"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#E5E5E5] dark:bg-[#14213D] text-[#14213D] dark:text-[#E5E5E5] hover:text-[#FCA311] transition-colors"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-black/95 border-b border-[#14213D] backdrop-blur-xl px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FCA311]/15 text-[#FCA311] font-semibold'
                    : 'text-slate-800 dark:text-[#E5E5E5] hover:bg-slate-100 dark:hover:bg-[#14213D]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-slate-200 dark:border-[#14213D] flex justify-center">
            <a
              href={portfolioContent.personal.cvPath}
              download="Abdelrahman_Mohamed_CV.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold font-mono bg-[#FCA311] text-black shadow-md shadow-[#FCA311]/25"
            >
              <FileDown className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
