import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-verde.jpg";
import { articles, events, pressReleases, values, formatDate } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Partidul Verde — O Românie curată, viabilă și justă" },
      {
        name: "description",
        content:
          "Partidul Verde: politici de mediu bazate pe știință, transparență și acțiune locală. Devino membru, voluntar sau susține mișcarea.",
      },
      { property: "og:title", content: "Partidul Verde — O Românie curată, viabilă și justă" },
      {
        property: "og:description",
        content: "Politici de mediu bazate pe știință, transparență și acțiune locală.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
              <span className="size-1.5 rounded-full bg-accent" /> Mișcare politică verde
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl">
              O Românie <span className="text-accent">curată</span>,<br />
              <span className="text-brand">viabilă</span> și justă.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70">
              Construim politica pe știință, transparență și acțiune locală. De la aer curat la
              energie regenerabilă — fiecare decizie contează.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/membru" className="btn-brand px-6 py-3">
                Deveniți membru
              </Link>
              <Link to="/voluntar" className="glass rounded-xl px-6 py-3 font-semibold">
                Voluntează
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <p className="font-display text-3xl font-bold text-accent">12.400</p>
                <p className="text-sm text-foreground/50">membri activi</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold">42</p>
                <p className="text-sm text-foreground/50">filiale locale</p>
              </div>
              <div>
                <p className="font-display text-3xl font-bold text-brand">180+</p>
                <p className="text-sm text-foreground/50">proiecte livrate</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="glass rotate-1 rounded-3xl p-4">
              <img
                src={heroImg}
                width={1024}
                height={1280}
                alt="Pădure din România alături de un parc eolian, la apus"
                className="aspect-[4/5] w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl font-bold">Misiune & valori</h2>
          <Link to="/misiune" className="text-sm text-foreground/50 hover:text-foreground">
            Ce ne ghidează
          </Link>
        </div>
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
              <h3 className="mt-3 font-display text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-foreground/60">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Articole</h3>
              <Link to="/articole" className="text-xs text-accent">
                Toate →
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {articles.slice(0, 2).map((a) => (
                <Link
                  key={a.slug}
                  to="/articole/$slug"
                  params={{ slug: a.slug }}
                  className="group block"
                >
                  <p className="text-xs uppercase tracking-widest text-foreground/40">
                    {formatDate(a.date)}
                  </p>
                  <p className="mt-1 font-medium group-hover:text-accent">{a.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Evenimente</h3>
              <Link to="/evenimente" className="text-xs text-accent">
                Calendar →
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {events.slice(0, 2).map((e) => (
                <Link key={e.slug} to="/evenimente" className="group block">
                  <p className="text-xs uppercase tracking-widest text-foreground/40">
                    {e.location.split("·")[0]} · {formatDate(e.date)}
                  </p>
                  <p className="mt-1 font-medium group-hover:text-accent">{e.title}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold">Comunicate</h3>
              <Link to="/comunicate" className="text-xs text-accent">
                Presă →
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {pressReleases.slice(0, 2).map((p) => (
                <Link
                  key={p.slug}
                  to="/comunicate/$slug"
                  params={{ slug: p.slug }}
                  className="group block"
                >
                  <p className="text-xs uppercase tracking-widest text-foreground/40">
                    {formatDate(p.date)}
                  </p>
                  <p className="mt-1 font-medium group-hover:text-accent">{p.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="glass flex flex-col items-center justify-between gap-6 rounded-3xl p-8 md:flex-row md:p-10">
          <div>
            <h2 className="font-display text-3xl font-bold">Alătură-te mișcării</h2>
            <p className="mt-2 max-w-md text-foreground/60">
              Fiecare voce contează. Alege cum vrei să schimbi România.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/doneaza" className="btn-brand px-6 py-3">
              Donează
            </Link>
            <Link to="/membru" className="glass rounded-xl px-6 py-3 font-semibold">
              Deveniți membru
            </Link>
            <Link to="/voluntar" className="glass rounded-xl px-6 py-3 font-semibold">
              Voluntează
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
