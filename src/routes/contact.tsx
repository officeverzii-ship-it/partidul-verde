import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Field, FormStatus, useSiteForm } from "@/components/site/Form";
import { siteConfig } from "@/data/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Partidul Verde" },
      { name: "description", content: "Scrie-ne: întrebări, propuneri, solicitări media sau colaborări." },
      { property: "og:title", content: "Contact — Partidul Verde" },
      { property: "og:description", content: "Ia legătura cu echipa Partidului Verde." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const f = useSiteForm(["nume", "email", "mesaj"]);
  return (
    <Layout>
      <PageHeader eyebrow="Contact" title="Scrie-ne." lead="Răspundem de obicei în 2 zile lucrătoare." />
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-8 lg:grid-cols-3">
        <div className="glass rounded-3xl p-8 text-sm text-foreground/75">
          <p className="text-xs uppercase tracking-widest text-foreground/40">Sediu central</p>
          <p className="mt-3">{siteConfig.address}</p>
          <p className="mt-2">{siteConfig.email}</p>
          <p className="mt-2">{siteConfig.phone}</p>
        </div>
        <form onSubmit={f.submit} className="glass rounded-3xl p-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nume *"><input className="field" maxLength={100} onChange={f.set("nume")} /></Field>
            <Field label="Email *"><input type="email" className="field" maxLength={255} onChange={f.set("email")} /></Field>
            <Field label="Mesaj *" full><textarea rows={5} className="field" maxLength={2000} onChange={f.set("mesaj")} /></Field>
          </div>
          <button className="btn-brand mt-6 px-6 py-3">Trimite</button>
          <FormStatus error={f.error} sent={f.sent} message="Mulțumim! Mesajul a fost trimis." />
        </form>
      </section>
    </Layout>
  );
}
