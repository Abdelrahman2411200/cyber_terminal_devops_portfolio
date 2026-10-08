'use client';

import React, { useState, useEffect } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  Github, 
  Linkedin, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  Activity,
  MapPin
} from 'lucide-react';

export function Hero() {
  const { personal } = portfolioContent;
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % personal.rotatingTitles.length);
        setFadeState(true);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [personal.rotatingTitles.length]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Ambient background glows with Navy and Amber */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#FCA311]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[280px] bg-[#14213D]/40 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14213D]/80 border border-[#FCA311]/30 text-[#E5E5E5] text-xs font-mono mb-8 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FCA311] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FCA311]"></span>
          </span>
          <span className="text-[#FCA311] font-semibold">Available for Work</span>
          <span className="text-slate-500">•</span>
          <span className="text-[#E5E5E5]">Software & DevOps Engineer</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-[#FCA311] via-[#FFB74D] to-[#FFFFFF] bg-clip-text text-transparent">
            {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
          </span>
        </h1>

        {/* Rotating Roles Tagline */}
        <div className="h-12 flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-mono text-[#14213D] dark:text-[#E5E5E5]">
            <span className="text-[#FCA311] font-semibold">&gt;</span>
            <span
              className={`font-semibold text-slate-900 dark:text-white transition-all duration-300 transform ${
                fadeState
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              {personal.rotatingTitles[roleIndex]}
            </span>
            <span className="w-2.5 h-6 bg-[#FCA311] animate-pulse-slow inline-block ml-1" />
          </div>
        </div>

        {/* Pitch / Subheadline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-700 dark:text-[#E5E5E5] leading-relaxed mb-10 font-normal">
          {personal.subheadline}
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FCA311] text-black font-bold text-sm hover:bg-[#FFB74D] transition-all duration-200 shadow-lg shadow-[#FCA311]/25 hover:shadow-[#FCA311]/40 hover:-translate-y-0.5"
            id="hero-view-projects-btn"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </a>

          <a
            href={personal.cvPath}
            download="Abdelrahman_Mohamed_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#14213D] text-white font-semibold text-sm border border-[#FCA311]/40 hover:border-[#FCA311] hover:text-[#FCA311] transition-all duration-200 shadow-sm hover:-translate-y-0.5"
            id="hero-download-cv-btn"
          >
            <FileDown className="w-4 h-4 text-[#FCA311]" />
            <span>Download CV</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E5E5E5] dark:bg-[#14213D]/60 text-[#14213D] dark:text-[#E5E5E5] font-semibold text-sm border border-slate-300 dark:border-[#14213D] hover:bg-slate-200 dark:hover:bg-[#1C2D5A] transition-all duration-200 hover:-translate-y-0.5"
            id="hero-contact-btn"
          >
            <Mail className="w-4 h-4 text-[#FCA311]" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Social Links & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-200 dark:border-[#14213D] text-xs font-mono text-slate-500 dark:text-[#E5E5E5]">
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#E5E5E5]">
            <MapPin className="w-3.5 h-3.5 text-[#FCA311]" />
            <span>{personal.location}</span>
          </div>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#14213D]">•</div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#FCA311] transition-colors"
            id="hero-github-link"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#14213D]">•</div>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#FCA311] transition-colors"
            id="hero-linkedin-link"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#14213D]">•</div>

          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 hover:text-[#FCA311] transition-colors"
            id="hero-email-link"
          >
            <Mail className="w-4 h-4" />
            <span>{personal.email}</span>
          </a>
        </div>

        {/* Core Pillars Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#14213D]/60 border border-slate-200 dark:border-[#14213D] backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FCA311]/15 text-[#FCA311]">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Microservices</div>
              <div className="text-[10px] text-slate-500 dark:text-[#E5E5E5] font-mono">Spring Boot & FastAPI</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#14213D]/60 border border-slate-200 dark:border-[#14213D] backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FCA311]/15 text-[#FCA311]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Cloud & DevOps</div>
              <div className="text-[10px] text-slate-500 dark:text-[#E5E5E5] font-mono">K8s, Terraform, CI/CD</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#14213D]/60 border border-slate-200 dark:border-[#14213D] backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FCA311]/15 text-[#FCA311]">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Event Streams</div>
              <div className="text-[10px] text-slate-500 dark:text-[#E5E5E5] font-mono">Kafka, Outbox, Saga</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-[#14213D]/60 border border-slate-200 dark:border-[#14213D] backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#FCA311]/15 text-[#FCA311]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white">Observability</div>
              <div className="text-[10px] text-slate-500 dark:text-[#E5E5E5] font-mono">OTel, Prometheus, Loki</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
