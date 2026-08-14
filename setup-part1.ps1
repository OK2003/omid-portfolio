New-Item -ItemType Directory -Force -Path "src\types","src\constants","src\data","content\blog","content\projects","public\images","public\icons" | Out-Null

@'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
'@ | Set-Content -Path "tsconfig.json" -Encoding utf8

@'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
'@ | Set-Content -Path "next.config.ts" -Encoding utf8

@'
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};

export default config;
'@ | Set-Content -Path "tailwind.config.ts" -Encoding utf8

@'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
'@ | Set-Content -Path "postcss.config.js" -Encoding utf8

@'
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn"
  }
}
'@ | Set-Content -Path ".eslintrc.json" -Encoding utf8

Write-Host "Config files done" -ForegroundColor Green

@'
export type ProjectCategory =
  | "Petroleum Engineering"
  | "Software Development"
  | "AI Systems"
  | "Data Analysis";

export type ProjectStatus = "completed" | "in-progress" | "planned";

export interface Project {
  slug: string;
  name: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string;
  docsUrl?: string;
  imageUrl?: string;
  featured: boolean;
}
'@ | Set-Content -Path "src\types\project.ts" -Encoding utf8

@'
export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTimeMinutes: number;
  coverImageUrl?: string;
}

export interface ArticleFrontmatter {
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  coverImageUrl?: string;
  readingTimeMinutes?: number;
}
'@ | Set-Content -Path "src\types\article.ts" -Encoding utf8

@'
export type SkillDomain =
  | "Drilling Engineering"
  | "Well Hydraulics"
  | "Reservoir Engineering"
  | "Production Engineering"
  | "Artificial Intelligence"
  | "Software Development";

export interface Skill {
  id: string;
  name: string;
  domain: SkillDomain;
  proficiency: number;
  icon?: string;
}
'@ | Set-Content -Path "src\types\skill.ts" -Encoding utf8

@'
export type ExperienceType = "education" | "work" | "project";

export interface Experience {
  id: string;
  type: ExperienceType;
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description: string;
  highlights?: string[];
}
'@ | Set-Content -Path "src\types\experience.ts" -Encoding utf8

@'
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  errors?: ContactFormErrors;
}
'@ | Set-Content -Path "src\types\contact.ts" -Encoding utf8

@'
export interface ImageMetadata {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataUrl?: string;
}

export type ImagePriority = "high" | "low" | "auto";
'@ | Set-Content -Path "src\types\image.ts" -Encoding utf8

Write-Host "Types done" -ForegroundColor Green

@'
export const SITE_CONFIG = {
  name: "Omid Reza KeyShams",
  title: "Omid Reza KeyShams | Petroleum & Software Engineer",
  description:
    "Petroleum engineer, software developer, and AI engineering systems designer. Building reliable engineering software for drilling operations and beyond.",
  url: "https://omidkeyshams.dev",
  ogImage: "/images/og-image.png",
  links: {
    github: "https://github.com/omidkeyshams",
    linkedin: "https://linkedin.com/in/omidkeyshams",
    telegram: "https://t.me/omidkeyshams",
    email: "contact@omidkeyshams.dev",
  },
  roles: [
    "Petroleum Engineer",
    "Software Developer",
    "AI Engineering Systems Designer",
  ],
} as const;
'@ | Set-Content -Path "src\constants\site.ts" -Encoding utf8

@'
export const ROUTES = {
  home: "/",
  about: "/about",
  projects: "/projects",
  blog: "/blog",
  resume: "/resume",
  contact: "/contact",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: ROUTES.home },
  { label: "About", href: ROUTES.about },
  { label: "Projects", href: ROUTES.projects },
  { label: "Blog", href: ROUTES.blog },
  { label: "Resume", href: ROUTES.resume },
  { label: "Contact", href: ROUTES.contact },
] as const;
'@ | Set-Content -Path "src\constants\routes.ts" -Encoding utf8

@'
import type { ImageMetadata } from "@/types/image";

export const IMAGES = {
  avatar: {
    src: "/images/avatar.jpg",
    alt: "Portrait of Omid Reza KeyShams",
    width: 192,
    height: 192,
  },
  ogDefault: {
    src: "/images/og-image.png",
    alt: "Omid Reza KeyShams - Petroleum Engineer & Software Developer",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageMetadata>;
'@ | Set-Content -Path "src\constants\images.ts" -Encoding utf8

Write-Host "Constants done" -ForegroundColor Green

@'
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "edi-drilling-engineering",
    name: "EDi",
    description:
      "Desktop drilling engineering application with hydraulics, rheology, and well planning modules.",
    longDescription:
      "EDi is a drilling engineering desktop application designed to compete with industry-standard tools. It provides hydraulics calculations across multiple rheology models, circulating pressure analysis, and well planning utilities for petroleum engineers.",
    technologies: ["C#", ".NET", "WPF", "Hydraulics Modeling"],
    category: "Petroleum Engineering",
    status: "in-progress",
    featured: true,
  },
  {
    slug: "engineering-portfolio",
    name: "Engineering Portfolio Platform",
    description:
      "Personal portfolio platform built with Next.js 15, showcasing projects, articles, and resume.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    category: "Software Development",
    status: "in-progress",
    githubUrl: "https://github.com/omidkeyshams/portfolio",
    featured: true,
  },
  {
    slug: "hydraulics-ai-assistant",
    name: "Hydraulics AI Assistant",
    description:
      "AI-assisted tool for hydraulics calculations, rheology model selection, and well control guidance.",
    technologies: ["Python", "LLM Integration"],
    category: "AI Systems",
    status: "planned",
    featured: false,
  },
];
'@ | Set-Content -Path "src\data\projects.ts" -Encoding utf8

@'
import type { Article } from "@/types/article";

export const articles: Article[] = [
  {
    slug: "understanding-drilling-hydraulics",
    title: "Understanding Drilling Hydraulics",
    excerpt:
      "A practical introduction to hydraulics fundamentals in drilling operations, covering pressure losses and flow regimes.",
    content: "",
    category: "Drilling Hydraulics",
    tags: ["hydraulics", "drilling", "fundamentals"],
    publishedAt: "2026-01-15",
    readingTimeMinutes: 8,
  },
  {
    slug: "well-control-fundamentals",
    title: "Well Control Fundamentals",
    excerpt:
      "Key concepts in well control, including kick detection and shut-in procedures.",
    content: "",
    category: "Well Control",
    tags: ["well control", "safety"],
    publishedAt: "2026-02-02",
    readingTimeMinutes: 6,
  },
  {
    slug: "python-tools-for-engineers",
    title: "Python Tools for Engineers",
    excerpt:
      "Building practical Python utilities for everyday petroleum engineering calculations.",
    content: "",
    category: "Python Engineering Tools",
    tags: ["python", "tools", "automation"],
    publishedAt: "2026-03-10",
    readingTimeMinutes: 5,
  },
  {
    slug: "ai-for-oil-and-gas",
    title: "AI Applications in Oil & Gas",
    excerpt:
      "Exploring where AI and machine learning are creating value across upstream operations.",
    content: "",
    category: "AI for Oil & Gas",
    tags: ["ai", "machine learning", "oil and gas"],
    publishedAt: "2026-04-01",
    readingTimeMinutes: 7,
  },
];
'@ | Set-Content -Path "src\data\articles.ts" -Encoding utf8

@'
import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    id: "exp-put",
    type: "education",
    title: "B.Sc. Petroleum Engineering",
    organization: "University of Technology of Iran (PUT)",
    location: "Iran",
    startDate: "2022",
    description:
      "Undergraduate studies in petroleum engineering with focus on drilling and well operations.",
  },
  {
    id: "exp-edi",
    type: "project",
    title: "EDi - Drilling Engineering Application",
    organization: "Independent Project",
    startDate: "2025",
    description:
      "Designing and developing a competitive drilling engineering desktop application, including hydraulics and well planning modules.",
    highlights: [
      "Hydraulics module with multiple rheology models",
      "UI/UX redesign across multiple iterations",
      "Competitive positioning against industry tools",
    ],
  },
];

export function getExperiencesByType(type: Experience["type"]): Experience[] {
  return experiences.filter((experience) => experience.type === type);
}
'@ | Set-Content -Path "src\data\experience.ts" -Encoding utf8

@'
import type { Skill } from "@/types/skill";

export const skills: Skill[] = [
  { id: "skill-hydraulics", name: "Well Hydraulics", domain: "Well Hydraulics", proficiency: 85 },
  { id: "skill-drilling", name: "Drilling Engineering", domain: "Drilling Engineering", proficiency: 85 },
  { id: "skill-reservoir", name: "Reservoir Engineering", domain: "Reservoir Engineering", proficiency: 65 },
  { id: "skill-production", name: "Production Engineering", domain: "Production Engineering", proficiency: 60 },
  { id: "skill-nextjs", name: "Next.js / TypeScript", domain: "Software Development", proficiency: 80 },
  { id: "skill-python", name: "Python", domain: "Software Development", proficiency: 75 },
  { id: "skill-ai", name: "AI Systems Design", domain: "Artificial Intelligence", proficiency: 70 },
];

export function getSkillsByDomain(domain: Skill["domain"]): Skill[] {
  return skills.filter((skill) => skill.domain === domain);
}
'@ | Set-Content -Path "src\data\skills.ts" -Encoding utf8

Write-Host "Data layer done" -ForegroundColor Green
Write-Host "PART 1 COMPLETE - run setup-part2.ps1 next" -ForegroundColor Cyan