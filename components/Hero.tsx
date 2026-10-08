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
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-cyan-500/15 dark:bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-mono mb-8 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 font-semibold">Available for Work</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-300">Software & DevOps Engineer</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
          </span>
        </h1>

        {/* Rotating Roles Tagline */}
        <div className="h-12 flex items-center justify-center mb-6">
          <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-mono text-slate-700 dark:text-slate-300">
            <span className="text-cyan-500 font-semibold">&gt;</span>
            <span
              className={`font-semibold text-slate-900 dark:text-slate-100 transition-all duration-300 transform ${
                fadeState
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 -translate-y-2'
              }`}
            >
              {personal.rotatingTitles[roleIndex]}
            </span>
            <span className="w-2.5 h-6 bg-cyan-400 animate-pulse-slow inline-block ml-1" />
          </div>
        </div>

        {/* Pitch / Subheadline */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-10 font-normal">
          {personal.subheadline}
        </p>

        {/* Main CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-semibold text-sm hover:from-cyan-400 hover:to-teal-400 transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:-translate-y-0.5"
            id="hero-view-projects-btn"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={personal.cvPath}
            download="Abdelrahman_Mohamed_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 dark:bg-slate-900/90 text-slate-100 font-semibold text-sm border border-slate-700/80 hover:border-cyan-500/60 hover:text-cyan-400 transition-all duration-200 shadow-sm hover:-translate-y-0.5"
            id="hero-download-cv-btn"
          >
            <FileDown className="w-4 h-4 text-cyan-400" />
            <span>Download CV</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5"
            id="hero-contact-btn"
          >
            <Mail className="w-4 h-4" />
            <span>Get in Touch</span>
          </a>
        </div>

        {/* Social Links & Location Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-200/50 dark:border-slate-800/80 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-500" />
            <span>{personal.location}</span>
          </div>

          <div className="hidden sm:inline-block text-slate-600 dark:text-slate-700">•</div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            id="hero-github-link"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <div className="hidden sm:inline-block text-slate-600 dark:text-slate-700">•</div>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            id="hero-linkedin-link"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <div className="hidden sm:inline-block text-slate-600 dark:text-slate-700">•</div>

          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
            id="hero-email-link"
          >
            <Mail className="w-4 h-4" />
            <span>{personal.email}</span>
          </a>
        </div>

        {/* Core Pillars Ribbon */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-slate-900/40 dark:bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Microservices</div>
              <div className="text-[10px] text-slate-400 font-mono">Spring Boot & FastAPI</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 dark:bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Cloud & DevOps</div>
              <div className="text-[10px] text-slate-400 font-mono">K8s, Terraform, CI/CD</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 dark:bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Event Streams</div>
              <div className="text-[10px] text-slate-400 font-mono">Kafka, Outbox, Saga</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/40 dark:bg-slate-900/60 border border-slate-800/60 backdrop-blur-sm flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200">Observability</div>
              <div className="text-[10px] text-slate-400 font-mono">OTel, Prometheus, Loki</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
