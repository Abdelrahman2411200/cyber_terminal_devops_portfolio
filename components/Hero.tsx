'use client';

import React, { useState, useEffect } from 'react';
import { portfolioContent } from '@/data/content';
import { 
  ArrowRight, 
  FileDown, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin,
  Server,
  Cloud,
  Layers,
  Activity,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const terminalScenarios = [
  {
    cmd: 'kubectl get engineer -n production',
    out: 'NAME: abdelrahman  STATUS: Ready  ROLES: [DevOps, Backend, Cloud]',
    statusColor: 'text-[#F2D492]',
  },
  {
    cmd: 'terraform apply -auto-approve',
    out: 'Apply complete! Resources: 14 added, 0 changed, 0 destroyed.',
    statusColor: 'text-[#F29559]',
  },
  {
    cmd: 'curl -I https://api.abdelrahman.dev/healthz',
    out: 'HTTP/2 200 OK — Latency: 3.8ms | Tracing: OTel-Active | Kafka: Connected',
    statusColor: 'text-[#F2D492]',
  },
  {
    cmd: 'docker scan portfolio:latest',
    out: '0 Critical | 0 High | Base image verified | Trivy audit: PASS',
    statusColor: 'text-[#F29559]',
  },
];

const marqueeTech = [
  'Java 17', 'Spring Boot', 'Python', 'FastAPI', 'Kubernetes (EKS)', 
  'Docker', 'Terraform', 'Apache Kafka', 'PostgreSQL', 'Redis', 
  'Prometheus', 'Grafana', 'OpenTelemetry', 'Jaeger', 'React', 
  'TypeScript', 'GitHub Actions', 'Kustomize', 'Trivy & tfsec', 'Next.js'
];

export function Hero() {
  const { personal } = portfolioContent;
  const [roleIndex, setRoleIndex] = useState(0);

  // Typing simulator state
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showOutput, setShowOutput] = useState(false);

  // Rotating roles loop
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personal.rotatingTitles.length);
    }, 3200);

    return () => clearInterval(roleTimer);
  }, [personal.rotatingTitles.length]);

  // Terminal typing simulation loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentScenario = terminalScenarios[scenarioIndex];

    if (isTyping) {
      if (typedText.length < currentScenario.cmd.length) {
        timeout = setTimeout(() => {
          setTypedText(currentScenario.cmd.slice(0, typedText.length + 1));
        }, 40 + Math.random() * 30);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setShowOutput(true);
        }, 300);
      }
    } else {
      timeout = setTimeout(() => {
        setShowOutput(false);
        setTypedText('');
        setIsTyping(true);
        setScenarioIndex((prev) => (prev + 1) % terminalScenarios.length);
      }, 3500);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isTyping, scenarioIndex]);

  return (
    <section 
      id="hero" 
      className="relative min-h-[94vh] flex flex-col justify-center pt-28 pb-14 overflow-hidden cyber-grid mask-radial-faded"
    >
      {/* Ambient background glows with warm coral and gold tints */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#F29559]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-16 right-10 w-[450px] h-[320px] bg-[#F2D492]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Animated Terminal-Style Prompt Widget */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex max-w-xl w-full mx-auto mb-6 p-3 rounded-2xl bg-[#283845]/95 border border-[#B8B08D]/30 text-left font-mono text-xs shadow-2xl shadow-black/40 backdrop-blur-xl group hover:border-[#F29559]/60 transition-colors"
        >
          <div className="w-full">
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#202C39] text-[11px] text-[#B8B08D]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F29559] inline-block shadow-sm shadow-[#F29559]/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F2D492] inline-block shadow-sm shadow-[#F2D492]/50" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#B8B08D] inline-block shadow-sm shadow-[#B8B08D]/50" />
                <span className="ml-2 font-mono text-[#B8B08D]">devops@abdelrahman-terminal: ~</span>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-[#F2D492] px-2 py-0.5 rounded bg-[#202C39] border border-[#B8B08D]/30">
                ACTIVE REPL
              </span>
            </div>

            {/* Terminal Command Line */}
            <div className="space-y-1.5 overflow-hidden">
              <div className="flex items-center gap-2 text-[#F29559]">
                <span className="text-[#F2D492] font-bold">$</span>
                <span className="text-[#F6F4EE]">{typedText}</span>
                <span className="w-2 h-4 bg-[#F29559] animate-pulse inline-block" />
              </div>

              {/* Output Result */}
              <div className="min-h-[20px] text-[11px]">
                {showOutput ? (
                  <motion.div 
                    initial={{ opacity: 0, x: -5 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    className={`truncate font-mono ${terminalScenarios[scenarioIndex].statusColor}`}
                  >
                    ↳ {terminalScenarios[scenarioIndex].out}
                  </motion.div>
                ) : (
                  <div className="text-[#B8B08D]/60 text-[10px] select-none">Executing automated query...</div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Availability Status Badge with Pulsing Warm Gold Beacon */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#283845]/90 border border-[#F2D492]/40 text-[#F6F4EE] text-xs font-mono shadow-lg shadow-black/30 backdrop-blur-md hover:border-[#F2D492] transition-colors">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2D492] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F2D492]"></span>
            </span>
            <span className="text-[#F2D492] font-semibold tracking-wide">Available for Work</span>
            <span className="text-[#B8B08D]">•</span>
            <span className="text-[#F6F4EE]/90">Software & DevOps Engineer</span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-[#F6F4EE] leading-[1.08] mb-4"
        >
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-[#F29559] via-[#F2D492] to-[#F6F4EE] bg-clip-text text-transparent">
            {personal.name.split(' ')[0]} {personal.name.split(' ')[1]}
          </span>
        </motion.h1>

        {/* Rotating Roles Tagline */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="h-12 flex items-center justify-center mb-5"
        >
          <div className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-mono text-slate-900 dark:text-[#F6F4EE]">
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#F29559]" />
            <span className="font-semibold text-slate-900 dark:text-[#F6F4EE] tracking-tight">
              {personal.rotatingTitles[roleIndex]}
            </span>
            <span className="w-2.5 h-6 bg-[#F29559] animate-pulse inline-block ml-1" />
          </div>
        </motion.div>

        {/* Subheadline Summary */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-[#B8B08D] leading-relaxed mb-9 font-normal"
        >
          {personal.subheadline}
        </motion.p>

        {/* Primary CTAs with Warm Palette */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mb-11"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F29559] to-[#F2D492] text-[#202C39] font-bold text-sm hover:from-[#F5A775] hover:to-[#FBE2AB] transition-all duration-200 shadow-lg shadow-[#F29559]/25 hover:shadow-[#F29559]/40 hover:-translate-y-0.5 active:translate-y-0"
            id="hero-view-projects-btn"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4 text-[#202C39] group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href={personal.cvPath}
            download="Abdelrahman_Mohamed_CV.pdf"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#283845] text-[#F6F4EE] font-semibold text-sm border border-[#B8B08D]/40 hover:border-[#F29559] hover:text-[#F29559] transition-all duration-200 shadow-md shadow-black/20 hover:-translate-y-0.5 active:translate-y-0"
            id="hero-download-cv-btn"
          >
            <FileDown className="w-4 h-4 text-[#F29559]" />
            <span>Download CV (PDF)</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#202C39] text-[#F2D492] font-semibold text-sm border border-[#B8B08D]/30 hover:bg-[#283845] hover:border-[#F2D492] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            id="hero-contact-btn"
          >
            <Mail className="w-4 h-4 text-[#F29559]" />
            <span>Get in Touch</span>
          </a>
        </motion.div>

        {/* Location & Social Links Badge Ribbon */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap items-center justify-center gap-6 pt-5 border-t border-slate-200 dark:border-[#B8B08D]/20 text-xs font-mono text-slate-500 dark:text-[#B8B08D]"
        >
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-[#F6F4EE]">
            <MapPin className="w-3.5 h-3.5 text-[#F29559]" />
            <span>{personal.location}</span>
          </div>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#B8B08D]/40">•</div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F29559] transition-colors"
            id="hero-github-link"
          >
            <Github className="w-4 h-4" />
            <span>GitHub</span>
          </a>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#B8B08D]/40">•</div>

          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#F29559] transition-colors"
            id="hero-linkedin-link"
          >
            <Linkedin className="w-4 h-4" />
            <span>LinkedIn</span>
          </a>

          <div className="hidden sm:inline-block text-slate-400 dark:text-[#B8B08D]/40">•</div>

          <a
            href={`mailto:${personal.email}`}
            className="flex items-center gap-1.5 hover:text-[#F29559] transition-colors"
            id="hero-email-link"
          >
            <Mail className="w-4 h-4" />
            <span>{personal.email}</span>
          </a>
        </motion.div>

        {/* Stat Counters Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/25 backdrop-blur-md hover:border-[#F29559]/50 transition-colors shadow-sm group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F29559] group-hover:scale-105 transition-transform">7+</span>
              <Server className="w-4 h-4 text-[#F29559]/70" />
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE]">Production Projects</div>
            <div className="text-[10px] text-[#B8B08D] font-mono">Microservices & AI</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/25 backdrop-blur-md hover:border-[#F2D492]/50 transition-colors shadow-sm group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F2D492] group-hover:scale-105 transition-transform">100%</span>
              <Cloud className="w-4 h-4 text-[#F2D492]/70" />
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE]">Cloud-Native IaC</div>
            <div className="text-[10px] text-[#B8B08D] font-mono">K8s, Terraform, CI/CD</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/25 backdrop-blur-md hover:border-[#F29559]/50 transition-colors shadow-sm group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F29559] group-hover:scale-105 transition-transform">15+</span>
              <Layers className="w-4 h-4 text-[#F29559]/70" />
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE]">Services & APIs</div>
            <div className="text-[10px] text-[#B8B08D] font-mono">Spring Boot, FastAPI</div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#283845]/90 border border-slate-200 dark:border-[#B8B08D]/25 backdrop-blur-md hover:border-[#F2D492]/50 transition-colors shadow-sm group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#F2D492] group-hover:scale-105 transition-transform">99.9%</span>
              <Activity className="w-4 h-4 text-[#F2D492]/70" />
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-[#F6F4EE]">Deep Observability</div>
            <div className="text-[10px] text-[#B8B08D] font-mono">Prometheus, OTel, Loki</div>
          </div>
        </motion.div>

      </div>

      {/* Tech-Stack Infinite Marquee Ribbon */}
      <div className="mt-14 w-full overflow-hidden border-y border-slate-200 dark:border-[#B8B08D]/20 py-3.5 bg-slate-100/50 dark:bg-[#1B2530]/90 backdrop-blur-sm marquee-mask group">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] space-x-6 items-center">
          {marqueeTech.concat(marqueeTech).map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-[#F6F4EE] px-3.5 py-1.5 rounded-lg bg-white/80 dark:bg-[#283845]/80 border border-slate-300/80 dark:border-[#B8B08D]/30 shrink-0 hover:border-[#F29559]/60 transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F29559] shadow-sm shadow-[#F29559]" />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
