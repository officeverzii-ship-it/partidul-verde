import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { events } from "@/data/content";

export const Route = createFileRoute("/evenimente")({
  head: () => ({
    meta: [
      { title: "Evenimente — Partidul Verde" },
      { name: "description", content: "Calendarul evenimentelor Partidului Verde: adunări, dezbateri, acțiuni de voluntariat." },
      { property: "og:title", content: "Evenimente — Partidul Verde" },
      { property: "og:description", content: "Adunări, dezbateri și acțiuni de voluntariat." },
    ],
  }),
  component: Evenimente,
});

function Evenimente() {
  return (
    <Layout>
      <PageHeader eyebrow="Evenimente" title={<>Ne vedem <span className="text-accent">pe teren</span>.</>} />
      <section className="mx-auto max-w-7xl space-y-4 px-6 py-8">
        {events.map((e) => {
          const d = new Date(e.date);
          return (
            <article key={e.slug} className="glass glass-hover flex gap-5 rounded-2xl p-6">
              <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-brand/20 text-center">
                <div>
                  <p className="font-display text-2xl font-bold leading-none text-accent">{d.getDate()}</p>
                  <p className="text-[10px] uppercase tracking-wider text-foreground/60">{d.toLocaleDateString("ro-RO", { month: "short" })}</p>
                </div>
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold">{e.title}</h2>
                <p className="text-sm text-accent">{e.location}</p>
                <p className="mt-2 text-sm text-foreground/60">{e.description}</p>
              </div>
            </article>
          );
        })}
      </section>
    </Layout>
  );
}
