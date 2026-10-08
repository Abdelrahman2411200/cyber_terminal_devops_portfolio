'use client';

import React, { useState } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  Send, 
  Terminal
} from 'lucide-react';

export function Contact() {
  const { personal } = portfolioContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow with Amber & Navy */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#FCA311]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCA311]/10 text-[#FCA311] font-mono text-xs mb-3 border border-[#FCA311]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>06 // GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="mt-4 text-slate-700 dark:text-[#E5E5E5] max-w-xl text-sm sm:text-base">
            I am actively looking for junior Software Engineer & DevOps opportunities. Whether you have an open role, an exciting distributed project, or just want to talk cloud architectures — my inbox is always open.
          </p>
        </div>

        {/* Contact Container Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#14213D]/90 border border-slate-200 dark:border-[#14213D] shadow-2xl backdrop-blur-xl">
          
          {/* Status Beacon */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCA311] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FCA311]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-slate-900 dark:text-[#E5E5E5]">
              Open to junior <span className="text-[#FCA311] font-semibold">Software & DevOps Engineer</span> roles
            </span>
          </div>

          {/* Primary Action: Direct Mail & Copy Email */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 max-w-xl mx-auto">
            <a
              href={`mailto:${personal.email}`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-[#FCA311] text-black font-bold text-sm hover:bg-[#FFB74D] transition-all shadow-lg shadow-[#FCA311]/25 hover:shadow-[#FCA311]/40 hover:-translate-y-0.5"
              id="contact-email-btn"
            >
              <Send className="w-4 h-4 text-black" />
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-900 dark:text-[#E5E5E5] font-semibold text-sm border border-slate-300 dark:border-[#14213D] hover:bg-slate-300 dark:hover:bg-[#1C2D5A] transition-all shadow-sm"
              id="copy-email-btn"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#FCA311]" />
                  <span className="text-[#FCA311] font-mono text-xs">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span className="font-mono text-xs">Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Channel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-700/80">
            
            {/* Email Card */}
            <a
              href={`mailto:${personal.email}`}
              className="p-4 rounded-2xl bg-[#E5E5E5]/50 dark:bg-[#0B132B] border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all group flex flex-col items-center text-center"
            >
              <div className="p-2.5 rounded-xl bg-[#FCA311]/15 text-[#FCA311] mb-2 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">Email</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-[#E5E5E5] truncate max-w-[200px]">
                {personal.email}
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#E5E5E5]/50 dark:bg-[#0B132B] border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all group flex flex-col items-center text-center"
              id="contact-github-card"
            >
              <div className="p-2.5 rounded-xl bg-[#E5E5E5] dark:bg-[#14213D] text-slate-900 dark:text-white mb-2 group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5 text-[#FCA311]" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">GitHub</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-[#E5E5E5]">
                @Abdelrahman2411200
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#E5E5E5]/50 dark:bg-[#0B132B] border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all group flex flex-col items-center text-center"
              id="contact-linkedin-card"
            >
              <div className="p-2.5 rounded-xl bg-[#14213D] text-[#FCA311] mb-2 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mb-0.5">LinkedIn</div>
              <div className="text-[11px] font-mono text-slate-600 dark:text-[#E5E5E5]">
                Abdelrahman Mohamed
              </div>
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
