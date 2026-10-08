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
  BookOpen
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Mic: <Mic className="w-5 h-5 text-cyan-400" />,
  FileText: <FileText className="w-5 h-5 text-emerald-400" />,
  Users: <Users className="w-5 h-5 text-indigo-400" />,
};

export function About() {
  const { personal } = portfolioContent;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-mono text-xs mb-3 border border-cyan-500/20">
            <Terminal className="w-3.5 h-3.5" />
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Engineering Background & Philosophy
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl text-sm sm:text-base">
            Bridging software engineering depth with cloud-native DevOps discipline to deliver production-grade distributed architectures.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bio & Focus (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-sm">
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
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{personal.location}</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-mono border border-cyan-500/20">
                  <span>Distributed Systems</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono border border-emerald-500/20">
                  <span>Cloud Platforms & K8s</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono border border-indigo-500/20">
                  <span>Observability & SRE</span>
                </div>
              </div>
            </div>

            {/* Soft Skills Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {personal.softSkills.map((skill, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-slate-100/80 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/70 hover:border-cyan-500/40 transition-all duration-200"
                >
                  <div className="p-2 w-fit rounded-lg bg-slate-200 dark:bg-slate-800 mb-3">
                    {iconMap[skill.icon] || <Sparkles className="w-5 h-5 text-cyan-400" />}
                  </div>
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-200 mb-1">
                    {skill.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>

          </div>

          {/* Education & Academic Rigor (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Education Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium">
                  <Calendar className="w-3 h-3" />
                  <span>Class of 2026</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">
                {personal.education.degree}
              </h3>
              <p className="text-cyan-400 text-sm font-medium mb-4">
                {personal.education.institution}
              </p>

              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Core Academic Focus</span>
                </div>
                {personal.education.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics / Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-3xl font-mono font-extrabold text-cyan-500">7+</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                  Major Production Projects
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 text-center">
                <div className="text-3xl font-mono font-extrabold text-emerald-500">100%</div>
                <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                  Cloud-Native & Automated
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
