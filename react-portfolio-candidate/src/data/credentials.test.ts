import { describe, expect, it } from "vitest";

import {
  certifications,
  getVerificationUrl,
  learningProgress,
} from "@/data/credentials";

describe("credential data", () => {
  it("contains each verified certificate exactly once", () => {
    const ids = certifications.map((certificate) => certificate.id);

    expect(certifications).toHaveLength(17);
    expect(new Set(ids).size).toBe(ids.length);
    expect(
      certifications.filter((certificate) => certificate.featured),
    ).toHaveLength(3);
  });

  it("builds a unique Coursera verification URL for every certificate", () => {
    const urls = certifications.map(getVerificationUrl);

    expect(new Set(urls).size).toBe(urls.length);
    expect(
      urls.every((url) => url.startsWith("https://www.coursera.org/verify/")),
    ).toBe(true);
  });

  it("keeps all supplied XP records within their stated ranges", () => {
    expect(learningProgress).toHaveLength(68);

    for (const [, current, target] of learningProgress) {
      expect(current).toBeGreaterThan(0);
      expect(current).toBeLessThanOrEqual(target);
    }
  });
});
