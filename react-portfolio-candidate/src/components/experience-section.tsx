import { additionalExperience, education, experience } from "@/data/profile";

export function ExperienceSection() {
  return (
    <div className="timeline-columns">
      <div>
        <h3>Professional experience</h3>
        {experience.map((item) => (
          <article
            className="timeline-item"
            key={`${item.period}-${item.role}`}
          >
            <p className="timeline-period">{item.period}</p>
            <h4>{item.role}</h4>
            <p className="timeline-meta">{item.organization}</p>
            <p>{item.summary}</p>
            {"technologies" in item ? (
              <ul className="tag-list" aria-label="Technologies used">
                {item.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
      <div>
        <h3>Education</h3>
        {education.map((item) => (
          <article
            className="timeline-item"
            key={`${item.period}-${item.qualification}`}
          >
            <p className="timeline-period">{item.period}</p>
            <h4>{item.qualification}</h4>
            <p className="timeline-meta">{item.institution}</p>
            {"level" in item ? (
              <p className="timeline-level">{item.level}</p>
            ) : null}
            <p>{item.summary}</p>
            {"subjects" in item ? (
              <ul className="tag-list" aria-label="Core subjects">
                {item.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
      <div className="additional-experience">
        <header>
          <h3>Additional work experience</h3>
          <p>
            Customer service, hospitality, logistics, and team-based work
            alongside my technical path.
          </p>
        </header>
        <div className="additional-experience-grid">
          {additionalExperience.map((item) => (
            <article key={`${item.period}-${item.role}-${item.organization}`}>
              <p className="timeline-period">{item.period}</p>
              <h4>{item.role}</h4>
              <p className="timeline-meta">{item.organization}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
