import { Plus } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { SectionBackground } from "./SectionBackground";
export function AcademicProjects() {
  return (
    <section
      id="academic"
      className="section-space section-shell academic-section"
    >
      <SectionBackground effect="orbits" />
      <div className="section-heading">
        <div>
          <span className="section-kicker">Where it started</span>
          <h2>Learning by building.</h2>
        </div>
        <p>
          Coursework and experiments that shaped how I approach engineering
          today.
        </p>
      </div>
      <div className="academic-list">
        {portfolioContent.academicProjects.map((project) => (
          <details key={project.id}>
            <summary>
              <span>
                <small>{project.category}</small>
                <strong>{project.title}</strong>
              </span>
              <Plus size={21} />
            </summary>
            <div className="academic-description">
              <p>{project.description}</p>
              <p className="academic-takeaway">{project.keyTakeaway}</p>
              <div className="tech-tags">
                {project.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
