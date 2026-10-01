import { createFileRoute } from "@tanstack/react-router";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Field, FormStatus, useSiteForm } from "@/components/site/Form";
import { supabase } from "@/integrations/supabase/client";
import { useBranchOptions } from "@/components/admin/CrudPage";

export const Route = createFileRoute("/membru")({
  head: () => ({
    meta: [
      { title: "Devino membru — Partidul Verde" },
      { name: "description", content: "Înscrie-te în Partidul Verde și votează direcția partidului." },
      { property: "og:title", content: "Devino membru — Partidul Verde" },
      { property: "og:description", content: "Înscrie-te și decide împreună cu noi." },
    ],
  }),
  component: Membru,
});

function Membru() {
  const { data: branches = [] } = useBranchOptions();
  const f = useSiteForm(["nume", "email", "telefon", "filiala"], async (v) => {
    const { error } = await supabase.from("members").insert({
      full_name: v("nume"), email: v("email"), phone: v("telefon"),
      branch_id: v("filiala") || null, address: v("adresa") || null,
    });
    return error ? "Nu am putut trimite înscrierea. Verifică datele și încearcă din nou." : null;
  });
  return (
    <Layout>
      <PageHeader eyebrow="Devino membru" title={<>Decide <span className="text-accent">împreună</span> cu noi.</>} lead="Membrii votează conducerea, candidații și programul politic." />
      <section className="mx-auto max-w-3xl px-6 py-8">
        <form onSubmit={f.submit} className="glass rounded-3xl p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nume complet *"><input className="field" maxLength={100} onChange={f.set("nume")} /></Field>
            <Field label="Email *"><input type="email" className="field" maxLength={255} onChange={f.set("email")} /></Field>
            <Field label="Telefon *"><input type="tel" className="field" maxLength={20} onChange={f.set("telefon")} /></Field>
            <Field label="Filiala *">
              <select className="field" defaultValue="" onChange={f.set("filiala")}>
                <option value="" disabled>Alege filiala</option>
                {branches.map((b) => <option key={b.value} value={b.value}>{b.label}</option>)}
              </select>
            </Field>
            <Field label="Adresă" full><input className="field" maxLength={200} onChange={f.set("adresa")} /></Field>
          </div>
          <button className="btn-brand mt-6 px-6 py-3">Trimite înscrierea</button>
          <FormStatus error={f.error} sent={f.sent} message="Mulțumim! Cererea ta de înscriere a fost trimisă filialei." />
        </form>
      </section>
    </Layout>
  );
}
