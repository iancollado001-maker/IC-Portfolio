import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { DEVELOPER_ATTRIBUTION as dev } from "@/lib/attribution";
import { personal } from "@/lib/site-config";

const routes = ["/", "/this-page-does-not-exist"];

async function openNav(page: Page, isMobile: boolean) {
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    return page.getByRole("dialog", { name: "Site navigation" });
  }
  return page.locator("aside");
}

test.describe("developer attribution", () => {
  for (const route of routes) {
    test(`is visible with working links on ${route}`, async ({ page }) => {
      await page.goto(route);
      const footer = page.getByRole("contentinfo", { name: "Developer attribution" });
      await footer.scrollIntoViewIfNeeded();
      await expect(footer).toBeVisible();
      await expect(footer).toContainText(`${dev.name}, ${dev.phone}, ${dev.email}`);
      await expect(footer.locator(`a[href="tel:${dev.phone}"]`)).toBeVisible();
      await expect(footer.locator(`a[href="mailto:${dev.email}"]`)).toBeVisible();

      // Not overlapped by the fixed sidebar or anything else.
      const box = await footer.boundingBox();
      expect(box).not.toBeNull();
      const center = { x: box!.x + box!.width / 2, y: box!.y + box!.height / 2 };
      const topElementInFooter = await page.evaluate(
        ({ x, y }) => !!document.elementFromPoint(x, y)?.closest('footer[aria-label="Developer attribution"]'),
        center
      );
      expect(topElementInFooter).toBe(true);
    });
  }
});

test.describe("navigation", () => {
  test("sidebar links jump to each section and mark it current", async ({ page, isMobile }) => {
    await page.goto("/");
    for (const label of ["About", "Skills", "Projects", "Education", "Certifications", "Contact"]) {
      const navRegion = await openNav(page, isMobile);
      await navRegion.getByRole("link", { name: label, exact: true }).click();
      const id = label.toLowerCase();
      await expect(page).toHaveURL(new RegExp(`#${id}$`));
      await expect(page.locator(`#${id}`)).toBeInViewport();
      if (isMobile) {
        await expect(page.getByRole("dialog", { name: "Site navigation" })).toBeHidden();
      } else {
        await expect(
          page.locator("aside").getByRole("link", { name: label, exact: true })
        ).toHaveAttribute("aria-current", "location");
      }
    }
  });

  test("mobile drawer closes on Escape and returns focus", async ({ page, isMobile }) => {
    test.skip(!isMobile, "drawer is mobile-only");
    await page.goto("/");
    const drawer = await openNav(page, true);
    await expect(drawer).toBeVisible();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  });

  test("Get in touch goes to the contact section", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
  });
});

test.describe("projects", () => {
  test("carousel buttons, arrow keys and modal work", async ({ page }) => {
    await page.goto("/#projects");
    const section = page.locator("#projects");
    const title = section.getByRole("heading", { level: 3 });
    const first = await title.textContent();

    await section.getByRole("button", { name: "Next project" }).click();
    await expect(title).not.toHaveText(first ?? "");
    await section.getByRole("button", { name: "Previous project" }).click();
    await expect(title).toHaveText(first ?? "");

    await page.keyboard.press("ArrowRight");
    await expect(title).not.toHaveText(first ?? "");

    await section.getByRole("button", { name: /View Case Study|More Details/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Close", exact: true }).click();
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

test.describe("theme", () => {
  test("toggle switches to dark mode and persists across reloads", async ({ page, isMobile }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const navRegion = await openNav(page, isMobile);
    await navRegion.getByRole("button", { name: "Switch to dark mode" }).click();
    await expect(page.locator("html")).toHaveClass(/dark/);
    await page.reload();
    await expect(page.locator("html")).toHaveClass(/dark/);
  });
});

test.describe("contact form", () => {
  async function fill(page: Page) {
    await page.goto("/#contact");
    await page.getByLabel("NAME", { exact: true }).fill("Ada Lovelace");
    await page.getByLabel("EMAIL", { exact: true }).fill("ada@example.com");
    await page.getByLabel("MESSAGE", { exact: true }).fill("Hello from the test suite");
  }

  test("shows success and clears the form when the message is delivered", async ({ page }) => {
    let body: Record<string, string> | null = null;
    await page.route("**/api/contact", async (route) => {
      body = route.request().postDataJSON();
      await route.fulfill({ status: 200, json: { ok: true } });
    });
    await fill(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    await expect(page.getByText("Message sent.")).toBeVisible();
    await expect(page.getByLabel("NAME", { exact: true })).toHaveValue("");
    expect(body).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com", company: "" });
  });

  test("shows the server's message and a fallback email when sending isn't configured", async ({ page }) => {
    // Hits the real route; the test server runs without RESEND_API_KEY.
    await fill(page);
    await page.getByRole("button", { name: "Send Message" }).click();
    const alert = page.locator("#contact").getByRole("alert");
    await expect(alert).toContainText("can't send messages right now");
    await expect(alert).toContainText(personal.email);
    await expect(page.getByLabel("MESSAGE", { exact: true })).toHaveValue("Hello from the test suite");
  });

  test("browser validation blocks an empty submit", async ({ page }) => {
    let called = false;
    await page.route("**/api/contact", (route) => {
      called = true;
      return route.fulfill({ status: 200, json: { ok: true } });
    });
    await page.goto("/#contact");
    await page.getByRole("button", { name: "Send Message" }).click();
    expect(called).toBe(false);
  });
});

test.describe("layout and quality", () => {
  for (const width of [320, 768, 1280]) {
    test(`no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth
      );
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  for (const scheme of ["light", "dark"] as const) {
    for (const route of routes) {
      test(`no serious accessibility violations on ${route} (${scheme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
        await page.goto(route);
        // Let entrance animations settle so contrast is measured at full opacity.
        await page.waitForTimeout(800);
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
        const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
        expect(
          serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 5).join(", ")}`)
        ).toEqual([]);
      });
    }
  }

  test("home page loads without console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(errors).toEqual([]);
  });
});
