# Instalare pe Contabo VPS (Ubuntu)

Siteul are o parte de server (plăți EuPlătesc, formulare), deci rulează ca aplicație Node.js în spatele Nginx.

## 1. Pe VPS — instalează uneltele

```bash
# Bun (constructorul proiectului)
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc

# Node 22 (rulează aplicația în producție)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo bash -
sudo apt install -y nodejs nginx certbot python3-certbot-nginx
```

## 2. Urcă codul și construiește

```bash
# din calculatorul tău:
scp partidul-verde-contabo.zip root@IP-UL-VPS:/var/www/

# pe VPS:
cd /var/www && unzip partidul-verde-contabo.zip -d partidul-verde
cd partidul-verde
bun install
bun run build
```

## 3. Variabilele de mediu

Creează `/var/www/partidul-verde/.env` (există deja în arhivă — verifică valorile):

```
SUPABASE_URL=...
SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_URL=...            (aceeași valoare)
VITE_SUPABASE_PUBLISHABLE_KEY=... (aceeași valoare)
SUPABASE_SERVICE_ROLE_KEY=...    (cheie SECRETĂ — o iei din backendul Lovable Cloud sau din propriul proiect Supabase)
EUPLATESC_MID=...
EUPLATESC_KEY=...
```

Variabilele `VITE_*` sunt publice; `SUPABASE_SERVICE_ROLE_KEY` și `EUPLATESC_KEY` sunt secrete — nu le pune niciodată în cod sau pe GitHub.

## 4. Pornește aplicația ca serviciu

```bash
sudo tee /etc/systemd/system/partidul-verde.service <<'EOF'
[Unit]
Description=Partidul Verde
After=network.target

[Service]
WorkingDirectory=/var/www/partidul-verde
EnvironmentFile=/var/www/partidul-verde/.env
ExecStart=/usr/bin/node dist/server/index.mjs
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable --now partidul-verde
```

Dacă `dist/server/index.mjs` nu pornește direct (buildul e orientat spre Cloudflare), rulează în schimb:
`ExecStart=/root/.bun/bin/bun run start` sau construiește cu preset Node:
`NITRO_PRESET=node-server bun run build` — apoi `node .output/server/index.mjs` (port 3000 implicit).

## 5. Nginx ca reverse proxy + HTTPS

```nginx
# /etc/nginx/sites-available/partidul-verde
server {
    listen 80;
    server_name domeniul-tau.ro;
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/partidul-verde /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d domeniul-tau.ro
```

## 6. După mutare — obligatoriu

1. **EuPlătesc**: în contul de comerciant setează adresa de notificare la
   `https://domeniul-tau.ro/api/public/euplatesc/callback` — altfel donațiile nu se confirmă.
2. **Baza de date**: codul din arhivă folosește în continuare backendul Lovable Cloud (funcționează de oriunde).
   Dacă vrei baza de date în contul tău propriu, folosește fișierul `migrare_completa.sql` livrat separat
   și actualizează cheile din `.env`.
3. **Actualizări**: la fiecare modificare — `git pull` (sau re-uploadezi), `bun install`, `bun run build`,
   `sudo systemctl restart partidul-verde`.
