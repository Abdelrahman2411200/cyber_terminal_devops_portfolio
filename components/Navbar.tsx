'use client';

import React, { useState, useEffect } from 'react';
import { portfolioContent } from '@/data/content';
import { ThemeToggle } from './ThemeToggle';
import { CommandPalette } from './CommandPalette';
import { Menu, X, FileDown, Terminal, Command } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

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
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 140;

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#090D16]/85 dark:bg-[#090D16]/85 backdrop-blur-xl border-b border-cyan-500/15 shadow-xl shadow-black/40'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Top Scroll Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-300 origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo / Cyber Terminal Brand */}
            <a
              href="#"
              className="flex items-center gap-2.5 group font-mono text-sm font-semibold tracking-tight"
              id="nav-brand-link"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-emerald-400 p-[1px] transition-transform group-hover:scale-105 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-[#0D1527] rounded-[7px] flex items-center justify-center text-cyan-400 group-hover:text-emerald-300 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
              </div>
              <span className="font-semibold text-base tracking-tight text-slate-900 dark:text-white">
                Abdelrahman<span className="text-cyan-400 font-mono">.dev</span>
              </span>
            </a>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-1 bg-slate-200/60 dark:bg-[#0D1527]/85 p-1 rounded-full border border-slate-300/80 dark:border-cyan-500/20 backdrop-blur-md">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-cyan-950 dark:text-black font-semibold'
                        : 'text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSectionIndicator"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full shadow-sm shadow-cyan-500/30"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Actions: Command Palette, CV & Theme Toggle */}
            <div className="hidden md:flex items-center gap-2.5">
              {/* Cmd+K trigger */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[#0D1527] text-slate-400 border border-slate-700/80 hover:border-cyan-500/50 hover:text-cyan-300 transition-all duration-200 shadow-sm"
                aria-label="Open command palette"
                title="Press ⌘K or Ctrl+K"
              >
                <Command className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px]">⌘K</span>
              </button>

              {/* Resume download */}
              <a
                href={portfolioContent.personal.cvPath}
                download="Abdelrahman_Mohamed_CV.pdf"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-200 shadow-sm"
                id="nav-cv-download"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Resume</span>
              </a>

              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="p-2 rounded-lg bg-[#0D1527] text-cyan-400 border border-cyan-500/30"
                aria-label="Open command palette"
              >
                <Command className="w-4 h-4" />
              </button>
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-200 dark:bg-[#0D1527] text-slate-800 dark:text-slate-200 hover:text-cyan-400 border border-transparent dark:border-cyan-500/20 transition-colors"
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
          <div className="md:hidden bg-white/95 dark:bg-[#090D16]/95 border-b border-cyan-500/20 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-mono font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-400 font-semibold border border-cyan-500/30'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0D1527]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-center">
              <a
                href={portfolioContent.personal.cvPath}
                download="Abdelrahman_Mohamed_CV.pdf"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold font-mono bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg shadow-cyan-500/20"
              >
                <FileDown className="w-4 h-4" />
                <span>Download Resume (PDF)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />
    </>
  );
}
