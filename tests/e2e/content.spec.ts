import { expect, test, type Page } from "@playwright/test";
import {
  awards,
  developerProfile,
  education,
  nav,
  personal,
  projects,
  sectionIntros,
  skillCategories,
} from "@/lib/site-config";

// Guards the redesign: every piece of content in lib/site-config.ts must still reach the page.

const normalise = (s: string) => s.replace(/\s+/g, " ").trim();

async function pageText(page: Page) {
  return normalise((await page.locator("body").textContent()) ?? "");
}

test.describe("content preservation", () => {
  test.skip(({ isMobile }) => isMobile, "content is identical across viewports");

  test("personal, profile, skills, education and awards are all rendered", async ({ page }) => {
    await page.goto("/");
    const text = await pageText(page);

    const expected = [
      personal.name,
      personal.role,
      personal.tagline,
      personal.intro,
      personal.email,
      personal.githubUsername,
      ...Object.values(sectionIntros),
      ...Object.values(developerProfile),
      ...skillCategories.flatMap((c) => [c.title.toUpperCase(), ...c.skills]),
      ...education.flatMap((e) => [
        e.school,
        e.program,
        e.period,
        e.location,
        e.description ?? "",
        ...(e.highlights ?? []),
        ...(e.honors ?? []),
      ]),
      ...awards.flatMap((a) => [a.title, a.subtitle ?? "", a.detail ?? "", a.period ?? ""]),
      ...nav.map((n) => n.label),
    ].filter(Boolean);

    for (const value of expected) {
      expect(text, `missing: ${value}`).toContain(normalise(value));
    }
  });

  test("every link from the config is present", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.locator("a[href]").evaluateAll((els) =>
      els.map((el) => el.getAttribute("href"))
    );
    const expected = [
      personal.github,
      `mailto:${personal.email}`,
      personal.resumePath,
      ...nav.map((n) => n.href),
      ...(personal.linkedin ? [personal.linkedin] : []),
    ];
    for (const href of expected) expect(hrefs, `missing link: ${href}`).toContain(href);
  });

  test("every project's details, links and case study are reachable", async ({ page }) => {
    await page.goto("/#projects");
    const section = page.locator("#projects");

    for (const project of projects) {
      await section.getByRole("button", { name: new RegExp(project.title) }).first().click();
      await expect(section.getByRole("heading", { level: 3, name: project.title })).toBeVisible();

      const text = normalise((await section.textContent()) ?? "");
      for (const value of [project.badge.toUpperCase(), project.description, ...project.technologies, ...project.highlights]) {
        expect(text, `${project.slug} missing: ${value}`).toContain(normalise(value));
      }
      if (project.github) await expect(section.locator(`a[href="${project.github}"]`).first()).toBeVisible();
      if (project.liveUrl) await expect(section.locator(`a[href="${project.liveUrl}"]`).first()).toBeVisible();

      await section.getByRole("button", { name: /View Case Study|More Details/ }).click();
      const dialog = page.getByRole("dialog", { name: `${project.title} details` });
      await expect(dialog).toBeVisible();
      if (project.caseStudy) {
        const modalText = normalise((await dialog.textContent()) ?? "");
        const cs = project.caseStudy;
        for (const value of [cs.problem, cs.solution, cs.role, cs.recognition?.title ?? "", cs.recognition?.paperTitle ?? "", cs.recognition?.publication ?? ""].filter(Boolean)) {
          expect(modalText, `${project.slug} case study missing: ${value}`).toContain(normalise(value));
        }
      }
      await page.keyboard.press("Escape");
      await expect(dialog).toBeHidden();
    }
  });

  test("all images and the resume file load", async ({ page, request }) => {
    await page.goto("/");
    // Scroll through so lazy images are requested.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 50));
      }
    });
    // Images inside display:none containers (e.g. the mobile header avatar on desktop) are never fetched.
    const images = page.locator("img:visible");
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i += 1) {
      const img = images.nth(i);
      await img.evaluate((el) => el.scrollIntoView({ block: "center" }));
      await expect
        .poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), {
          message: `image ${await img.getAttribute("src")} failed to load`,
        })
        .toBe(true);
    }

    const resume = await request.get(personal.resumePath);
    expect(resume.status()).toBe(200);
    expect(resume.headers()["content-type"]).toContain("pdf");
  });
});
