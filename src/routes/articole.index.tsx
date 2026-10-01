import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { articles, formatDate } from "@/data/content";

export const Route = createFileRoute("/articole/")({
  head: () => ({
    meta: [
      { title: "Articole — Partidul Verde" },
      { name: "description", content: "Analize și propuneri de politici publice ale Partidului Verde." },
      { property: "og:title", content: "Articole — Partidul Verde" },
      { property: "og:description", content: "Analize și propuneri de politici publice." },
    ],
  }),
  component: Articole,
});

function Articole() {
  const cats = ["Toate", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState("Toate");
  const [q, setQ] = useState("");
  const list = articles.filter(
    (a) =>
      (cat === "Toate" || a.category === cat) &&
      a.title.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <Layout>
      <PageHeader eyebrow="Articole" title="Idei, analize, propuneri." />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-3">
          <input className="field max-w-xs" placeholder="Caută articole" value={q} maxLength={80} onChange={(e) => setQ(e.currentTarget.value)} />
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={c === cat ? "btn-brand px-3 py-1.5 text-sm" : "glass rounded-lg px-3 py-1.5 text-sm"}>
              {c}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {list.map((a) => (
            <Link key={a.slug} to="/articole/$slug" params={{ slug: a.slug }} className="glass glass-hover block rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest text-accent">{a.category} · {formatDate(a.date)}</p>
              <h2 className="mt-2 font-display text-xl font-semibold">{a.title}</h2>
              <p className="mt-2 text-sm text-foreground/60">{a.excerpt}</p>
              <p className="mt-3 text-xs text-foreground/40">de {a.author}</p>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
