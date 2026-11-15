import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("homepage has no serious or critical automated accessibility violations", async ({
  page,
}) => {
  test.setTimeout(120_000);
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/");
    const results = await new AxeBuilder({ page }).analyze();

    const severeViolations = results.violations.filter(
      ({ impact }) => impact === "serious" || impact === "critical",
    );
    expect(severeViolations, `${colorScheme} theme`).toEqual([]);
  }
});

test("case-study structure has no serious or critical automated violations", async ({
  page,
}) => {
  await page.goto("/projects/flowchart-to-code-converter");
  const results = await new AxeBuilder({ page }).analyze();

  const severeViolations = results.violations.filter(
    ({ impact }) => impact === "serious" || impact === "critical",
  );
  expect(severeViolations).toEqual([]);
});
