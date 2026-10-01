import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { pressReleases, formatDate } from "@/data/content";

export const Route = createFileRoute("/comunicate/$slug")({
  loader: ({ params }) => {
    const item = pressReleases.find((p) => p.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Negăsit" }, { name: "robots", content: "noindex" }] };
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} — Partidul Verde` },
        { name: "description", content: item.excerpt },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.excerpt },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <Layout><p className="mx-auto max-w-3xl px-6 py-20">Comunicatul nu există. <Link to="/comunicate" className="text-accent">Înapoi</Link></p></Layout>
  ),
  errorComponent: () => <Layout><p className="mx-auto max-w-3xl px-6 py-20">Eroare la încărcare.</p></Layout>,
  component: PressPage,
});

function PressPage() {
  const { item } = Route.useLoaderData();
  return (
    <Layout>
      <article className="mx-auto max-w-3xl px-6 py-14">
        <Link to="/comunicate" className="text-sm text-accent">← Comunicate</Link>
        <p className="mt-6 text-xs uppercase tracking-widest text-foreground/50">Comunicat · {formatDate(item.date)}</p>
        <h1 className="mt-3 font-display text-4xl font-bold">{item.title}</h1>
        <div className="glass mt-8 rounded-3xl p-8 leading-relaxed text-foreground/80">{item.body}</div>
      </article>
    </Layout>
  );
}
