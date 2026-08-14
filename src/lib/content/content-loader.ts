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
