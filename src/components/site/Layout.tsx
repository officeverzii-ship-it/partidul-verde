import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { mainNav, footerNav, siteConfig } from "@/data/site";

function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-40 -left-24 h-[520px] w-[520px] rounded-full bg-accent/25 blur-[120px]" />
      <div className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full bg-brand/30 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-brand/15 blur-[120px]" />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mx-auto max-w-7xl px-6 pt-6">
      <nav className="glass rounded-2xl px-5 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-xl bg-brand font-display text-lg font-bold text-brand-foreground">
              P
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold tracking-tight">{siteConfig.name}</p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                {siteConfig.tagline}
              </p>
            </div>
          </Link>

          <ul className="hidden items-center gap-7 text-sm text-foreground/70 lg:flex">
            {mainNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="hover:text-foreground"
                  activeProps={{ className: "text-accent" }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden text-sm text-foreground/70 hover:text-foreground sm:inline-block"
            >
              Contact
            </Link>
            <Link to="/doneaza" className="btn-brand px-4 py-2 text-sm">
              Donează
            </Link>
            <button
              type="button"
              aria-label="Meniu"
              onClick={() => setOpen((v) => !v)}
              className="glass rounded-lg px-3 py-2 text-sm lg:hidden"
            >
              ☰
            </button>
          </div>
        </div>

        {open && (
          <ul className="mt-4 grid gap-2 border-t border-border pt-4 text-sm lg:hidden">
            {[...mainNav, { label: "Contact", to: "/contact" }].map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2 text-foreground/80 hover:bg-white/5"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 py-12">
      <div className="glass grid gap-8 rounded-3xl p-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid size-8 place-items-center rounded-lg bg-brand font-display font-bold text-brand-foreground">
              P
            </div>
            <span className="font-display font-bold">{siteConfig.name}</span>
          </div>
          <p className="mt-3 text-sm text-foreground/50">
            Politica care respectă planeta și oamenii.
          </p>
        </div>

        {footerNav.map((col) => (
          <div key={col.title}>
            <p className="text-xs uppercase tracking-widest text-foreground/40">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/70">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-foreground/40">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.email} · {siteConfig.phone}
      </p>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen font-body">
      <Ambient />
      <div className="relative">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-14 pb-6">
      <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
        <span className="size-1.5 rounded-full bg-accent" /> {eyebrow}
      </span>
      <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl">{title}</h1>
      {lead && <p className="mt-5 max-w-2xl text-lg text-foreground/70">{lead}</p>}
    </section>
  );
}
