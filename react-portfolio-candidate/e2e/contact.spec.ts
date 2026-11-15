import { expect, test } from "@playwright/test";

async function fillContact(page: import("@playwright/test").Page) {
  await page.getByLabel("Name").fill("Preview Tester");
  await page.getByLabel("Email").fill("preview@example.com");
  await page.getByLabel("Enquiry type").selectOption("employment");
  await page
    .getByLabel("Message")
    .fill("This is an intercepted preview verification message.");
}

test("contact validation focuses the first invalid field", async ({ page }) => {
  await page.goto("/#contact");
  await page.getByRole("button", { name: "Send enquiry" }).click();

  await expect(page.getByLabel("Name")).toBeFocused();
  await expect(page.getByLabel("Name")).toHaveAttribute("aria-invalid", "true");
});

test("contact success is verified with an intercepted Formspree request", async ({
  page,
}) => {
  await page.route("https://formspree.io/f/xovdzoqy", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/#contact");
  await fillContact(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();

  await expect(page.getByRole("status").last()).toContainText("Message sent");
  await expect(page.getByLabel("Name")).toHaveValue("");
});

test("contact failure preserves the draft and email fallback", async ({
  page,
}) => {
  await page.route("https://formspree.io/f/xovdzoqy", (route) =>
    route.fulfill({ status: 503, contentType: "application/json", body: "{}" }),
  );
  await page.goto("/#contact");
  await fillContact(page);
  await page.getByRole("button", { name: "Send enquiry" }).click();

  await expect(page.getByRole("status").last()).toContainText("could not send");
  await expect(page.getByLabel("Name")).toHaveValue("Preview Tester");
  await expect(
    page.getByRole("link", { name: "cluiz4003@outlook.pt" }),
  ).toBeVisible();
});
