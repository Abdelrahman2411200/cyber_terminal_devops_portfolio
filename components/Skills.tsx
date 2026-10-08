'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { 
  Code2, 
  Server, 
  Layout, 
  Database, 
  Cloud, 
  Activity, 
  CheckCircle2, 
  ShieldCheck, 
  Terminal, 
  Cpu
} from 'lucide-react';

const categoryIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-[#FCA311]" />,
  Server: <Server className="w-5 h-5 text-[#FCA311]" />,
  Layout: <Layout className="w-5 h-5 text-[#FCA311]" />,
  Database: <Database className="w-5 h-5 text-[#FCA311]" />,
  Cloud: <Cloud className="w-5 h-5 text-[#FCA311]" />,
  Activity: <Activity className="w-5 h-5 text-[#FCA311]" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-[#FCA311]" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#FCA311]" />,
};

export function Skills() {
  const { skills } = portfolioContent;

  return (
    <section id="skills" className="py-20 relative bg-[#E5E5E5]/20 dark:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCA311]/10 text-[#FCA311] font-mono text-xs mb-3 border border-[#FCA311]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Competencies & Toolchain
          </h2>
          <p className="mt-3 text-slate-700 dark:text-[#E5E5E5] max-w-2xl text-sm sm:text-base">
            Categorized toolkit spanning enterprise backend frameworks, cloud infrastructure, message brokers, telemetry, and automated security.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#14213D]/70 border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all duration-300 hover:shadow-lg hover:shadow-[#FCA311]/5 group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-[#E5E5E5] dark:bg-[#0B132B] border border-slate-300 dark:border-[#14213D] group-hover:scale-105 transition-transform duration-200">
                    {categoryIconMap[category.icon] || <Cpu className="w-5 h-5 text-[#FCA311]" />}
                  </div>
                  <h3 className="font-semibold text-base text-slate-900 dark:text-white group-hover:text-[#FCA311] transition-colors">
                    {category.category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#E5E5E5]/70 dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5] border border-slate-300 dark:border-[#14213D] hover:border-[#FCA311]/60 hover:text-[#FCA311] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-200 dark:border-[#14213D] flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-[#E5E5E5]">
                <span>{category.skills.length} skills</span>
                <span className="text-[#FCA311]">#0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
