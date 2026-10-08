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
  'insurance-system-erd': <Database className="w-5 h-5 text-[#FCA311]" />,
  'pcm-simulation': <Radio className="w-5 h-5 text-[#FCA311]" />,
  'cybersecurity-hotel-network': <ShieldCheck className="w-5 h-5 text-[#FCA311]" />,
  'ml-flower-classification': <Sparkles className="w-5 h-5 text-[#FCA311]" />,
  'devops-qr-scanner-pipeline': <GitBranch className="w-5 h-5 text-[#FCA311]" />,
};

export function AcademicProjects() {
  const { academicProjects } = portfolioContent;

  return (
    <section id="academic" className="py-20 relative bg-[#E5E5E5]/20 dark:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCA311]/10 text-[#FCA311] font-mono text-xs mb-3 border border-[#FCA311]/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>05 // ACADEMIC & FOUNDATIONAL PROJECTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering & Computer Science Foundations
          </h2>
          <p className="mt-3 text-slate-700 dark:text-[#E5E5E5] max-w-2xl text-sm sm:text-base">
            Coursework projects in relational database architecture, digital communications, network security topologies, and machine learning.
          </p>
        </div>

        {/* Academic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academicProjects.map((project) => (
            <div
              key={project.id}
              className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/70 border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Icon + Category */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-[#E5E5E5] dark:bg-[#0B132B] border border-slate-300 dark:border-[#14213D] group-hover:scale-105 transition-transform duration-200">
                    {academicIcons[project.id] || <Terminal className="w-5 h-5 text-[#FCA311]" />}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5] border border-slate-300 dark:border-[#14213D]">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#FCA311] transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#E5E5E5] leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Key Takeaway */}
                <div className="p-3 rounded-xl bg-[#E5E5E5]/60 dark:bg-[#0B132B]/80 border border-slate-300 dark:border-[#14213D] text-xs text-slate-800 dark:text-[#E5E5E5] mb-4 flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FCA311] shrink-0 mt-0.5" />
                  <span>{project.keyTakeaway}</span>
                </div>
              </div>

              {/* Tech Chips */}
              <div className="pt-3 border-t border-slate-200 dark:border-[#14213D] flex flex-wrap gap-1.5">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5]"
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
