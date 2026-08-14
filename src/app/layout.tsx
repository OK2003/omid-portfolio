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
        <link rel="alternate" hrefLang="fa" href="https://omidkeyshams.dev" />
        <link rel="alternate" hrefLang="en" href="https://omidkeyshams.dev" />
        <link rel="alternate" hrefLang="x-default" href="https://omidkeyshams.dev" />
        <meta name="author" content="Omid Reza KeyShams" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
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
