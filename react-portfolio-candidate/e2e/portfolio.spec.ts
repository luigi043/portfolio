import { expect, test } from "@playwright/test";

const caseStudySlugs = [
  "vehicle-build-cost-calculator",
  "bmw-configurator",
  "flowchart-to-code-converter",
  "ctw-vehicle-fleet",
  "academic-portal",
  "bella-ops",
  "lang-interpreter",
  "taskflow",
] as const;

test("opens Sfera from the dedicated Android showcase", async ({ page }) => {
  await page.goto("/#android");
  const showcase = page.getByRole("region", { name: "Android Projects" });
  await expect(showcase.getByRole("article")).toHaveCount(11);
  const sfera = showcase.locator('[data-android-project="sferatagscanner"]');
  await expect(
    sfera.getByRole("link", { name: "Try interactive demo" }),
  ).toHaveCount(0);
  await sfera.getByRole("link", { name: "Read case study" }).click();
  await expect(
    page.getByRole("heading", { name: "Verification and demo scope" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View full screenshot" }),
  ).toBeVisible();
});

test("homepage is responsive, complete, and free of horizontal overflow", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Computer Engineer & Software Developer",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /cv|résumé|resume/i }),
  ).toHaveCount(0);
  await expect(
    page.getByText("Pilot scope · not production ready"),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Credentials & continued learning" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /verify google ux design/i }),
  ).toHaveAttribute(
    "href",
    "https://www.coursera.org/verify/professional-cert/4JB4IY80RAIT",
  );

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
});

test("content reflows at 320px and tolerates accessible text spacing", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");
  await page.addStyleTag({
    content: `
      * {
        letter-spacing: 0.12em !important;
        line-height: 1.5 !important;
        word-spacing: 0.16em !important;
      }
      p { margin-bottom: 2em !important; }
    `,
  });

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(
    page.getByRole("heading", {
      name: "Computer Engineer & Software Developer",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Send enquiry" }),
  ).toBeVisible();
});

test("credential disclosures expose certificates and honest learning progress", async ({
  page,
}) => {
  await page.goto("/#credentials");

  await page
    .getByText("View all 14 completed course certificates", { exact: true })
    .click();
  await expect(
    page.getByRole("link", {
      name: /verify frontend development using react/i,
    }),
  ).toBeVisible();

  await page.getByText("Skills in progress (68)", { exact: true }).click();
  await expect(page.getByText("767 / 1000 XP")).toBeVisible();
  await expect(
    page.getByText(/XP records learning-platform progress/i),
  ).toBeVisible();
});

test("keyboard navigation exposes focus and project controls work", async ({
  page,
  viewport,
}) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();

  if ((viewport?.width ?? 1440) <= 850) {
    const menu = page.locator('[aria-controls="mobile-menu"]');
    await menu.focus();
    await page.keyboard.press("Enter");
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toBeFocused();
  }

  await page.getByRole("button", { name: "Mobile" }).click();
  await expect(page.locator(".filter-status")).toHaveText("Showing 1 project");
  await expect(page.getByRole("heading", { name: "Vitalis" })).toBeVisible();

  await page.getByRole("button", { name: "All" }).click();
  const details = page.locator('[aria-controls="project-details-insurex"]');
  await details.click();
  await expect(details).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("region", { name: "Insurex details" }),
  ).toBeVisible();
});

test("system themes and reduced motion produce usable final states", async ({
  page,
}) => {
  await page.emulateMedia({
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  await page.goto("/");
  const lightBackground = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.reload();
  const darkBackground = await page
    .locator("body")
    .evaluate((element) => getComputedStyle(element).backgroundColor);

  expect(lightBackground).not.toBe(darkBackground);
  await expect(
    page.getByRole("img", { name: /application architecture/i }),
  ).toHaveAttribute("data-motion", "static");
});

for (const slug of caseStudySlugs) {
  test(`renders the complete ${slug} case study`, async ({ page }) => {
    await page.goto(`/projects/${slug}`);
    await expect(page.getByRole("heading", { name: "Problem" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Constraints" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Architecture" }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Verified result" }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Featured case studies" }),
    ).toBeVisible();
  });
}
