import Link from "next/link";
import type { Article } from "@/types/article";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
    >
      <Card className="h-full transition-colors hover:border-foreground/20">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-sm text-muted-foreground">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge>{article.category}</Badge>
            <span>{formatDate(article.publishedAt)}</span>
            <span aria-hidden="true">.</span>
            <span>{article.readingTimeMinutes} min read</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
