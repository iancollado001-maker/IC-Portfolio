# Build Log

## 2026-09-26 — Dashboard redesign, email delivery, test setup

### Built
- Reference-style layout: fixed left sidebar with profile photo, socials, theme toggle, scroll-spy nav and resume (mobile/tablet: top bar + slide-in drawer); large headline hero with "Get in touch"; scrolling "Tools I work with" strip; overview card grid (Projects, About, Skills, Certifications, Education, Contact + terminal); every full section restyled as a rounded panel with an orange icon tile.
- All content from `lib/site-config.ts` preserved; inline intro copy moved (unchanged) into `sectionIntros`. Profile photo added at `public/images/profile.jpg`.
- Contact form now sends email via Resend (see ADR-002), with honeypot, rate limit, origin check, size cap, and a standard error envelope.
- `app/not-found.tsx`, `app/error.tsx`, skip-to-content link.
- Fixed pre-existing a11y issue: invalid `<dl>` structure in About; duplicate `contentinfo` landmarks.
- `next.config.mjs`: pinned `outputFileTracingRoot` (a stray lockfile in the home folder made Next infer the wrong root).

### Verification
- typecheck ✅ lint ✅ unit 32/32 ✅ build ✅ e2e 39 passed / 5 skipped (desktop-only or mobile-only cases) ✅

### Known limitations
- Email delivery needs `RESEND_API_KEY` in the deployment (Resend integration). Until then the form shows a "can't send right now, email directly" message.
- The in-memory rate limiter is per server instance (best effort on serverless).
- `npm audit`: 1 high (PostCSS bundled inside `next@15`; fix requires the Next 16 major upgrade) and 1 moderate. Not addressed here.
- E2E runs on Chromium only.
