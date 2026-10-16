'use client';

import React, { useState } from 'react';
import { portfolioContent, Project } from '@/data/content';
import { ProjectModal } from './ProjectModal';
import { 
  Terminal, 
  Github, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ['All', 'Backend', 'DevOps', 'Full-Stack', 'AI'] as const;
type Category = typeof categories[number];

function ProjectCard({ 
  project, 
  index, 
  onOpenModal 
}: { 
  project: Project; 
  index: number; 
  onOpenModal: (p: Project) => void;
}) {
  const isFlagship = project.featured;
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#283845]/90 border transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl overflow-hidden ${
        isFlagship 
          ? 'border-slate-300 dark:border-[#F29559]/40 hover:border-[#F29559] shadow-xl shadow-black/20' 
          : 'border-slate-200 dark:border-[#B8B08D]/25 hover:border-[#B8B08D]/60'
      }`}
    >
      {/* Interactive Cursor Spotlight Glow in Warm Coral */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(242, 149, 89, 0.14), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Top Row: Category Tag & Flagship Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30">
            {project.category}
          </span>
          {isFlagship && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-gradient-to-r from-[#F29559]/20 to-[#F2D492]/20 text-[#F2D492] border border-[#F2D492]/40 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#F2D492]" />
              <span>Flagship</span>
            </span>
          )}
        </div>

        {/* Card Title */}
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F6F4EE] mb-2.5 group-hover:text-[#F29559] transition-colors">
          {project.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-[#F6F4EE]/80 leading-relaxed mb-5">
          {project.summary}
        </p>

        {/* Engineering Highlights */}
        <div className="space-y-2 mb-6">
          {project.highlights.slice(0, 3).map((hl, hIdx) => (
            <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-[#B8B08D] leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#F2D492] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{hl}</span>
            </div>
          ))}
        </div>

        {/* Tech Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 6).map((tech, tIdx) => (
            <span
              key={tIdx}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-[#202C39] text-slate-700 dark:text-[#F6F4EE]/90 border border-slate-200 dark:border-[#B8B08D]/25"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 6 && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-[#F29559]/15 text-[#F29559] border border-[#F29559]/30">
              +{project.techStack.length - 6} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="relative z-10 pt-4 border-t border-slate-100 dark:border-[#B8B08D]/20 flex items-center justify-between gap-3">
        <button
          onClick={() => onOpenModal(project)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-[#F29559] hover:text-[#F2D492] transition-colors group/btn"
          id={`view-details-${project.id}`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Architecture Spec</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>

        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#202C39] text-slate-700 dark:text-[#F6F4EE]/90 hover:text-[#F29559] hover:border-[#F29559]/50 border border-slate-200 dark:border-[#B8B08D]/30 transition-all text-xs font-mono shadow-sm"
              aria-label={`View ${project.title} on GitHub`}
              title="Open GitHub Repository"
              id={`github-link-${project.id}`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>Repo</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-[#F29559]/15 text-[#F29559] hover:bg-[#F29559]/25 border border-[#F29559]/30 transition-colors shadow-sm"
              aria-label={`View live demo of ${project.title}`}
              title="Open Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function FeaturedProjects() {
  const { featuredProjects } = portfolioContent;
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#F29559]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-14 text-center"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F29559]/10 text-[#F29559] font-mono text-xs mb-3 border border-[#F29559]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>Featured Engineering Work</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-[#F6F4EE]">
            Production & Engineering Projects
          </h2>
          <p className="mt-3 text-slate-600 dark:text-[#B8B08D] max-w-2xl text-sm sm:text-base">
            Microservices, autonomous AI pipelines, resilient logistics engines, and production Kubernetes deployments.
          </p>

          {/* Animated Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 rounded-2xl bg-slate-200/60 dark:bg-[#283845]/90 border border-slate-300/80 dark:border-[#B8B08D]/30 backdrop-blur-md">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-colors duration-200 ${
                    isSelected
                      ? 'text-[#202C39] font-bold'
                      : 'text-slate-600 dark:text-[#B8B08D] hover:text-black dark:hover:text-[#F6F4EE]'
                  }`}
                  id={`filter-tab-${cat.toLowerCase()}`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeFilterIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-[#F29559] to-[#F2D492] rounded-xl shadow-md shadow-[#F29559]/30"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={setActiveModalProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal View for Architecture Specs */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
