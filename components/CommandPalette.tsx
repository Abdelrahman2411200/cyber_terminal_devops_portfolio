'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { portfolioContent } from '@/data/content';
import { 
  Search, 
  Terminal, 
  User, 
  Cpu, 
  Layers, 
  FolderGit2, 
  GraduationCap, 
  Mail, 
  FileDown, 
  Sun, 
  Moon, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  X,
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Social';
  icon: React.ReactNode;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioContent.personal.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  const jumpTo = (id: string) => {
    onClose();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-about',
      label: 'Go to About Me',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('about'),
      shortcut: 'G A',
    },
    {
      id: 'nav-skills',
      label: 'Go to Technical Skills',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('skills'),
      shortcut: 'G S',
    },
    {
      id: 'nav-projects',
      label: 'Go to Featured Projects',
      category: 'Navigation',
      icon: <FolderGit2 className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('projects'),
      shortcut: 'G P',
    },
    {
      id: 'nav-architecture',
      label: 'Go to Architecture Deep Dive',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('architecture'),
      shortcut: 'G R',
    },
    {
      id: 'nav-academic',
      label: 'Go to Academic Foundations',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('academic'),
      shortcut: 'G C',
    },
    {
      id: 'nav-contact',
      label: 'Go to Contact Section',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-[#F29559]" />,
      action: () => jumpTo('contact'),
      shortcut: 'G M',
    },
    {
      id: 'act-copy-email',
      label: copied ? 'Email Copied!' : `Copy Email (${portfolioContent.personal.email})`,
      category: 'Actions',
      icon: copied ? <Check className="w-4 h-4 text-[#F2D492]" /> : <Copy className="w-4 h-4 text-[#F2D492]" />,
      action: handleCopyEmail,
      shortcut: 'C',
    },
    {
      id: 'act-download-cv',
      label: 'Download Resume (CV PDF)',
      category: 'Actions',
      icon: <FileDown className="w-4 h-4 text-[#F2D492]" />,
      action: () => {
        window.open(portfolioContent.personal.cvPath, '_blank');
        onClose();
      },
      shortcut: 'D',
    },
    {
      id: 'act-toggle-theme',
      label: `Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} Mode`,
      category: 'Actions',
      icon: resolvedTheme === 'dark' ? <Sun className="w-4 h-4 text-[#F2D492]" /> : <Moon className="w-4 h-4 text-[#B8B08D]" />,
      action: () => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        onClose();
      },
      shortcut: 'T',
    },
    {
      id: 'soc-github',
      label: 'Open GitHub Profile',
      category: 'Social',
      icon: <Github className="w-4 h-4 text-[#B8B08D]" />,
      action: () => {
        window.open(portfolioContent.personal.github, '_blank');
        onClose();
      },
    },
    {
      id: 'soc-linkedin',
      label: 'Open LinkedIn Profile',
      category: 'Social',
      icon: <Linkedin className="w-4 h-4 text-[#F2D492]" />,
      action: () => {
        window.open(portfolioContent.personal.linkedin, '_blank');
        onClose();
      },
    },
  ];

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#202C39] border border-[#B8B08D]/30 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden text-[#F6F4EE] animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#17202B] border-b border-[#283845] text-xs font-mono text-[#B8B08D]">
          <div className="flex items-center gap-2 text-[#F29559]">
            <Terminal className="w-3.5 h-3.5" />
            <span>abdelrahman.sh — Command Center</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded hover:bg-[#283845] text-[#B8B08D] hover:text-[#F6F4EE] transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#283845] bg-[#202C39]">
          <Search className="w-4 h-4 text-[#F29559] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections..."
            className="w-full bg-transparent border-0 text-sm font-mono text-[#F6F4EE] placeholder-[#B8B08D]/50 focus:outline-none focus:ring-0"
          />
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#283845] border border-[#B8B08D]/30 text-[#B8B08D]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[#B8B08D]">
              No matching commands found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-mono transition-all duration-150 ${
                    isSelected
                      ? 'bg-[#F29559]/20 border border-[#F29559]/50 text-[#F6F4EE] shadow-sm'
                      : 'border border-transparent text-[#B8B08D] hover:bg-[#283845]/70 hover:text-[#F6F4EE]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-[#17202B] border border-[#283845]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-[#F6F4EE]">{item.label}</div>
                      <div className="text-[10px] text-[#B8B08D]/70">{item.category}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.shortcut && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#283845] text-[#B8B08D] border border-[#B8B08D]/30">
                        {item.shortcut}
                      </span>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 text-[#F29559] transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hints */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#17202B] border-t border-[#283845] text-[11px] font-mono text-[#B8B08D]/70">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
