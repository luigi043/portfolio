import { skills } from "@/data/profile";

export function SkillsSection() {
  return (
    <div className="skills-grid">
      {Object.entries(skills).map(([group, entries]) => (
        <section className="skill-group" key={group}>
          <p className="skill-index" aria-hidden="true">
            / {String(Object.keys(skills).indexOf(group) + 1).padStart(2, "0")}
          </p>
          <h3>{group}</h3>
          <ul>
            {entries.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
