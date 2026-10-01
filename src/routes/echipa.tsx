import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { team } from "@/data/content";

export const Route = createFileRoute("/echipa")({
  head: () => ({
    meta: [
      { title: "Echipa — Partidul Verde" },
      {
        name: "description",
        content:
          "Conducerea Partidului Verde: președinte, vicepreședinte, secretar general, purtător de cuvânt și coordonatori.",
      },
      { property: "og:title", content: "Echipa — Partidul Verde" },
      { property: "og:description", content: "Oamenii care conduc Partidul Verde." },
    ],
  }),
  component: Echipa,
});

function Echipa() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Echipa"
        title={
          <>
            Oamenii din spatele <span className="text-accent">mișcării</span>.
          </>
        }
        lead="Conducerea este aleasă prin vot intern, la fiecare doi ani, de toți membrii cu cotizația la zi."
      />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <article key={m.name} className="glass glass-hover rounded-2xl p-6">
              <div className="grid size-12 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
                {m.initials}
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">{m.name}</h2>
              <p className="text-sm uppercase tracking-widest text-accent">{m.role}</p>
              <p className="mt-3 text-sm text-foreground/60">{m.bio}</p>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
