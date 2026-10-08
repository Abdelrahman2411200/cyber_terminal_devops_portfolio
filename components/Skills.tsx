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
  Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-indigo-400" />,
  Layout: <Layout className="w-5 h-5 text-sky-400" />,
  Database: <Database className="w-5 h-5 text-emerald-400" />,
  Cloud: <Cloud className="w-5 h-5 text-cyan-400" />,
  Activity: <Activity className="w-5 h-5 text-amber-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-teal-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-rose-400" />,
};

export function Skills() {
  const { skills } = portfolioContent;

  return (
    <section id="skills" className="py-20 relative bg-slate-50/50 dark:bg-[#070b13]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Competencies & Toolchain
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Categorized toolkit spanning enterprise backend frameworks, cloud infrastructure, message brokers, telemetry, and automated security.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 dark:hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 transition-transform duration-200">
                    {categoryIconMap[category.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <h3 className="font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                    {category.category}
                  </h3>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/50 hover:border-cyan-500/40 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
                <span>{category.skills.length} skills</span>
                <span className="text-cyan-500/60 dark:text-cyan-400/50">#0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
