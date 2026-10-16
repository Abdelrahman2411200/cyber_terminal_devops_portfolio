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
import { motion } from 'framer-motion';

const categoryIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5 text-cyan-400" />,
  Server: <Server className="w-5 h-5 text-cyan-400" />,
  Layout: <Layout className="w-5 h-5 text-cyan-400" />,
  Database: <Database className="w-5 h-5 text-cyan-400" />,
  Cloud: <Cloud className="w-5 h-5 text-emerald-400" />,
  Activity: <Activity className="w-5 h-5 text-emerald-400" />,
  CheckCircle2: <CheckCircle2 className="w-5 h-5 text-cyan-400" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
};

export function Skills() {
  const { skills } = portfolioContent;

  return (
    <section id="skills" className="py-28 relative bg-slate-50/50 dark:bg-[#05080E]/70 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>02 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Core Competencies & Toolchain
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base">
            Categorized toolkit spanning enterprise backend frameworks, cloud infrastructure, message brokers, telemetry, and automated security.
          </p>
        </motion.div>

        {/* Bento Grid Layout with Scroll-Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {skills.map((category, idx) => {
            const isPriority = category.category === 'Backend Engineering' || category.category === 'Cloud & DevOps';
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`p-6 rounded-3xl bg-white dark:bg-[#0D1527]/85 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group flex flex-col justify-between ${
                  isPriority 
                    ? 'border-slate-300 dark:border-cyan-500/30 hover:border-cyan-400 shadow-md shadow-cyan-950/20' 
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-[#131F37] border border-slate-200 dark:border-slate-800 group-hover:scale-105 group-hover:border-cyan-500/40 transition-all duration-200">
                        {categoryIconMap[category.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                      </div>
                      <h3 className="font-semibold text-base text-slate-900 dark:text-white group-hover:text-cyan-400 transition-colors">
                        {category.category}
                      </h3>
                    </div>
                  </div>

                  {/* Skill Badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-[#131F37]/80 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Meta */}
                <div className="mt-6 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{category.skills.length} competencies</span>
                  <span className="text-cyan-400 font-semibold">#0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
