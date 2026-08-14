import { SITE_CONFIG } from "@/constants/site";
import type { Article } from "@/types/article";
import type { Project } from "@/types/project";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Omid Reza KeyShams",
    alternateName: ["امیدرضا کی شمس", "Omid KeyShams", "کی شمس"],
    url: SITE_CONFIG.url,
    jobTitle: "Petroleum Engineer & Software Developer",
    description: SITE_CONFIG.description,
    image: `${SITE_CONFIG.url}/images/profile.jpg`,
    email: SITE_CONFIG.links.email,
    sameAs: [
      SITE_CONFIG.links.instagram,
      SITE_CONFIG.links.linkedin,
      SITE_CONFIG.links.telegram,
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Technology of Iran (PUT)",
    },
    knowsAbout: [
      "Petroleum Engineering",
      "Drilling Engineering",
      "Well Hydraulics",
      "Software Development",
      "AI Engineering Systems",
      "Python",
      "Next.js",
    ],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    alternateName: "Omid Reza KeyShams Portfolio",
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: ["en-US", "fa-IR"],
    author: {
      "@type": "Person",
      name: "Omid Reza KeyShams",
      url: SITE_CONFIG.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBlogPostingJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: "Omid Reza KeyShams",
      url: SITE_CONFIG.url,
      sameAs: [
        SITE_CONFIG.links.instagram,
        SITE_CONFIG.links.linkedin,
        SITE_CONFIG.links.telegram,
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Omid Reza KeyShams",
      url: SITE_CONFIG.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${article.slug}`,
    },
    ...(article.coverImageUrl ? { image: article.coverImageUrl } : {}),
    keywords: [
      "Omid Reza KeyShams",
      "KeyShams",
      ...article.tags,
    ].join(", "),
  };
}

export function buildCreativeWorkJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    creator: {
      "@type": "Person",
      name: "Omid Reza KeyShams",
      url: SITE_CONFIG.url,
      sameAs: [
        SITE_CONFIG.links.instagram,
        SITE_CONFIG.links.linkedin,
        SITE_CONFIG.links.telegram,
      ],
    },
    author: {
      "@type": "Person",
      name: "Omid Reza KeyShams",
    },
    keywords: project.technologies.join(", "),
    ...(project.githubUrl ? { url: project.githubUrl } : {}),
    ...(project.imageUrl ? { image: project.imageUrl } : {}),
  };
}

export function toJsonLdScript(data: object): string {
  return JSON.stringify(data);
}
