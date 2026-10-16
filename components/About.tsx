'use client';

import React from 'react';
import { portfolioContent } from '@/data/content';
import { 
  GraduationCap, 
  MapPin, 
  Sparkles, 
  Mic, 
  FileText, 
  Users, 
  CheckCircle2, 
  Terminal,
  Calendar,
  BookOpen,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  Mic: <Mic className="w-5 h-5 text-cyan-400" />,
  FileText: <FileText className="w-5 h-5 text-cyan-400" />,
  Users: <Users className="w-5 h-5 text-cyan-400" />,
};

export function About() {
  const { personal } = portfolioContent;

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
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
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering Background & Philosophy
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-2xl text-sm sm:text-base">
            Bridging software engineering depth with cloud-native DevOps discipline to deliver production-grade distributed architectures.
          </p>
        </motion.div>

        {/* Content Grid: Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Bio & Focus (7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            
            {/* Bio Card with refined glass and subtle cyan border */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1527]/85 border border-slate-200 dark:border-cyan-500/25 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-cyan-400/50 transition-colors">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Summary & Passion</span>
              </h3>
              
              <div className="space-y-4 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                {personal.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Location and Focus Tags */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#131F37] text-xs font-mono text-slate-800 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{personal.location}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
                  <span>Distributed Systems</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                  <span>Cloud Platforms & K8s</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-mono border border-indigo-500/30">
                  <span>Observability & SRE</span>
                </div>
              </div>
            </div>

            {/* Soft Skills Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {personal.softSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-white dark:bg-[#0D1527]/75 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/50 hover:-translate-y-1 transition-all duration-200 shadow-sm group"
                >
                  <div className="p-2.5 w-fit rounded-xl bg-slate-100 dark:bg-[#131F37] mb-3 group-hover:scale-105 transition-transform">
                    {iconMap[skill.icon] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white mb-1.5">
                    {skill.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

          {/* Education & Academic Rigor (5 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 space-y-6"
          >
            
            {/* Timeline-Style Education Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0D1527] border border-slate-200 dark:border-cyan-500/30 shadow-2xl relative overflow-hidden backdrop-blur-md group hover:border-cyan-400/60 transition-colors">
              <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="p-3 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Graduating {personal.education.graduationYear}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-1">
                {personal.education.degree}
              </h3>
              <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
                {personal.education.institution}
              </p>

              {/* Timeline Track with Glowing Nodes */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-emerald-400 before:to-transparent">
                
                {/* Milestone 1: Specialization */}
                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-[#0D1527] shadow-sm shadow-cyan-400" />
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Core Engineering Focus</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {personal.education.highlights[0]}
                  </p>
                </div>

                {/* Milestone 2: Fundamentals */}
                <div className="relative">
                  <span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-[#0D1527] shadow-sm shadow-emerald-400" />
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Algorithms & Architecture</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {personal.education.highlights[1]}
                  </p>
                </div>

              </div>

              {/* Highlights Summary */}
              <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                {personal.education.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics / Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527]/85 border border-slate-200 dark:border-slate-800 text-center hover:border-cyan-500/40 transition-colors">
                <div className="text-3xl font-mono font-extrabold text-cyan-400">7+</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  Major Projects Built
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-[#0D1527]/85 border border-slate-200 dark:border-slate-800 text-center hover:border-emerald-500/40 transition-colors">
                <div className="text-3xl font-mono font-extrabold text-emerald-400">100%</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1">
                  Cloud-Native & Automated
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
