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
