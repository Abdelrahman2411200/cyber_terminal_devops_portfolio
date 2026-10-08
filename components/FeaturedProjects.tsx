'use client';

import React, { useState } from 'react';
import { portfolioContent, Project } from '@/data/content';
import { ProjectModal } from './ProjectModal';
import { 
  Terminal, 
  Github, 
  ArrowUpRight, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

const categories = ['All', 'Backend', 'DevOps', 'Full-Stack', 'AI'] as const;
type Category = typeof categories[number];

export function FeaturedProjects() {
  const { featuredProjects } = portfolioContent;
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? featuredProjects
    : featuredProjects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCA311]/10 text-[#FCA311] font-mono text-xs mb-3 border border-[#FCA311]/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>03 // FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Production & Engineering Projects
          </h2>
          <p className="mt-3 text-slate-700 dark:text-[#E5E5E5] max-w-2xl text-sm sm:text-base">
            Microservices, autonomous AI pipelines, resilient logistics engines, and production Kubernetes deployments.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-white dark:bg-[#14213D]/80 border border-slate-300 dark:border-[#14213D] backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#FCA311] text-black font-bold shadow-sm shadow-[#FCA311]/30'
                    : 'text-slate-700 dark:text-[#E5E5E5] hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#1C2D5A]'
                }`}
                id={`filter-tab-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-[#14213D]/70 border border-slate-200 dark:border-[#14213D] hover:border-[#FCA311]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#FCA311]/5 group"
            >
              <div>
                {/* Card Top: Category & Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold bg-[#FCA311]/15 text-[#FCA311] border border-[#FCA311]/30">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-slate-800 dark:text-white font-semibold">
                      <Sparkles className="w-3 h-3 text-[#FCA311]" />
                      <span>Flagship</span>
                    </span>
                  )}
                </div>

                {/* Card Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#FCA311] transition-colors">
                  {project.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-700 dark:text-[#E5E5E5] leading-relaxed mb-4">
                  {project.summary}
                </p>

                {/* Highlights List */}
                <div className="space-y-2 mb-5">
                  {project.highlights.slice(0, 3).map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-[#E5E5E5] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FCA311] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.techStack.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5] border border-slate-300 dark:border-[#14213D]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FCA311]/15 text-[#FCA311]">
                      +{project.techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-[#14213D] flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FCA311] hover:underline transition-colors"
                  id={`view-details-${project.id}`}
                >
                  <span>System Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-[#E5E5E5] dark:bg-[#0B132B] text-slate-800 dark:text-[#E5E5E5] hover:text-[#FCA311] transition-colors"
                    aria-label={`View ${project.title} on GitHub`}
                    id={`github-link-${project.id}`}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal View */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
}
