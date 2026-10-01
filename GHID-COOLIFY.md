# Instalare cu Coolify pe Contabo VPS

Coolify construiește și rulează aplicația dintr-un repository Git folosind Dockerfile-ul inclus în acest pachet. Nu trebuie să instalezi Bun/Node manual pe server — totul rulează în container.

## 1. Pune codul pe GitHub

Coolify lucrează cel mai bine din Git. Două variante:
- **Din Lovable**: meniul GitHub din editor → Connect project → Create Repository (sincronizare automată la fiecare modificare).
- **Manual**: dezarhivezi acest ZIP local și `git init && git add -A && git commit`, apoi îl împingi într-un repository privat pe GitHub.

## 2. În Coolify (pe VPS-ul Contabo)

1. **New Project → New Resource → Application**.
2. Sursa: **Public Repository** (lipești URL-ul repo-ului) sau **GitHub App** dacă repo-ul e privat.
3. **Build Pack**: alege **Dockerfile** — Coolify îl detectează automat din rădăcina proiectului.
4. **Port**: `3000` (Dockerfile-ul expune portul 3000).
5. **Domain**: setezi domeniul tău (ex. `partidulverde.ro`); Coolify emite automat certificatul HTTPS (Let's Encrypt) — nu mai ai nevoie de Nginx/Certbot manual.

## 3. Variabilele de mediu (Environment Variables în Coolify)

Adaugă în tab-ul **Environment Variables** al aplicației:

```
SUPABASE_URL=https://oppxryairenijsjmpbxn.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_SsLs76mqt85zzQlCi8I3dw_W0fAPcoO
VITE_SUPABASE_URL=https://oppxryairenijsjmpbxn.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_SsLs76mqt85zzQlCi8I3dw_W0fAPcoO
SUPABASE_SERVICE_ROLE_KEY=<cheia secretă — din backendul Lovable Cloud sau propriul proiect Supabase>
EUPLATESC_MID=<ID-ul de comerciant EuPlătesc>
EUPLATESC_KEY=<cheia secretă EuPlătesc>
```

Variabilele `VITE_*` sunt publice; `SUPABASE_SERVICE_ROLE_KEY` și `EUPLATESC_KEY` sunt secrete — nu le pune în cod sau în repository.

## 4. Deploy

Apasă **Deploy**. Coolify construiește imaginea Docker și pornește containerul. La fiecare push pe GitHub poți activa **Automatic Deployment** (webhook) — siteul se actualizează singur.

## 5. După primul deploy — obligatoriu

1. **EuPlătesc**: în contul de comerciant setează adresa de notificare la
   `https://domeniul-tau.ro/api/public/euplatesc/callback` — altfel donațiile nu se confirmă.
2. **DNS**: la registratorul domeniului, creează o înregistrare `A` către IP-ul VPS-ului Contabo.
3. **Baza de date**: aplicația folosește backendul Lovable Cloud (funcționează de oriunde).
   Dacă vrei baza în cont propriu, folosește `migrare_completa.sql` livrat separat și actualizează cheile.

## Notă tehnică

Dockerfile-ul rulează aplicația cu Bun (`bun dist/server/index.mjs`). Dacă buildul de producție
este orientat spre Cloudflare și nu pornește direct, schimbă în Dockerfile linia de build în:

```
RUN NITRO_PRESET=node-server bun run build
```

și comanda de pornire în `CMD ["bun", ".output/server/index.mjs"]`.
