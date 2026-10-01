import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { pressReleases, formatDate } from "@/data/content";

export const Route = createFileRoute("/comunicate/")({
  head: () => ({
    meta: [
      { title: "Comunicate de presă — Partidul Verde" },
      { name: "description", content: "Pozițiile oficiale și comunicatele de presă ale Partidului Verde." },
      { property: "og:title", content: "Comunicate de presă — Partidul Verde" },
      { property: "og:description", content: "Pozițiile oficiale ale Partidului Verde." },
    ],
  }),
  component: Comunicate,
});

function Comunicate() {
  return (
    <Layout>
      <PageHeader eyebrow="Presă" title="Comunicate oficiale." lead="Pentru solicitări media: presa@partidulverde.ro" />
      <section className="mx-auto max-w-7xl space-y-4 px-6 py-8">
        {pressReleases.map((p) => (
          <Link key={p.slug} to="/comunicate/$slug" params={{ slug: p.slug }} className="glass glass-hover block rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-foreground/40">{formatDate(p.date)}</p>
            <h2 className="mt-1 font-display text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-foreground/60">{p.excerpt}</p>
          </Link>
        ))}
      </section>
    </Layout>
  );
}
