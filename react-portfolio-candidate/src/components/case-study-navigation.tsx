import Link from "next/link";
import { getCaseStudyNavigation } from "@/lib/routes";

export function CaseStudyNavigation({ slug }: { slug: string }) {
  const { previous, next } = getCaseStudyNavigation(slug);

  return (
    <nav className="case-navigation" aria-label="Featured case studies">
      <Link href={`/projects/${previous.slug}`}>
        <span>Previous case study</span>
        <strong>← {previous.title}</strong>
      </Link>
      <Link href={`/projects/${next.slug}`}>
        <span>Next case study</span>
        <strong>{next.title} →</strong>
      </Link>
    </nav>
  );
}
