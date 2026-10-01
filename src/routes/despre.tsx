import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";

export const Route = createFileRoute("/despre")({
  head: () => ({
    meta: [
      { title: "Despre noi — Partidul Verde" },
      {
        name: "description",
        content:
          "Cine suntem, de unde venim și cum funcționează Partidul Verde: istoric, principii și mod de organizare.",
      },
      { property: "og:title", content: "Despre noi — Partidul Verde" },
      {
        property: "og:description",
        content: "Istoricul, principiile și organizarea Partidului Verde.",
      },
    ],
  }),
  component: Despre,
});

const timeline = [
  { year: "2014", text: "Un grup de activiști de mediu pune bazele mișcării." },
  { year: "2018", text: "Prima filială locală și primele campanii pentru aer curat." },
  { year: "2021", text: "Partidul se înregistrează oficial și adoptă statutul." },
  { year: "2026", text: "42 de filiale, peste 12.000 de membri activi." },
];

function Despre() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Despre noi"
        title={
          <>
            Un partid construit <span className="text-accent">de jos în sus</span>.
          </>
        }
        lead="Suntem oameni care au început cu proteste pentru păduri și au ajuns să scrie politici publice. Credem în date, în dezbatere deschisă și în comunități care decid pentru ele însele."
      />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass rounded-3xl p-8">
            <h2 className="font-display text-2xl font-semibold">Cum lucrăm</h2>
            <p className="mt-3 text-foreground/70">
              Fiecare propunere de politică publică trece prin consultare cu filialele, evaluare de
              impact și publicare deschisă. Bugetele partidului sunt publicate trimestrial.
            </p>
          </div>
          <div className="glass rounded-3xl p-8">
            <h2 className="font-display text-2xl font-semibold">Ce ne diferențiază</h2>
            <p className="mt-3 text-foreground/70">
              Nu acceptăm finanțări din industrii poluante, publicăm întâlnirile cu grupuri de
              interes și alegem candidații prin vot intern deschis tuturor membrilor.
            </p>
          </div>
        </div>

        <div className="glass mt-5 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold">Parcursul nostru</h2>
          <ol className="mt-6 grid gap-6 md:grid-cols-4">
            {timeline.map((t) => (
              <li key={t.year}>
                <p className="font-display text-3xl font-bold text-brand">{t.year}</p>
                <p className="mt-2 text-sm text-foreground/60">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </Layout>
  );
}
