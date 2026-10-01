import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Layout, PageHeader } from "@/components/site/Layout";
import { branches } from "@/data/content";

export const Route = createFileRoute("/filiale")({
  head: () => ({
    meta: [
      { title: "Filiale locale — Partidul Verde" },
      {
        name: "description",
        content:
          "Găsește filiala Partidului Verde din județul tău: coordonator, adresă, număr de membri și voluntari.",
      },
      { property: "og:title", content: "Filiale locale — Partidul Verde" },
      { property: "og:description", content: "Rețeaua de filiale a Partidului Verde în România." },
    ],
  }),
  component: Filiale,
});

function Filiale() {
  const [q, setQ] = useState("");
  const list = branches.filter((b) =>
    `${b.city} ${b.county} ${b.name}`.toLowerCase().includes(q.trim().toLowerCase()),
  );

  return (
    <Layout>
      <PageHeader
        eyebrow="Filiale"
        title={
          <>
            Prezenți în <span className="text-brand">toată țara</span>.
          </>
        }
        lead="Fiecare filială își organizează propriile acțiuni, evenimente și echipe de voluntari."
      />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <input
          className="field max-w-sm"
          placeholder="Caută după oraș sau județ"
          value={q}
          onChange={(e) => setQ(e.currentTarget.value)}
          maxLength={60}
        />

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((b) => (
            <article key={b.slug} className="glass glass-hover rounded-2xl p-6">
              <p className="text-xs uppercase tracking-widest text-accent">
                {b.city} · {b.county}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold">{b.name}</h2>
              <p className="mt-2 text-sm text-foreground/60">{b.address}</p>
              <p className="mt-3 text-sm text-foreground/70">
                Coordonator: <span className="text-foreground">{b.coordinator}</span>
              </p>
              <div className="mt-4 flex gap-6 text-sm">
                <span>
                  <span className="font-display text-lg font-bold text-brand">{b.members}</span>{" "}
                  membri
                </span>
                <span>
                  <span className="font-display text-lg font-bold text-accent">{b.volunteers}</span>{" "}
                  voluntari
                </span>
              </div>
            </article>
          ))}
          {list.length === 0 && (
            <p className="text-foreground/60">Nicio filială găsită pentru „{q}”.</p>
          )}
        </div>
      </section>
    </Layout>
  );
}
