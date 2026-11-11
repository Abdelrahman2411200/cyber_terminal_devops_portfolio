"use client";
import { useState } from "react";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { portfolioContent, Project } from "@/data/content";
import { ProjectModal } from "./ProjectModal";
import { ProjectVisual } from "./ProjectVisual";
import { SectionBackground } from "./SectionBackground";

const categories = ["All", "Full-Stack", "Backend", "DevOps", "AI"] as const;
export function FeaturedProjects() {
  const [category, setCategory] = useState<string>("All");
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const projects = portfolioContent.featuredProjects.filter(
    (project) => category === "All" || project.category === category,
  );
  const visible =
    showAll || category !== "All" ? projects : projects.slice(0, 4);
  return (
    <section id="projects" className="section-space work-section">
      <SectionBackground effect="contours" />
      <div className="section-shell">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Selected work</span>
            <h2>
              Built to do
              <br />
              something useful.
            </h2>
          </div>
          <p>
            A few projects where I’ve worked through real engineering problems,
            from application logic to deployment.
          </p>
        </div>
        <div className="project-toolbar">
          <div
            className="project-filters"
            role="group"
            aria-label="Filter projects"
          >
            {categories.map((item) => (
              <button
                key={item}
                id={`filter-tab-${item.toLowerCase()}`}
                aria-pressed={category === item}
                onClick={() => {
                  setCategory(item);
                  setShowAll(false);
                }}
              >
                {item === "All"
                  ? "All work"
                  : item === "Full-Stack"
                    ? "Full stack"
                    : item}
              </button>
            ))}
          </div>
          <span className="project-count">{projects.length} projects</span>
        </div>
        <div className="projects-grid">
          {visible.map((project) => (
            <article className="project-card" key={project.id}>
              <button
                className="project-preview-button"
                aria-label={`Read about ${project.title}`}
                onClick={() => setSelected(project)}
              >
                <ProjectVisual project={project} />
                <span className="preview-open" aria-hidden="true">
                  <ArrowUpRight size={21} />
                </span>
              </button>
              <div className="project-card-content">
                <div className="project-meta">
                  <span>
                    {project.category === "Full-Stack"
                      ? "Full stack engineering"
                      : project.category === "AI"
                        ? "AI & automation"
                        : `${project.category} engineering`}
                  </span>
                  <span>{project.techStack.slice(0, 2).join(" / ")}</span>
                </div>
                <h3>
                  <button onClick={() => setSelected(project)}>
                    {project.title.replace(" (DevOps Lead)", "")}
                  </button>
                </h3>
                <p>{project.summary}</p>
                <div className="project-card-bottom">
                  <button
                    className="text-link"
                    id={`view-details-${project.id}`}
                    onClick={() => setSelected(project)}
                  >
                    Explore project <ArrowUpRight size={16} />
                  </button>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source on GitHub`}
                      className="project-source"
                    >
                      <Github size={16} />
                      <span>Source code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        {category === "All" && (
          <div className="more-projects">
            <button
              className="button button-secondary"
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
            >
              {showAll
                ? "Show selected projects"
                : `See all ${projects.length} projects`}
              <ArrowDown size={16} className={showAll ? "rotate-180" : ""} />
            </button>
            <p>Architecture notes and source code included.</p>
          </div>
        )}
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
