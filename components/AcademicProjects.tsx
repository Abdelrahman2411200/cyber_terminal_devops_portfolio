'use client';

import React, { useState } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  GraduationCap, 
  Terminal, 
  Database, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  GitBranch, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const academicIcons: Record<string, React.ReactNode> = {
  'insurance-system-erd': <Database className="w-5 h-5 text-[#F29559]" />,
  'pcm-simulation': <Radio className="w-5 h-5 text-[#F2D492]" />,
  'cybersecurity-hotel-network': <ShieldCheck className="w-5 h-5 text-[#F29559]" />,
  'ml-flower-classification': <Sparkles className="w-5 h-5 text-[#F2D492]" />,
  'devops-qr-scanner-pipeline': <GitBranch className="w-5 h-5 text-[#F29559]" />,
};

export function AcademicProjects() {
  const { academicProjects } = portfolioContent;
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleProjects = isExpanded ? academicProjects : academicProjects.slice(0, 3);

  return (
    <section id="academic" className="py-28 relative bg-[#1B2530]/60 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#F29559]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F29559]/10 text-[#F29559] font-mono text-xs mb-3 border border-[#F29559]/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Foundational Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F6F4EE]">
            Engineering & Computer Science Foundations
          </h2>
          <p className="mt-3 text-slate-600 dark:text-[#B8B08D] max-w-2xl text-sm sm:text-base">
            Rigorous academic foundations in relational database architecture, digital signals, enterprise network security, and machine learning.
          </p>
        </motion.div>

        {/* Academic Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {visibleProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                key={project.id}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/25 hover:border-[#F29559]/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* Header Icon + Category */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#202C39] border border-slate-200 dark:border-[#B8B08D]/30 group-hover:scale-105 group-hover:border-[#F29559]/40 transition-all duration-200">
                      {academicIcons[project.id] || <Terminal className="w-5 h-5 text-[#F29559]" />}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-[#202C39] text-slate-700 dark:text-[#F6F4EE]/90 border border-slate-200 dark:border-[#B8B08D]/25">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#F6F4EE] mb-2 group-hover:text-[#F29559] transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#B8B08D] leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Takeaway */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#202C39] border border-slate-200 dark:border-[#B8B08D]/20 text-xs text-slate-700 dark:text-[#F6F4EE]/90 mb-4 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#F2D492] shrink-0 mt-0.5" />
                    <span>{project.keyTakeaway}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="pt-3 border-t border-slate-100 dark:border-[#B8B08D]/20 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-[#202C39] text-slate-700 dark:text-[#B8B08D] border border-slate-200 dark:border-[#B8B08D]/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse Button */}
        {academicProjects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#283845] border border-slate-300 dark:border-[#F29559]/30 text-xs font-mono font-semibold text-slate-800 dark:text-[#F6F4EE] hover:border-[#F29559] hover:text-[#F29559] transition-all duration-200 shadow-sm hover:shadow-md"
              id="toggle-academic-projects-btn"
            >
              <span>{isExpanded ? 'Collapse Academic Projects' : `Show All ${academicProjects.length} Coursework Projects`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-[#F29559]" /> : <ChevronDown className="w-4 h-4 text-[#F29559]" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
