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
