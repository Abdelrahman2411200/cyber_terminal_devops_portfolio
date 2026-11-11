import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  MapPin,
} from "lucide-react";
import { portfolioContent } from "@/data/content";
import { SystemSketch } from "./SystemSketch";
import { SectionBackground } from "./SectionBackground";

export function Hero() {
  const { personal } = portfolioContent;
  return (
    <section id="hero" className="hero section-shell">
      <SectionBackground effect="network" />
      <div className="hero-main">
        <div className="hero-copy">
          <div className="personal-intro">
            <span className="avatar-mark" aria-hidden="true">
              am.
            </span>
            <p>
              Hi, I’m Abdelrahman.
              <br />
              <span>Software & DevOps Engineer</span>
            </p>
          </div>
          <h1>
            Good software.
            <br />
            From the
            <br className="desktop-break" /> inside out.
          </h1>
          <p className="hero-description">
            I build the services behind the screen and the infrastructure that
            keeps them running. Thoughtful code, reliable systems, and care for
            the details.
          </p>
          <div className="hero-actions">
            <a
              href="#projects"
              className="button button-primary"
              id="hero-view-projects-btn"
            >
              See my work <ArrowDown size={17} />
            </a>
            <a
              href={personal.cvPath}
              download="Abdelrahman_Mohamed_CV.pdf"
              className="text-link"
              id="hero-download-cv-btn"
            >
              Download Resume <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-socials">
            <span>
              <MapPin size={14} /> Based in Giza, Egypt
            </span>
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abdelrahman on GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abdelrahman on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="sketch-caption">
            <span className="tiny-cross" aria-hidden="true">
              +
            </span>{" "}
            The way I like to build
          </div>
          <div className="hero-blueprint">
            <div className="blueprint-top">
              <span>
                From the first request
                <br />
                to the last detail.
              </span>
              <span className="blueprint-symbol" aria-hidden="true">
                ↗
              </span>
            </div>
            <SystemSketch />
            <div className="blueprint-bottom">
              <span>Design. Build. Deploy. Understand.</span>
              <span aria-hidden="true">✳</span>
            </div>
          </div>
          <a href="#architecture" className="sketch-note">
            <span className="note-line" aria-hidden="true" />
            <span>
              A closer look at my
              <br />
              <strong>Event Management Platform</strong>
            </span>
            <ArrowUpRight size={20} />
          </a>
        </div>
      </div>
      <div className="hero-foot">
        <span className="availability">
          <span className="status-dot" /> Open to software & DevOps
          opportunities
        </span>
        <span className="hero-foot-note">
          A selection of things I’ve built <ArrowDown size={15} />
        </span>
      </div>
    </section>
  );
}
