import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { articles, formatDate } from "@/data/content";

export const Route = createFileRoute("/articole/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Negăsit" }, { name: "robots", content: "noindex" }] };
    const { article } = loaderData;
    return {
      meta: [
        { title: `${article.title} — Partidul Verde` },
        { name: "description", content: article.excerpt },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout>
      <p className="mx-auto max-w-3xl px-6 py-20">Articolul nu există. <Link to="/articole" className="text-accent">Înapoi</Link></p>
    </Layout>
  ),
  errorComponent: () => <Layout><p className="mx-auto max-w-3xl px-6 py-20">Eroare la încărcare.</p></Layout>,
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-6 py-14">
        <Link to="/articole" className="text-sm text-accent">← Articole</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-foreground/50">{article.category} · {formatDate(article.date)} · {article.author}</p>
        <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{article.title}</h1>
        <p className="mt-6 text-lg text-foreground/80">{article.excerpt}</p>
        <div className="glass mt-8 rounded-3xl p-8 leading-relaxed text-foreground/80">{article.body}</div>
      </article>
    </Layout>
  );
}
