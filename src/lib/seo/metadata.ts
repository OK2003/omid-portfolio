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
      "Omid Reza KeyShams",
      "امیدرضا کی شمس",
      "KeyShams",
      "کی شمس",
      "Petroleum Engineer",
      "Drilling Engineer",
      "Engineering Software Developer",
      "AI Engineering Systems",
      "مهندس نفت",
      "مهندس حفاری",
      "EDi Drilling Engineering",
      "Well Hydraulics",
    ],
  };
}
