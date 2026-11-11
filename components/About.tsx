import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { portfolioContent } from "@/data/content";
import { SectionBackground } from "./SectionBackground";
export function About() {
  const { personal } = portfolioContent;
  return (
    <section id="about" className="section-space about-section">
      <SectionBackground effect="constellation" />
      <div className="section-shell about-layout">
        <div>
          <span className="section-kicker">A little about me</span>
          <h2>
            I like knowing
            <br />
            how it all connects.
          </h2>
          <div className="about-signature">
            Abdelrahman<span>.</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="large-copy">
            The part of engineering I enjoy most is following an idea all the
            way through: from a useful interface to the services, data, and
            infrastructure behind it.
          </p>
          <p>
            I’m Abdelrahman, a software and DevOps engineer based in Egypt. I
            work with Java, Python, and TypeScript, building backend services
            and finding practical ways to deploy and understand them.
          </p>
          <p>
            My projects have taken me from event-driven payments and banking
            systems to Kubernetes infrastructure. Along the way, I’ve learned to
            care as much about clear documentation and useful monitoring as the
            code itself.
          </p>
          <div className="about-details">
            <div>
              <GraduationCap size={20} />
              <span>
                <strong>{personal.education.degree}</strong>
                <span>
                  {personal.education.institution} · Class of{" "}
                  {personal.education.graduationYear}
                </span>
              </span>
            </div>
            <div>
              <MapPin size={20} />
              <span>
                <strong>{personal.location}</strong>
                <span>Open to junior software and DevOps roles</span>
              </span>
            </div>
          </div>
          <a href={personal.cvPath} download className="text-link">
            More about my background <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
