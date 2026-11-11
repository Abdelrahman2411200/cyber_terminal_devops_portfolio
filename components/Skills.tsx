import { portfolioContent } from "@/data/content";
import { SectionBackground } from "./SectionBackground";
export function Skills() {
  return (
    <section id="skills" className="section-space section-shell">
      <SectionBackground effect="circuit" />
      <div className="section-heading">
        <div>
          <span className="section-kicker">My toolkit</span>
          <h2>
            The right tools.
            <br />A solid foundation.
          </h2>
        </div>
        <p>
          What I reach for across application development, infrastructure, and
          everything in between.
        </p>
      </div>
      <div className="skills-list">
        {portfolioContent.skills.map((category) => (
          <div className="skill-row" key={category.category}>
            <h3>{category.category}</h3>
            <div>
              {category.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
