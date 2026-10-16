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
import { motion, AnimatePresence } from 'framer-motion';

export function Contact() {
  const { personal } = portfolioContent;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      {/* Background glow in warm coral and gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[400px] bg-[#F29559]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F29559]/10 text-[#F29559] font-mono text-xs mb-3 border border-[#F29559]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>Communications & Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F4EE]">
            Let&apos;s Build Something Resilient
          </h2>
          <p className="mt-4 text-slate-600 dark:text-[#B8B08D] max-w-xl text-sm sm:text-base">
            I am actively looking for junior Software Engineer & DevOps opportunities. Whether you have an open role, an exciting distributed project, or just want to talk cloud architectures — my inbox is always open.
          </p>
        </motion.div>

        {/* Contact Container Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/30 shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-[#F29559]/50 transition-colors"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F29559]/10 rounded-full blur-3xl pointer-events-none" />
          
          {/* Status Beacon */}
          <div className="flex items-center justify-center gap-2.5 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2D492] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2D492]"></span>
            </span>
            <span className="text-xs sm:text-sm font-mono font-medium text-slate-700 dark:text-[#F6F4EE]">
              Open to junior <span className="text-[#F29559] font-semibold">Software & DevOps Engineer</span> roles
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 max-w-xl mx-auto">
            <a
              href={`mailto:${personal.email}`}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#F29559] to-[#F2D492] text-[#202C39] font-bold text-sm hover:from-[#F5A775] hover:to-[#FBE2AB] transition-all shadow-lg shadow-[#F29559]/25 hover:shadow-[#F29559]/40 hover:-translate-y-0.5 active:translate-y-0"
              id="contact-email-btn"
            >
              <Send className="w-4 h-4 text-[#202C39]" />
              <span>Send Direct Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-[#202C39] text-slate-800 dark:text-[#F6F4EE] font-semibold text-sm border border-slate-300 dark:border-[#B8B08D]/30 hover:border-[#F29559] hover:text-[#F29559] transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0"
              id="copy-email-btn"
              aria-label="Copy email address to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#F2D492]" />
                  <span className="text-[#F2D492] font-mono text-xs font-semibold">Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-[#B8B08D]" />
                  <span className="font-mono text-xs">Copy Address</span>
                </>
              )}
            </button>
          </div>

          {/* Channel Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-[#202C39]">
            
            {/* Email Card */}
            <a
              href={`mailto:${personal.email}`}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#202C39] border border-slate-200 dark:border-[#B8B08D]/20 hover:border-[#F29559]/60 hover:-translate-y-1 transition-all group flex flex-col items-center text-center shadow-sm"
            >
              <div className="p-3 rounded-2xl bg-[#F29559]/15 text-[#F29559] mb-2.5 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE] mb-0.5">Email</div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-[#B8B08D] truncate max-w-[200px]">
                {personal.email}
              </div>
            </a>

            {/* GitHub Card */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#202C39] border border-slate-200 dark:border-[#B8B08D]/20 hover:border-[#F29559]/60 hover:-translate-y-1 transition-all group flex flex-col items-center text-center shadow-sm"
              id="contact-github-card"
            >
              <div className="p-3 rounded-2xl bg-[#283845] text-[#F6F4EE] mb-2.5 group-hover:scale-110 transition-transform">
                <Github className="w-5 h-5 text-[#F29559]" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE] mb-0.5">GitHub</div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-[#B8B08D]">
                @Abdelrahman2411200
              </div>
            </a>

            {/* LinkedIn Card */}
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-slate-50 dark:bg-[#202C39] border border-slate-200 dark:border-[#B8B08D]/20 hover:border-[#F29559]/60 hover:-translate-y-1 transition-all group flex flex-col items-center text-center shadow-sm"
              id="contact-linkedin-card"
            >
              <div className="p-3 rounded-2xl bg-[#F2D492]/15 text-[#F2D492] mb-2.5 group-hover:scale-110 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE] mb-0.5">LinkedIn</div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-[#B8B08D]">
                Abdelrahman Mohamed
              </div>
            </a>

          </div>

        </motion.div>

      </div>

      {/* Floating Toast Notification on Copy */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#283845] border border-[#F2D492]/50 text-[#F6F4EE] font-mono text-xs shadow-2xl shadow-black/80"
          >
            <Check className="w-4 h-4 text-[#F2D492]" />
            <span>Email copied to clipboard: {personal.email}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
