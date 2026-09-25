import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/lib/site-config";
import PageTransition from "@/components/PageTransition";
import Sidebar from "@/components/Sidebar";
import BackgroundLines from "@/components/BackgroundLines";
import { DeveloperFooter } from "@/components/layout/developer-footer";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://ian-collado-portfolio.vercel.app";
const title = "Ian L. Collado | Software Developer Portfolio";
const description =
  "Portfolio of Ian L. Collado, a Computer Science graduate and software developer specializing in web development, software development, and IT solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Ian L. Collado",
  },
  description,
  keywords: [
    "Ian Collado",
    "Software Developer",
    "Computer Science",
    "Web Developer",
    "Philippines Developer Portfolio",
  ],
  authors: [{ name: personal.name, url: personal.github }],
  creator: personal.name,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Ian L. Collado Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f0ea" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1d" },
  ],
  colorScheme: "light dark",
};

// Inline script prevents a flash of the wrong theme on first paint.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    if (theme === "dark") document.documentElement.classList.add("dark");
  } catch (e) {}
})();
`;

// Structured data helps search engines and AI assistants surface this as a
// developer's personal/professional profile in rich results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personal.name,
  url: siteUrl,
  email: personal.email,
  jobTitle: personal.role,
  sameAs: [personal.github, ...(personal.linkedin ? [personal.linkedin] : [])],
  address: {
    "@type": "PostalAddress",
    addressLocality: personal.location,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
        >
          Skip to content
        </a>
        <BackgroundLines />
        <Sidebar />
        <div id="content" className="relative lg:pl-sidebar">
          <PageTransition>{children}</PageTransition>
          <DeveloperFooter />
        </div>
      </body>
    </html>
  );
}
