// Ambient declaration for CSS side-effect imports (e.g. "./globals.css").
// Without this, TypeScript language servers report ts(2882) for the import
// in layout.tsx. Next.js compiles the stylesheet itself at build time.
declare module "*.css";
