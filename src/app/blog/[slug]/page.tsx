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
        {formatDate(article.publishedAt)} · {article.readingTimeMinutes} min
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