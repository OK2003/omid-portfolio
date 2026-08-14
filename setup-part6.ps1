New-Item -ItemType Directory -Force -Path "src\app\api\contact","src\app\about","src\app\projects","src\app\blog\[slug]","src\app\resume","src\app\contact" | Out-Null

@'
import { Inter, JetBrains_Mono } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
'@ | Set-Content -Path "src\app\fonts.ts" -Encoding utf8

@'
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { fontSans, fontMono } from "@/app/fonts";
import {
  buildMetadata,
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  toJsonLdScript,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = buildPersonJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <html
      lang="en"
      className={`dark ${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLdScript(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
'@ | Set-Content -Path "src\app\layout.tsx" -Encoding utf8

@'
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --border: 214 32% 91%;
  --card: 0 0% 100%;
  --card-foreground: 222 47% 11%;
  --accent: 217 91% 60%;
  --accent-foreground: 0 0% 100%;
}

.dark {
  --background: 222 47% 7%;
  --foreground: 210 40% 98%;
  --primary: 217 91% 60%;
  --primary-foreground: 0 0% 100%;
  --muted: 217 33% 14%;
  --muted-foreground: 215 20% 65%;
  --border: 217 33% 18%;
  --card: 222 47% 9%;
  --card-foreground: 210 40% 98%;
  --accent: 217 91% 60%;
  --accent-foreground: 0 0% 100%;
}

* {
  border-color: hsl(var(--border));
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

:focus-visible {
  outline: 2px solid hsl(var(--primary));
  outline-offset: 2px;
}
'@ | Set-Content -Path "src\app\globals.css" -Encoding utf8

Write-Host "Root layout done" -ForegroundColor Green

$existingGlobals = Get-Content "src\app\globals.css" -Raw
$tailwindDirectives = "@tailwind base;`n@tailwind components;`n@tailwind utilities;`n`n"
Set-Content -Path "src\app\globals.css" -Value ($tailwindDirectives + $existingGlobals) -Encoding utf8

@'
import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
    </>
  );
}
'@ | Set-Content -Path "src\app\page.tsx" -Encoding utf8

@'
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Petroleum engineering student and software developer focused on drilling engineering tools and AI systems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <SkillsSection />
      <TimelineSection />
    </>
  );
}
'@ | Set-Content -Path "src\app\about\page.tsx" -Encoding utf8

@'
import { getAllProjects } from "@/lib/content/project-loader";
import { ProjectsGridSection } from "@/components/sections/ProjectsGridSection";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Software and petroleum engineering projects, including the EDi drilling engineering application.",
  path: "/projects",
});

export default function ProjectsPage() {
  return <ProjectsGridSection projects={getAllProjects()} />;
}
'@ | Set-Content -Path "src\app\projects\page.tsx" -Encoding utf8

Write-Host "Home, about, projects pages done" -ForegroundColor Green

@'
import { getAllArticles } from "@/lib/content/article-loader";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Articles on drilling hydraulics, well control, engineering tools, and AI for oil and gas.",
  path: "/blog",
});

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
'@ | Set-Content -Path "src\app\blog\page.tsx" -Encoding utf8

@'
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getAllArticleSlugs,
} from "@/lib/content/article-loader";
import { buildMetadata, buildBlogPostingJsonLd, toJsonLdScript } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) return buildMetadata({ title: "Article not found" });

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    type: "article",
  });
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const blogPostingJsonLd = buildBlogPostingJsonLd(article);

  return (
    <article className="mx-auto max-w-2xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLdScript(blogPostingJsonLd) }}
      />
      <p className="text-sm text-muted-foreground">
        {formatDate(article.publishedAt)} . {article.readingTimeMinutes} min
        read
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {article.title}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground md:text-base">
        {article.excerpt}
      </p>
      <div className="mt-8 text-sm leading-7">
        {article.content || "Full article content coming soon."}
      </div>
    </article>
  );
}
'@ | Set-Content -Path "src\app\blog\[slug]\page.tsx" -Encoding utf8

Write-Host "Blog pages done" -ForegroundColor Green

@'
import { experiences } from "@/data/experience";
import { skills } from "@/data/skills";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Education, experience, and skills summary.",
  path: "/resume",
});

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Resume</h1>
        <Button asChild>
          <a href="/resume.pdf" download>
            Download PDF
          </a>
        </Button>
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">
        Experience
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {experiences.map((experience) => (
          <div key={experience.id}>
            <p className="text-sm font-medium">{experience.title}</p>
            <p className="text-sm text-muted-foreground">
              {experience.organization} . {experience.startDate}
              {experience.endDate ? `-${experience.endDate}` : " - Present"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {experience.description}
            </p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Skills</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id}>{skill.name}</Badge>
        ))}
      </div>
    </section>
  );
}
'@ | Set-Content -Path "src\app\resume\page.tsx" -Encoding utf8

@'
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE_CONFIG } from "@/constants/site";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Send a message using the form below, or reach out directly via{" "}
        <a
          href={`mailto:${SITE_CONFIG.links.email}`}
          className="underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          email
        </a>
        .
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </section>
  );
}
'@ | Set-Content -Path "src\app\contact\page.tsx" -Encoding utf8

Write-Host "Resume and contact pages done" -ForegroundColor Green

@'
import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { processContactSubmission } from "@/services/contact.service";
import { checkRateLimit, getClientIdentifier } from "@/lib/rate-limit";
import type { ContactApiResponse, ContactFormErrors } from "@/types/contact";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const identifier = getClientIdentifier(request.headers);
  const rateLimit = checkRateLimit(identifier, {
    limit: 5,
    windowMs: 60000,
  });

  if (!rateLimit.allowed) {
    const response: ContactApiResponse = {
      success: false,
      message: "Too many requests. Please try again in a minute.",
    };
    return NextResponse.json(response, {
      status: 429,
      headers: {
        "Retry-After": Math.ceil(
          (rateLimit.resetAt - Date.now()) / 1000
        ).toString(),
      },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const response: ContactApiResponse = {
      success: false,
      message: "Invalid request body.",
    };
    return NextResponse.json(response, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    const errors: ContactFormErrors = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormErrors | undefined;
      if (field && !errors[field]) {
        errors[field] = issue.message;
      }
    }

    const response: ContactApiResponse = {
      success: false,
      message: "Please correct the highlighted fields.",
      errors,
    };
    return NextResponse.json(response, { status: 422 });
  }

  try {
    const result = await processContactSubmission(parsed.data);
    const response: ContactApiResponse = {
      success: result.success,
      message: result.message,
    };
    return NextResponse.json(response, {
      status: result.success ? 200 : 502,
    });
  } catch (error) {
    console.error("[api/contact] unexpected error", error);
    const response: ContactApiResponse = {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
'@ | Set-Content -Path "src\app\api\contact\route.ts" -Encoding utf8

Write-Host "Contact API route done" -ForegroundColor Green

@'
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";
import { getAllArticles } from "@/lib/content/article-loader";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/projects",
    "/blog",
    "/resume",
    "/contact",
  ].map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = getAllArticles().map(
    (article) => ({
      url: `${SITE_CONFIG.url}/blog/${article.slug}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly",
      priority: 0.5,
    })
  );

  return [...staticRoutes, ...articleRoutes];
}
'@ | Set-Content -Path "src\app\sitemap.ts" -Encoding utf8

@'
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
'@ | Set-Content -Path "src\app\robots.ts" -Encoding utf8

@'
import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0d1117",
    theme_color: "#0d1117",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
'@ | Set-Content -Path "src\app\manifest.webmanifest.ts" -Encoding utf8

Write-Host "Sitemap, robots, manifest done" -ForegroundColor Green
Write-Host "PART 6 COMPLETE - run: npm run dev" -ForegroundColor Cyan