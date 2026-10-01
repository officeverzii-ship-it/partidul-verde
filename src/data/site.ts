/**
 * Conținut editabil al site-ului: meniu, footer, date de contact.
 * Modifică aici pentru a schimba navigația fără a atinge componentele.
 */

export type NavLink = { label: string; to: string };

export const siteConfig = {
  name: "Partidul Verde",
  tagline: "VERZII · ROMÂNIA",
  description:
    "Partidul Verde construiește o Românie curată, viabilă și justă: politici bazate pe știință, transparență și acțiune locală.",
  email: "contact@partidulverde.ro",
  phone: "+40 21 000 0000",
  address: "București, România",
};

export const mainNav: NavLink[] = [
  { label: "Despre", to: "/despre" },
  { label: "Misiune", to: "/misiune" },
  { label: "Echipă", to: "/echipa" },
  { label: "Filiale", to: "/filiale" },
  { label: "Articole", to: "/articole" },
  { label: "Evenimente", to: "/evenimente" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Partid",
    links: [
      { label: "Despre noi", to: "/despre" },
      { label: "Echipă", to: "/echipa" },
      { label: "Filiale locale", to: "/filiale" },
    ],
  },
  {
    title: "Resurse",
    links: [
      { label: "Articole", to: "/articole" },
      { label: "Comunicate de presă", to: "/comunicate" },
      { label: "Evenimente", to: "/evenimente" },
    ],
  },
  {
    title: "Implicare",
    links: [
      { label: "Devino membru", to: "/membru" },
      { label: "Devino voluntar", to: "/voluntar" },
      { label: "Donează", to: "/doneaza" },
    ],
  },
];
