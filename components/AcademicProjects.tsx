'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { 
  GraduationCap, 
  Terminal, 
  Database, 
  Radio, 
  ShieldCheck, 
  Sparkles, 
  GitBranch, 
  CheckCircle2 
} from 'lucide-react';

const academicIcons: Record<string, React.ReactNode> = {
  'insurance-system-erd': <Database className="w-5 h-5 text-cyan-400" />,
  'pcm-simulation': <Radio className="w-5 h-5 text-indigo-400" />,
  'cybersecurity-hotel-network': <ShieldCheck className="w-5 h-5 text-emerald-400" />,
  'ml-flower-classification': <Sparkles className="w-5 h-5 text-amber-400" />,
  'devops-qr-scanner-pipeline': <GitBranch className="w-5 h-5 text-sky-400" />,
};

export function AcademicProjects() {
  const { academicProjects } = portfolioContent;

  return (
    <section id="academic" className="py-20 relative bg-slate-50/50 dark:bg-[#070b13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/20">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // ACADEMIC & FOUNDATIONAL PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering & Computer Science Foundations
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Hands-on coursework projects in relational database architecture, digital communications, network security topologies, and machine learning.
          </p>
        </div>

        {/* Academic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicProjects.map((project, idx) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Category */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform duration-200">
                    {academicIcons[project.id] || <Terminal className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Takeaway */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300 mb-4 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                  <span>{project.keyTakeaway}</span>
                </div>
              </div>

              {/* Tech Chips */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
