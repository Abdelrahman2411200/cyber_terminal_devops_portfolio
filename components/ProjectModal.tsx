'use client';

import React, { useEffect } from 'react';
import { Project } from '@/data/content';
import { X, ExternalLink, Github, CheckCircle2, Layers, Terminal } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#14213D] border border-slate-200 dark:border-[#FCA311]/30 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-700 dark:text-white hover:text-[#FCA311] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FCA311]"
          aria-label="Close project modal"
          id="close-project-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-[#FCA311]/15 text-[#FCA311] border border-[#FCA311]/30">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-white/10 text-white border border-white/20">
              Featured Flagship
            </span>
          )}
        </div>

        {/* Title & Summary */}
        <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {project.title}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-[#E5E5E5] mb-6 font-medium leading-relaxed">
          {project.summary}
        </p>

        {/* Detailed Description */}
        <div className="mb-6 p-4 rounded-xl bg-[#E5E5E5]/50 dark:bg-[#0B132B]/80 border border-slate-300 dark:border-[#14213D] text-sm text-slate-800 dark:text-[#E5E5E5] leading-relaxed">
          {project.description}
        </div>

        {/* Architecture Summary if available */}
        {project.architectureSummary && (
          <div className="mb-6 p-4 rounded-xl bg-[#FCA311]/10 border border-[#FCA311]/30">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#FCA311] uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Architecture & Topology</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-[#E5E5E5] leading-relaxed">
              {project.architectureSummary}
            </p>
          </div>
        )}

        {/* Key Engineering Highlights */}
        <div className="mb-6">
          <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#FCA311]" />
            <span>Key Engineering Highlights</span>
          </h3>
          <div className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-[#E5E5E5] leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#FCA311] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-8">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 dark:text-[#E5E5E5] mb-2">
            Technologies & Tools
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5] border border-slate-300 dark:border-[#14213D]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-200 dark:border-[#14213D] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white text-xs font-semibold hover:bg-slate-900 border border-[#14213D] transition-colors"
                id="modal-github-link"
              >
                <Github className="w-4 h-4 text-[#FCA311]" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FCA311] text-black text-xs font-bold hover:bg-[#FFB74D] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-700 dark:text-[#E5E5E5] text-xs font-medium hover:bg-slate-300 dark:hover:bg-[#14213D] transition-colors"
          >
            Close Dialog
          </button>
        </div>

      </div>
    </div>
  );
}
