// Single source of truth for all portfolio content.
// Edit this file to update personal info, skills, projects, education, awards, etc.

export const personal = {
  name: "Ian L. Collado",
  role: "Software Developer",
  tagline: "Computer Science Graduate • Software Developer • IT Support",
  location: "Midsayap, Cotabato, Philippines",
  email: "iancollado76@gmail.com",
  github: "https://github.com/iancollado001-maker",
  githubUsername: "iancollado001-maker",
  linkedin: "", // add LinkedIn URL when available — leave blank to hide
  resumePath: "/resume/Ian-Collado-Resume.pdf",
  intro:
    "Computer Science graduate with practical experience developing and deploying web, desktop, and mobile applications, with a strong interest in software development and building solutions that address real-world needs.",
};

// Edit this one flag to change the hero availability indicator.
export const availability = {
  isAvailable: true,
  label: "AVAILABLE FOR OPPORTUNITIES",
  unavailableLabel: "NOT CURRENTLY AVAILABLE",
};

export const developerProfile = {
  name: "Ian L. Collado",
  degree: "Bachelor of Science in Computer Science",
  location: "Midsayap, Cotabato, Philippines",
  focus: "Software Development",
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Web",
    skills: ["JavaScript", "HTML", "CSS", "PHP", "SQL", "C#", "Python"],
  },
  {
    title: "Frameworks & Platforms",
    skills: ["ASP.NET Core", "Laravel", "Xamarin"],
  },
  {
    title: "Tools",
    skills: ["GitHub", "Microsoft Visual Studio", "VS Code"],
  },
  {
    title: "Additional Skills",
    skills: [
      "Microsoft Word",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Microsoft Visio",
      "Hardware Troubleshooting",
      "Software Troubleshooting",
      "Network Troubleshooting",
      "OS Installation",
    ],
  },
];

export type CaseStudy = {
  problem: string;
  solution: string;
  role: string;
  recognition?: {
    title: string;
    paperTitle: string;
    publication: string;
  };
};

export type Project = {
  slug: string;
  title: string;
  badge: string;
  featured?: boolean;
  technologies: string[];
  github: string;
  description: string;
  highlights: string[];
  image?: string;
  imageAlt?: string;
  imageHover?: string;
  imageHoverAlt?: string;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: "gradetrack",
    title: "GradeTrack",
    badge: "Thesis Project",
    featured: true,
    technologies: [
      "PHP",
      "MySQL",
      "JavaScript",
      "CSS",
      "Logistic Regression",
      "PDF Export",
    ],
    github: "https://github.com/iancollado001-maker/GradeTrack",
    image: "/projects/gradetrack.png",
    imageAlt:
      "GradeTrack dashboard showing total predictions, graduation likelihood metrics, and charts",
    imageHover: "/projects/gradetrack-bulk.png",
    imageHoverAlt:
      "GradeTrack bulk prediction page with Excel and CSV template downloads",
    description:
      "A web-based academic prediction tool built with PHP and MySQL that uses logistic regression to forecast student graduation likelihood based on pre-admission data such as SHS GPA, strand, and sex. Includes PDF export for generated reports and was developed as part of a thesis project focused on predictive analytics in education.",
    highlights: [
      "Predictive analytics",
      "Logistic regression modeling",
      "Graduation likelihood forecasting",
      "Academic pre-admission data",
      "PDF report generation",
    ],
    caseStudy: {
      problem:
        "College programs need an early, data-informed signal for graduation likelihood, but decisions are typically made without a structured way to weigh pre-admission information such as SHS GPA, strand, and sex.",
      solution:
        "GradeTrack is a web-based PHP and MySQL application that applies a logistic regression model to pre-admission student data, producing a graduation-likelihood prediction and an exportable PDF report for each case.",
      role:
        "Ian was the developer and main author of this thesis project, responsible for building the prediction model integration, the PHP/MySQL web application, and the PDF export functionality.",
      recognition: {
        title: "Certificate of Recognition — Main Author",
        paperTitle:
          "Gradetrack: A Logistic Regression-Based Model for Forecasting College Graduation Likelihood in the CITE Programs",
        publication:
          "San Eugenio Multidisciplinary Journal, Vol. 4, No. 1, NDMC, August 2026",
      },
    },
  },
  {
    slug: "ibex-ims",
    title: "IBEX IMS",
    badge: "On-the-Job Training Project",
    technologies: ["PHP", "Laravel 13", "Tailwind CSS 4", "SQLite"],
    github: "https://github.com/iancollado001-maker/IBEX-IMS",
    image: "/projects/ibex-ims.png",
    imageAlt: "IBEX IMS login screen for the inventory management system",
    imageHover: "/projects/ibex-ims-dashboard.png",
    imageHoverAlt:
      "IBEX IMS inventory dashboard with asset list and monthly summary",
    description:
      "A system developed to track deployed tools and monitor damaged items, improving inventory management accuracy.",
    highlights: [
      "Asset tracking",
      "Inventory management",
      "Tool monitoring",
      "Damaged-item monitoring",
      "User-friendly interfaces",
    ],
  },
];

export type EducationItem = {
  school: string;
  program: string;
  period: string;
  location: string;
  description?: string;
  highlights?: string[];
  honors?: string[];
};

export const education: EducationItem[] = [
  {
    school: "Notre Dame of Midsayap College",
    program: "Bachelor of Science in Computer Science",
    period: "A.Y. 2025–2026",
    location: "Midsayap, Cotabato",
    description:
      "Graduated program in computer science, with hands-on application of development skills through a research-based thesis project in predictive analytics.",
    highlights: [
      "Thesis: GradeTrack — a logistic regression-based model for forecasting college graduation likelihood in the CITE programs",
      "Developed applications across web, desktop, and mobile platforms using PHP, C#, and .NET technologies",
      "Applied data analysis and modeling to real-world academic data",
    ],
    honors: [
      "Certificate of Recognition (Main Author) — San Eugenio Multidisciplinary Journal, Vol. 4, No. 1, August 2026",
      "Dean's Lister — A.Y. 2022–2025",
    ],
  },
  {
    school: "Villaria High School",
    program: "Accountancy and Business Management (ABM) Strand",
    period: "A.Y. 2021–2022",
    location: "Midsayap, Cotabato",
    description:
      "Senior high school program centered on business fundamentals, including accounting, management, and economics.",
    highlights: [
      "ABM strand curriculum covering accounting, business management, and applied economics",
    ],
    honors: ["Class Valedictorian — A.Y. 2021–2022"],
  },
];

export type Award = {
  title: string;
  subtitle?: string;
  period?: string;
  detail?: string;
};

export const awards: Award[] = [
  {
    title: "Certificate of Recognition — Main Author",
    subtitle:
      "\u201CGradetrack: A Logistic Regression-Based Model for Forecasting College Graduation Likelihood in the CITE Programs\u201D",
    detail: "San Eugenio Multidisciplinary Journal, Vol. 4, No. 1 — NDMC, August 2026",
  },
  {
    title: "Class Valedictorian",
    period: "A.Y. 2021–2022",
  },
  {
    title: "Dean's Lister",
    period: "A.Y. 2022–2025",
  },
];

export const nav = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Education", href: "/#education" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Contact", href: "/#contact" },
];
