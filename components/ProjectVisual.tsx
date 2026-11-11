import {
  ArrowRight,
  Box,
  Check,
  Cloud,
  GitBranch,
  Plane,
  ShieldCheck,
} from "lucide-react";
import { Project } from "@/data/content";
import { SystemSketch } from "./SystemSketch";

export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === "event-management-platform")
    return (
      <div className="project-visual visual-events">
        <span className="visual-label">Event-driven by design</span>
        <SystemSketch compact />
        <span className="visual-foot">
          Independent services. Connected experiences.
        </span>
      </div>
    );
  if (project.category === "AI")
    return (
      <div className="project-visual visual-ai">
        <span className="visual-label">An idea, with a plan</span>
        <div className="plan-preview">
          <div className="plan-prompt">
            <span className="plan-spark">✳</span>
            <span>Turn the idea into a roadmap</span>
          </div>
          <div className="plan-branches" />
          <div className="plan-columns">
            {[
              ["Define", "Requirements", "Dependencies"],
              ["Build", "Milestones", "Tasks"],
              ["Review", "Risks", "Approval"],
            ].map((column) => (
              <div key={column[0]}>
                <strong>{column[0]}</strong>
                {column.slice(1).map((item) => (
                  <span key={item}>
                    <span className="plan-check">
                      <Check size={10} />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <span className="visual-foot">
          A clear path, with a human in the loop.
        </span>
      </div>
    );
  if (project.category === "DevOps")
    return (
      <div className="project-visual visual-cloud">
        <span className="visual-label">
          {project.id.includes("aircraft")
            ? "Infrastructure for aviation"
            : "From commit to cloud"}
        </span>
        <div className="cloud-preview">
          <span className="cloud-emblem">
            {project.id.includes("aircraft") ? (
              <Plane size={34} strokeWidth={1.4} />
            ) : (
              <Cloud size={34} strokeWidth={1.4} />
            )}
          </span>
          <div className="deploy-pipeline">
            <span>
              <GitBranch size={19} />
              Commit
            </span>
            <ArrowRight size={15} />
            <span>
              <ShieldCheck size={19} />
              Verify
            </span>
            <ArrowRight size={15} />
            <span>
              <Box size={19} />
              Package
            </span>
            <ArrowRight size={15} />
            <span>
              <Cloud size={19} />
              Deploy
            </span>
          </div>
        </div>
        <span className="visual-foot">
          Reproducible infrastructure. Repeatable releases.
        </span>
      </div>
    );
  return (
    <div className="project-visual visual-backend">
      <span className="visual-label">
        {project.category === "Backend"
          ? "Every transaction accounted for"
          : "Useful software, thoughtfully connected"}
      </span>
      <div className="backend-preview">
        <div>
          <span>Application</span>
          <ArrowRight size={20} />
          <span>Service layer</span>
        </div>
        <div className="backend-connector" />
        <div>
          <span>Data</span>
          <span>Events</span>
          <span>Insights</span>
        </div>
      </div>
      <span className="visual-foot">
        Clear boundaries. Reliable foundations.
      </span>
    </div>
  );
}
