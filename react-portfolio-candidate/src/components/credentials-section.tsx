import {
  certifications,
  getVerificationUrl,
  learningProgress,
} from "@/data/credentials";

function VerificationLink({
  certificate,
}: {
  certificate: (typeof certifications)[number];
}) {
  return (
    <a
      className="credential-link"
      href={getVerificationUrl(certificate)}
      aria-label={`Verify ${certificate.title} on Coursera`}
      target="_blank"
      rel="noreferrer"
    >
      Verify on Coursera <span aria-hidden="true">↗</span>
    </a>
  );
}

export function CredentialsSection() {
  const featured = certifications.filter((certificate) => certificate.featured);
  const courses = certifications.filter((certificate) => !certificate.featured);

  return (
    <div className="credentials-stack">
      <div className="credential-grid">
        {featured.map((certificate) => (
          <article className="credential-card" key={certificate.id}>
            <p className="credential-kind">{certificate.kind}</p>
            <h3>{certificate.title}</h3>
            <p>
              {certificate.issuer} · {certificate.issued}
            </p>
            <VerificationLink certificate={certificate} />
          </article>
        ))}
      </div>

      <details className="disclosure-panel">
        <summary>
          View all {courses.length} completed course certificates
        </summary>
        <div className="certificate-list">
          {courses.map((certificate) => (
            <article key={certificate.id}>
              <div>
                <h3>{certificate.title}</h3>
                <p>
                  {certificate.issuer} · {certificate.issued}
                </p>
              </div>
              <VerificationLink certificate={certificate} />
            </article>
          ))}
        </div>
      </details>

      <details className="disclosure-panel learning-panel">
        <summary>Skills in progress ({learningProgress.length})</summary>
        <p className="learning-note">
          XP records learning-platform progress; it is not a proficiency score.
        </p>
        <div className="learning-grid">
          {learningProgress.map(([title, current, target]) => (
            <div className="learning-item" key={title}>
              <div>
                <h3>{title}</h3>
                <span>
                  {current} / {target} XP
                </span>
              </div>
              <progress
                value={current}
                max={target}
                aria-label={`${title}: ${current} of ${target} XP`}
              />
            </div>
          ))}
        </div>
      </details>
    </div>
  );
}
