import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { values } from "@/data/content";

export const Route = createFileRoute("/misiune")({
  head: () => ({
    meta: [
      { title: "Misiune și valori — Partidul Verde" },
      {
        name: "description",
        content:
          "Misiunea Partidului Verde: aer și apă curată, energie regenerabilă, justiție climatică și democrație locală.",
      },
      { property: "og:title", content: "Misiune și valori — Partidul Verde" },
      {
        property: "og:description",
        content: "Principiile care ghidează fiecare decizie politică a Partidului Verde.",
      },
    ],
  }),
  component: Misiune,
});

const commitments = [
  "Monitorizare independentă a calității aerului în fiecare județ",
  "50% energie regenerabilă în consumul național până în 2032",
  "Buget participativ obligatoriu în toate municipiile",
  "Transport public accesibil în fiecare reședință de județ",
  "Protecția integrală a pădurilor virgine rămase",
  "Publicarea tuturor donațiilor către partid",
];

function Misiune() {
  return (
    <Layout>
      <PageHeader
        eyebrow="Misiune & valori"
        title={
          <>
            Principii clare, <span className="text-brand">aplicate</span> în fiecare decizie.
          </>
        }
        lead="Nu promitem totul tuturor. Ne angajăm la măsuri verificabile, cu termene și responsabili."
      />

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-5 md:grid-cols-3">
          {values.map((v, i) => (
            <div
              key={v.index}
              className={`glass glass-hover rounded-2xl p-6 ${i === 0 ? "-rotate-1" : i === 2 ? "rotate-1" : ""}`}
            >
              <p
                className={`font-display text-4xl font-bold ${
                  i === 0 ? "text-accent" : i === 1 ? "text-brand" : ""
                }`}
              >
                {v.index}
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold">{v.title}</h2>
              <p className="mt-2 text-sm text-foreground/60">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="glass mt-5 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-semibold">Angajamentele noastre</h2>
          <ul className="mt-5 grid gap-3 md:grid-cols-2">
            {commitments.map((c) => (
              <li key={c} className="flex gap-3 text-foreground/75">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
