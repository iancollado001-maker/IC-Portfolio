# Ian L. Collado — Developer Portfolio

A modern, futuristic, black-and-white developer portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Ready to deploy on Vercel.

## Tech stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion for animation
- lucide-react for icons
- A Vercel serverless API route for the contact form (no external credentials required)

## Getting started

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Editing content

All personal info, skills, projects, education, awards, and nav links live in one file:

```
lib/site-config.ts
```

Edit that file to update anything on the site — no need to touch components. The hero's availability
status is controlled by `availability.isAvailable` in the same file.

Add your resume PDF at:

```
public/resume/Ian-Collado-Resume.pdf
```

## Contact form

`app/api/contact/route.ts` is a Vercel-compatible serverless function. It works out of the box
(it validates and logs submissions), and includes a drop-in point to wire up a real email provider
such as Resend or Formspree — add your API key as a Vercel environment variable and update the route.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to https://vercel.com, click "New Project", and import the repository.
3. Vercel auto-detects Next.js — no configuration needed. Click "Deploy".
4. Every push to the main branch redeploys automatically.

## Project structure

```
app/            routes, layout, global styles, API routes
components/     reusable UI components (Navbar, Hero, Projects showcase, etc.)
lib/            site-config.ts — all editable content
public/         static assets (images, resume PDF)
```
