New-Item -ItemType Directory -Force -Path "src\lib\content","src\lib\seo","src\services","src\hooks","src\providers" | Out-Null

@'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
'@ | Set-Content -Path "src\lib\utils.ts" -Encoding utf8

@'
import { z } from "zod";
import type { ContactFormData, ContactFormErrors } from "@/types/contact";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required.")
    .max(150, "Subject must be under 150 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be under 5000 characters."),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;

export function validateContactForm(
  data: ContactFormData
): ContactFormErrors {
  const result = contactFormSchema.safeParse(data);
  if (result.success) return {};

  const errors: ContactFormErrors = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ContactFormData | undefined;
    if (field && !errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

export function isContactFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
'@ | Set-Content -Path "src\lib\validation.ts" -Encoding utf8

@'
import "server-only";

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

interface RateLimitOptions {
  limit: number;
  windowMs: number;
}

const store = new Map<string, RateLimitEntry>();

const DEFAULT_OPTIONS: RateLimitOptions = {
  limit: 5,
  windowMs: 60000,
};

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = DEFAULT_OPTIONS
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + options.windowMs;
    store.set(identifier, { count: 1, resetAt });
    return { allowed: true, remaining: options.limit - 1, resetAt };
  }

  if (entry.count >= options.limit) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count += 1;
  store.set(identifier, entry);
  return {
    allowed: true,
    remaining: options.limit - entry.count,
    resetAt: entry.resetAt,
  };
}

export function getClientIdentifier(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() ?? "unknown";

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}
'@ | Set-Content -Path "src\lib\rate-limit.ts" -Encoding utf8

Write-Host "lib base done" -ForegroundColor Green

@'
export interface ContentEntry<TFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  content: string;
}

export function sortByDateDesc<T extends { publishedAt?: string }>(
  entries: T[],
  dateField: keyof T = "publishedAt" as keyof T
): T[] {
  return [...entries].sort((a, b) => {
    const dateA = new Date(String(a[dateField] ?? 0)).getTime();
    const dateB = new Date(String(b[dateField] ?? 0)).getTime();
    return dateB - dateA;
  });
}

export function estimateReadingTimeMinutes(content: string): number {
  const WORDS_PER_MINUTE = 200;
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
'@ | Set-Content -Path "src\lib\content\content-loader.ts" -Encoding utf8

@'
import { articles as articleData } from "@/data/articles";
import type { Article } from "@/types/article";
import { sortByDateDesc } from "@/lib/content/content-loader";

export function getAllArticles(): Article[] {
  return sortByDateDesc(articleData, "publishedAt");
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articleData.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category === category);
}

export function searchArticles(query: string): Article[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return getAllArticles();

  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(trimmed) ||
      article.category.toLowerCase().includes(trimmed) ||
      article.tags.some((tag) => tag.toLowerCase().includes(trimmed))
  );
}

export function getAllArticleSlugs(): string[] {
  return articleData.map((article) => article.slug);
}
'@ | Set-Content -Path "src\lib\content\article-loader.ts" -Encoding utf8

@'
import { projects as projectData } from "@/data/projects";
import type { Project, ProjectCategory } from "@/types/project";

export function getAllProjects(): Project[] {
  return projectData;
}

export function getFeaturedProjects(): Project[] {
  return projectData.filter((project) => project.featured);
}

export function getProjectsByCategory(
  category: ProjectCategory | "all"
): Project[] {
  if (category === "all") return projectData;
  return projectData.filter((project) => project.category === category);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectData.find((project) => project.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projectData.map((project) => project.slug);
}
'@ | Set-Content -Path "src\lib\content\project-loader.ts" -Encoding utf8

Write-Host "Content loaders done" -ForegroundColor Green

@'
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/constants/site";

interface BuildMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  imageUrl?: string;
  type?: "website" | "article";
}

export function buildMetadata({
  title,
  description,
  path = "",
  imageUrl,
  type = "website",
}: BuildMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title;
  const pageDescription = description ?? SITE_CONFIG.description;
  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = imageUrl ?? SITE_CONFIG.ogImage;

  return {
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImage],
    },
    keywords: [
      "Petroleum Engineer",
      "Drilling Engineer",
      "Engineering Software Developer",
      "AI Engineering Systems",
    ],
  };
}
'@ | Set-Content -Path "src\lib\seo\metadata.ts" -Encoding utf8

@'
import { SITE_CONFIG } from "@/constants/site";
import type { Article } from "@/types/article";
import type { Project } from "@/types/project";

export function buildPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    jobTitle: SITE_CONFIG.roles.join(", "),
    sameAs: [SITE_CONFIG.links.github, SITE_CONFIG.links.linkedin],
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "en-US",
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
      name: SITE_CONFIG.name,
    },
    publisher: {
      "@type": "Person",
      name: SITE_CONFIG.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_CONFIG.url}/blog/${article.slug}`,
    },
    ...(article.coverImageUrl ? { image: article.coverImageUrl } : {}),
    keywords: article.tags.join(", "),
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
      name: SITE_CONFIG.name,
    },
    keywords: project.technologies.join(", "),
    ...(project.githubUrl ? { url: project.githubUrl } : {}),
    ...(project.imageUrl ? { image: project.imageUrl } : {}),
  };
}

export function toJsonLdScript(data: object): string {
  return JSON.stringify(data);
}
'@ | Set-Content -Path "src\lib\seo\json-ld.ts" -Encoding utf8

@'
export { buildMetadata } from "@/lib/seo/metadata";
export {
  buildPersonJsonLd,
  buildWebsiteJsonLd,
  buildBlogPostingJsonLd,
  buildCreativeWorkJsonLd,
  toJsonLdScript,
} from "@/lib/seo/json-ld";
'@ | Set-Content -Path "src\lib\seo\index.ts" -Encoding utf8

Write-Host "SEO lib done" -ForegroundColor Green

@'
import "server-only";

export interface EmailMessage {
  to: string;
  from: string;
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailSendResult {
  success: boolean;
  providerMessageId?: string;
  error?: string;
}

export interface EmailProvider {
  send(message: EmailMessage): Promise<EmailSendResult>;
}

export class ConsoleEmailProvider implements EmailProvider {
  async send(message: EmailMessage): Promise<EmailSendResult> {
    console.info("[email:console] would send email", {
      to: message.to,
      subject: message.subject,
    });
    return { success: true, providerMessageId: "console-noop" };
  }
}

export class ResendEmailProvider implements EmailProvider {
  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: message.from,
          to: [message.to],
          reply_to: message.replyTo,
          subject: message.subject,
          text: message.text,
          html: message.html,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, error: errorBody };
      }

      const data = (await response.json()) as { id?: string };
      return { success: true, providerMessageId: data.id };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export class SendGridEmailProvider implements EmailProvider {
  constructor(private readonly apiKey: string) {}

  async send(message: EmailMessage): Promise<EmailSendResult> {
    try {
      const response = await fetch(
        "https://api.sendgrid.com/v3/mail/send",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email: message.to }] }],
            from: { email: message.from },
            reply_to: message.replyTo
              ? { email: message.replyTo }
              : undefined,
            subject: message.subject,
            content: [
              { type: "text/plain", value: message.text },
              ...(message.html
                ? [{ type: "text/html", value: message.html }]
                : []),
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        return { success: false, error: errorBody };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export class SmtpEmailProvider implements EmailProvider {
  async send(): Promise<EmailSendResult> {
    return {
      success: false,
      error:
        "SmtpEmailProvider is a stub. Implement using nodemailer and ensure the API route runs on the Node.js runtime.",
    };
  }
}

export function getEmailProvider(): EmailProvider {
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) return new ResendEmailProvider(resendKey);

  const sendGridKey = process.env.SENDGRID_API_KEY;
  if (sendGridKey) return new SendGridEmailProvider(sendGridKey);

  if (process.env.SMTP_HOST) return new SmtpEmailProvider();

  return new ConsoleEmailProvider();
}
'@ | Set-Content -Path "src\services\email.service.ts" -Encoding utf8

@'
import "server-only";

import type { ContactFormSchema } from "@/lib/validation";
import type { ContactSubmissionResult } from "@/types/contact";
import { getEmailProvider, type EmailMessage } from "@/services/email.service";
import { SITE_CONFIG } from "@/constants/site";

export async function processContactSubmission(
  data: ContactFormSchema
): Promise<ContactSubmissionResult> {
  const provider = getEmailProvider();

  const message: EmailMessage = {
    to: SITE_CONFIG.links.email,
    from: `Portfolio Contact Form <noreply@${getDomain(SITE_CONFIG.url)}>`,
    replyTo: data.email,
    subject: `[Portfolio] ${data.subject}`,
    text: buildPlainTextBody(data),
  };

  const result = await provider.send(message);

  if (!result.success) {
    return {
      success: false,
      message: "We couldn't send your message right now. Please try again later.",
    };
  }

  return {
    success: true,
    message: "Thanks for reaching out - I'll get back to you soon.",
  };
}

function buildPlainTextBody(data: ContactFormSchema): string {
  return [
    `New contact form submission`,
    ``,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Subject: ${data.subject}`,
    ``,
    `Message:`,
    data.message,
  ].join("\n");
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return "example.com";
  }
}
'@ | Set-Content -Path "src\services\contact.service.ts" -Encoding utf8

@'
import type {
  ContactFormData,
  ContactSubmissionResult,
  ContactApiResponse,
} from "@/types/contact";

export async function submitContactForm(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const body = (await response.json()) as ContactApiResponse;

    return {
      success: body.success,
      message: body.message,
    };
  } catch {
    return {
      success: false,
      message: "Network error. Please check your connection and try again.",
    };
  }
}
'@ | Set-Content -Path "src\services\contact-form.client.ts" -Encoding utf8

Write-Host "Services done" -ForegroundColor Green

@'
"use client";

import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
'@ | Set-Content -Path "src\hooks\useTheme.ts" -Encoding utf8

@'
"use client";

import { useState, useCallback } from "react";
import type {
  ContactFormData,
  ContactFormErrors,
} from "@/types/contact";
import { validateContactForm, isContactFormValid } from "@/lib/validation";
import { submitContactForm } from "@/services/contact-form.client";

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const updateField = useCallback(
    (field: keyof ContactFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const validationErrors = validateContactForm(formData);
      setErrors(validationErrors);

      if (!isContactFormValid(validationErrors)) return;

      setIsSubmitting(true);
      setStatusMessage(null);

      const result = await submitContactForm(formData);

      setStatusMessage(result.message);
      if (result.success) {
        setFormData(INITIAL_FORM_DATA);
      }
      setIsSubmitting(false);
    },
    [formData]
  );

  return {
    formData,
    errors,
    isSubmitting,
    statusMessage,
    updateField,
    handleSubmit,
  };
}
'@ | Set-Content -Path "src\hooks\useContactForm.ts" -Encoding utf8

@'
"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types/project";

export type ProjectFilter = ProjectCategory | "all";

export function useProjectFilter(projects: Project[]) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = useMemo<Project[]>(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  return { activeFilter, setActiveFilter, filteredProjects };
}
'@ | Set-Content -Path "src\hooks\useProjectFilter.ts" -Encoding utf8

Write-Host "Hooks done" -ForegroundColor Green

@'
"use client";

import {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined
);

const THEME_STORAGE_KEY = "portfolio-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as
      | Theme
      | null;
    if (stored === "light" || stored === "dark") {
      setThemeState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme, mounted]);

  const setTheme = (next: Theme) => setThemeState(next);
  const toggleTheme = () =>
    setThemeState((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
'@ | Set-Content -Path "src\providers\ThemeProvider.tsx" -Encoding utf8

Write-Host "Providers done" -ForegroundColor Green
Write-Host "PART 2 COMPLETE - run setup-part3.ps1 next" -ForegroundColor Cyan