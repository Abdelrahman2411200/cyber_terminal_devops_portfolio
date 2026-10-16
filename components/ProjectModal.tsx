'use client';

import React, { useEffect } from 'react';
import { Project } from '@/data/content';
import { X, ExternalLink, Github, CheckCircle2, Layers, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

  return (
    <AnimatePresence>
      {project && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0D1527] border border-cyan-500/30 rounded-3xl shadow-2xl shadow-cyan-950/70 p-6 sm:p-8 text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header Row */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-800 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2 text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>architecture_spec://{project.id}.md</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                aria-label="Close project modal"
                id="close-project-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category & Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Featured Flagship
                </span>
              )}
            </div>

            {/* Title & Summary */}
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mb-6 font-normal leading-relaxed">
              {project.summary}
            </p>

            {/* Detailed Description */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#090D16] border border-slate-800 text-sm text-slate-300 leading-relaxed font-sans">
              {project.description}
            </div>

            {/* Architecture Summary */}
            {project.architectureSummary && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-cyan-500/5 border border-cyan-500/25">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Architecture & Topology</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.architectureSummary}
                </p>
              </div>
            )}

            {/* Key Engineering Highlights */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Key Engineering Highlights</span>
              </h3>
              <div className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#131F37] text-slate-300 border border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold hover:bg-cyan-500/25 transition-colors"
                    id="modal-github-link"
                  >
                    <Github className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-semibold hover:bg-emerald-500/25 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-mono hover:bg-slate-700 transition-colors"
              >
                Close
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
