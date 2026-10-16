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
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#202C39] border border-[#B8B08D]/30 rounded-3xl shadow-2xl shadow-black/60 p-6 sm:p-8 text-[#F6F4EE]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Terminal Header Row */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#283845] text-xs font-mono text-[#B8B08D]">
              <div className="flex items-center gap-2 text-[#F29559]">
                <Terminal className="w-4 h-4" />
                <span>architecture_spec://{project.id}.md</span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-[#283845] hover:bg-[#324555] text-[#B8B08D] hover:text-[#F6F4EE] transition-colors"
                aria-label="Close project modal"
                id="close-project-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category & Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-[#F2D492]/15 text-[#F2D492] border border-[#F2D492]/30">
                  Featured Flagship
                </span>
              )}
            </div>

            {/* Title & Summary */}
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-[#F6F4EE] mb-2">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-[#F6F4EE]/90 mb-6 font-normal leading-relaxed">
              {project.summary}
            </p>

            {/* Detailed Description */}
            <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#17202B] border border-[#B8B08D]/20 text-sm text-[#F6F4EE]/90 leading-relaxed font-sans">
              {project.description}
            </div>

            {/* Architecture Summary */}
            {project.architectureSummary && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#F2D492]/10 border border-[#F2D492]/30">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#F2D492] uppercase tracking-wider mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Architecture & Topology</span>
                </div>
                <p className="text-xs sm:text-sm text-[#F6F4EE]/90 leading-relaxed">
                  {project.architectureSummary}
                </p>
              </div>
            )}

            {/* Key Engineering Highlights */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#F29559] mb-3 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#F29559]" />
                <span>Key Engineering Highlights</span>
              </h3>
              <div className="space-y-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F6F4EE]/90 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#F2D492] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-8">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#B8B08D] mb-2.5">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#283845] text-[#F6F4EE] border border-[#B8B08D]/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#283845] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30 text-xs font-mono font-semibold hover:bg-[#F29559]/25 transition-colors"
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
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F2D492]/15 text-[#F2D492] border border-[#F2D492]/30 text-xs font-mono font-semibold hover:bg-[#F2D492]/25 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-[#283845] text-[#B8B08D] text-xs font-mono hover:bg-[#324555] hover:text-[#F6F4EE] transition-colors"
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
