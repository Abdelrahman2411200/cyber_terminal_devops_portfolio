"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Check, Github, X } from "lucide-react";
import { Project } from "@/data/content";

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    const element = dialog.current;
    element?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [project]);
  if (!project) return null;
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="modal-project-title"
      onCancel={() => close.current()}
      onClick={(event) => {
        if (event.target === event.currentTarget) close.current();
      }}
    >
      <div className="dialog-content">
        <div className="dialog-header">
          <span className="section-kicker">{project.category} engineering</span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close project"
            id="close-project-modal-btn"
            autoFocus
          >
            <X size={21} />
          </button>
        </div>
        <h2 id="modal-project-title">{project.title}</h2>
        <p className="dialog-description">{project.description}</p>
        <h3>What went into it</h3>
        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>
              <Check size={17} />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        {project.architectureSummary && (
          <div className="architecture-summary">
            <h3>How it fits together</h3>
            <p>{project.architectureSummary}</p>
          </div>
        )}
        <div className="tech-tags">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="dialog-actions">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              <Github size={17} />
              View source code <ArrowUpRight size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Open live project <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
