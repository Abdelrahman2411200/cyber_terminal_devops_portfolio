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
  'insurance-system-erd': <Database className="w-5 h-5 text-cyan-400" />,
  'pcm-simulation': <Radio className="w-5 h-5 text-cyan-400" />,
  'cybersecurity-hotel-network': <ShieldCheck className="w-5 h-5 text-cyan-400" />,
  'ml-flower-classification': <Sparkles className="w-5 h-5 text-cyan-400" />,
  'devops-qr-scanner-pipeline': <GitBranch className="w-5 h-5 text-cyan-400" />,
};

export function AcademicProjects() {
  const { academicProjects } = portfolioContent;
  const [isExpanded, setIsExpanded] = useState(false);

  // Show 3 by default, expand to all 5
  const visibleProjects = isExpanded ? academicProjects : academicProjects.slice(0, 3);

  return (
    <section id="academic" className="py-28 relative bg-slate-50/50 dark:bg-[#05080E]/70 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // ACADEMIC & FOUNDATIONAL PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering & Computer Science Foundations
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base">
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
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1527]/85 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* Header Icon + Category */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#131F37] border border-slate-200 dark:border-slate-800 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-200">
                      {academicIcons[project.id] || <Terminal className="w-5 h-5 text-cyan-400" />}
                    </div>
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-[#131F37] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Key Takeaway */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 mb-4 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{project.keyTakeaway}</span>
                  </div>
                </div>

                {/* Tech Chips */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-[#131F37] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Expand / Collapse Button with Motion */}
        {academicProjects.length > 3 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white dark:bg-[#0D1527] border border-slate-300 dark:border-cyan-500/30 text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 shadow-sm hover:shadow-md"
              id="toggle-academic-projects-btn"
            >
              <span>{isExpanded ? 'Collapse Academic Projects' : `Show All ${academicProjects.length} Coursework Projects`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
