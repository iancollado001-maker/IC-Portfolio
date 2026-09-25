# Decisions

## ADR-001 — Dashboard redesign on the existing stack (2026-09-26)
- Context: Redesign to match a reference "portfolio dashboard" layout (left sidebar, big headline, tools strip, card grid) without losing any content or functionality.
- Decision: Keep Next.js 15 / Tailwind 3 / Framer Motion / lucide. Content stays in `lib/site-config.ts`; the home page gains an overview grid (`components/Overview.tsx`) whose cards summarise and link to the full sections, which keep all their detail.
- Sidebar (`components/Sidebar.tsx`) replaces `Navbar.tsx` and absorbs all of its features (nav, theme toggle, GitHub, resume, mobile menu). It is rendered in the root layout so every route, including 404, has it.
- Reference cards with no matching real content (Services, Testimonials, AI Builds, Showcase, FAQs) were intentionally left out.
- Palette: navy ink, warm off-white canvas, orange accent (`#ea580c` fills, `#c2410c` for accent text to keep 4.5:1). Display font switched to Plus Jakarta Sans.

## ADR-002 — Contact form delivery via Resend (2026-09-26)
- Context: The contact route only logged submissions.
- Decision: Send through Resend's REST API with `fetch` (no SDK dependency). Resend is the top "messaging" result on the Vercel Marketplace, and its integration provisions `RESEND_API_KEY`.
- Without the key the route returns `503 EMAIL_NOT_CONFIGURED` and the form tells the visitor to email directly, rather than pretending the message was sent.
- Controls: same-origin check, 16 KB body cap, per-IP rate limit (5 / 15 min, in-memory, best effort per instance), honeypot field, server-side validation shared limits with the form, HTML-escaped email body, CR/LF stripped from single-line fields.

## ADR-003 — Test setup (2026-09-26)
- Vitest (unit/route tests) and Playwright + axe-core (E2E, content-preservation, accessibility). Chromium only (desktop + Pixel 7 projects) to keep the install light; add Firefox/WebKit projects in `playwright.config.ts` if needed.
