import { expect, test, type Page } from "@playwright/test";

const runtimeErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  runtimeErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400 && response.url().includes("/_next/")) {
      errors.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto("/");
});

test.afterEach(async ({ page }) => {
  expect(
    runtimeErrors.get(page),
    "No hydration errors or failed JavaScript chunks",
  ).toEqual([]);
});

test("loads interactive JavaScript without errors and always stays dark", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.evaluate(() => localStorage.setItem("theme", "light"));
  await page.emulateMedia({ colorScheme: "light" });
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(page.locator("html")).toHaveCSS("color-scheme", "dark");
  await expect(page.locator("#theme-toggle-button")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "AI", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "AI", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  expect(errors).toEqual([]);
  expect(await page.content()).not.toMatch(/twsela|توصيلة/i);
});

test("navigation and the primary landing action reach the correct sections", async ({
  page,
}, testInfo) => {
  await page.getByRole("link", { name: "See my work", exact: true }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects h2")).toBeInViewport();
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await page
      .locator("#mobile-navigation")
      .getByRole("link", { name: "Contact", exact: true })
      .click();
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
  } else {
    await page.getByRole("link", { name: "Let’s talk", exact: true }).click();
  }
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact h2")).toBeInViewport();
  await page.getByRole("link", { name: "Back to top", exact: true }).click();
  await expect(page.locator("#hero h1")).toBeInViewport();
});

test("filters, expands and collapses the six remaining projects", async ({
  page,
}) => {
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "See all 6 projects" }).click();
  await expect(page.locator(".project-card")).toHaveCount(6);
  await page.getByRole("button", { name: "Show selected projects" }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
  await page.getByRole("button", { name: "Backend", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText(
    "CN Banking Transaction System",
  );
  await page.getByRole("button", { name: "DevOps", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "Full stack", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByRole("button", { name: "All work", exact: true }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
});

test("opens case studies from all three entry points and closes them reliably", async ({
  page,
}) => {
  const card = page.locator(".project-card").first();
  const dialog = page.getByRole("dialog", {
    name: "Event Management Platform",
    exact: true,
  });
  await card
    .getByRole("button", { name: "Read about Event Management Platform" })
    .click();
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "View source code" }),
  ).toHaveAttribute("href", /event-management-platform$/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await card
    .getByRole("button", { name: "Event Management Platform", exact: true })
    .click();
  await expect(dialog).toBeVisible();
  await dialog
    .getByRole("button", { name: "Close project", exact: true })
    .click();
  await expect(dialog).not.toBeVisible();
  const explore = card.getByRole("button", { name: "Explore project" });
  await explore.click();
  await expect(dialog).toBeVisible();
  await page.mouse.click(5, 5);
  await expect(dialog).not.toBeVisible();
  await expect(explore).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("search works by mouse and keyboard and follows the selected result", async ({
  page,
}) => {
  await page
    .getByRole("button", { name: "Search portfolio (Ctrl+K)", exact: true })
    .click();
  const search = page.getByRole("dialog", {
    name: "Search portfolio",
    exact: true,
  });
  await expect(search).toBeVisible();
  const input = page.getByRole("textbox", { name: "Find a page or link" });
  await expect(input).toBeFocused();
  await input.fill("contact");
  await input.press("ArrowDown");
  await expect(
    search.getByRole("link", { name: "Contact", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(search).not.toBeVisible();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact h2")).toBeInViewport();
  await page.keyboard.press("Control+k");
  await expect(search).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(search).not.toBeVisible();
  await page.getByRole("button", { name: "Search portfolio (Ctrl+K)" }).click();
  await input.fill("no-such-section");
  await expect(search.getByText("No matches.", { exact: false })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(search).not.toBeVisible();
});

test("architecture buttons select a node and can start and stop a request walkthrough", async ({
  page,
}) => {
  const node = page.getByRole("button", {
    name: /Apache Kafka Message Broker/,
  });
  await node.click();
  await expect(node).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".node-details h3")).toHaveText(
    "Apache Kafka Message Broker",
  );
  await page
    .getByRole("button", { name: "Follow a request", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Stop walkthrough" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".node-details h3")).toHaveText(
    "Spring Cloud API Gateway",
  );
  await expect(page.locator(".node-details h3")).toHaveText(
    "Event & Venue Service",
    { timeout: 5000 },
  );
  await page.getByRole("button", { name: "Stop walkthrough" }).click();
  await expect(
    page.getByRole("button", { name: "Follow a request" }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("academic details open and close", async ({ page }) => {
  const details = page.locator(".academic-list details").first();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(details.locator(".academic-description")).toBeVisible();
  await details.locator("summary").click();
  await expect(details).not.toHaveAttribute("open");
});

test("CV downloads a PDF and contact actions have valid destinations", async ({
  page,
  context,
}) => {
  const downloadEvent = page.waitForEvent("download");
  await page
    .getByRole("link", { name: "Download Resume", exact: true })
    .click();
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toMatch(/\.pdf$/i);
  expect(await download.failure()).toBeNull();
  const cv = await context.request.get(
    (await page.locator("#hero-download-cv-btn").getAttribute("href")) || "",
  );
  expect(cv.ok()).toBeTruthy();
  expect((await cv.body()).subarray(0, 4).toString()).toBe("%PDF");
  await expect(page.locator("#contact-email-btn")).toHaveAttribute(
    "href",
    "mailto:abdulrahmanmohamed256@gmail.com",
  );
  await expect(page.locator(".contact-socials a").first()).toHaveAttribute(
    "href",
    "https://github.com/Abdelrahman2411200",
  );
});

test("copy email reports success and writes the correct address", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page
    .getByRole("button", { name: "Copy email address", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "abdulrahmanmohamed256@gmail.com",
  );
});

test("copy email still works when a preview denies Clipboard API access", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new DOMException(
        "Clipboard access denied by preview",
        "NotAllowedError",
      );
    };
  });
  await page
    .getByRole("button", { name: "Copy email address", exact: true })
    .click();
  await expect(page.getByRole("status")).toHaveText("Email copied");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "abdulrahmanmohamed256@gmail.com",
  );
});

test("background is animated, cannot intercept clicks, and respects reduced motion", async ({
  page,
}) => {
  await expect(page.locator(".ambient-background")).toHaveCSS(
    "pointer-events",
    "none",
  );
  await expect(page.locator(".ambient-light-violet")).toHaveCSS(
    "animation-name",
    "ambient-violet",
  );
  expect(
    await page
      .locator(".ambient-light-violet")
      .evaluate((element) => element.getAnimations().length),
  ).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".ambient-light-violet")).toHaveCSS(
    "animation-name",
    "none",
  );
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
});
