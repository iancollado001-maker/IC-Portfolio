import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/lib/site-config";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ian L. Collado | Software Developer Portfolio",
  description:
    "Portfolio of Ian L. Collado, a Computer Science graduate and software developer specializing in web development, software development, and IT solutions.",
  keywords: [
    "Ian Collado",
    "Software Developer",
    "Computer Science",
    "Web Developer",
    "Philippines Developer Portfolio",
  ],
  authors: [{ name: personal.name }],
  openGraph: {
    title: "Ian L. Collado | Software Developer Portfolio",
    description:
      "Portfolio of Ian L. Collado, a Computer Science graduate and software developer specializing in web development, software development, and IT solutions.",
    url: siteUrl,
    siteName: "Ian L. Collado Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ian L. Collado | Software Developer Portfolio",
    description:
      "Portfolio of Ian L. Collado, a Computer Science graduate and software developer specializing in web development, software development, and IT solutions.",
  },
  icons: {
    icon: "/favicon.ico",
  },
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
