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
