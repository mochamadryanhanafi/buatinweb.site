# Deploy — buatinweb.site

Target: **Cloudflare Pages** (web, Astro static) + **Cloudflare Workers** (API, Hono) + **D1** (SQLite).

```
apps/web   → Pages   (buatinweb-site)
apps/api   → Worker  (bw-api)
D1         → bw-briefs
```

## 0. Prasyarat

- Akun Cloudflare + domain `buatinweb.site` sudah di Cloudflare DNS.
- bun ≥ 1.1, wrangler (sudah ada di devDependencies).
- Login sekali:

```sh
bun install
bunx wrangler login
```

## 1. API (Worker + D1) — deploy ini dulu

Urutan wajib, karena web butuh URL API.

1. Buat database D1:

   ```sh
   cd apps/api
   bunx wrangler d1 create bw-briefs
   ```

   Output berisi `database_id = "xxxx-xxxx-..."`. Salin.

2. Edit `apps/api/wrangler.toml`, ganti baris:

   ```toml
   database_id = "REPLACE_WITH_wrangler_d1_create_OUTPUT"
   ```

   dengan id dari langkah 1.

3. Cek `ALLOWED_ORIGINS` di `wrangler.toml` — harus memuat origin web production (sudah ada `https://buatinweb.site`, `https://www.buatinweb.site`). Tambah origin preview Pages kalau perlu, misal `https://buatinweb-site.pages.dev`.

4. Buat tabel di D1 remote:

   ```sh
   bun run db:init
   ```

5. Deploy Worker:

   ```sh
   bun run deploy
   ```

   Catat URL output, contoh: `https://bw-api.<akun>.workers.dev`.

6. Cek hidup:

   ```sh
   curl https://bw-api.<akun>.workers.dev/api/health
   ```

   Harus balas `{"ok":true}`.

### (Opsional) custom domain API

Di dashboard Workers → `bw-api` → Settings → Domains & Routes → tambah `api.buatinweb.site`. Lalu pakai URL itu di langkah 2 web.

## 2. Web (Pages)

1. Set URL API ke build-time env:

   ```sh
   cd apps/web
   echo 'PUBLIC_API_URL=https://bw-api.<akun>.workers.dev' > .env
   ```

   (`.env` di-gitignore. Jangan ada trailing slash.)

2. Buat project Pages sekali (nama harus sama dengan script `deploy` di `apps/web/package.json`):

   ```sh
   bunx wrangler pages project create buatinweb-site --production-branch master
   ```

3. Build + deploy:

   ```sh
   bun run deploy
   ```

   = `astro build && wrangler pages deploy dist --project-name buatinweb-site`.

4. Custom domain: dashboard Pages → `buatinweb-site` → Custom domains → tambah `buatinweb.site` dan `www.buatinweb.site`. Cloudflare set DNS otomatis.

5. Cek:
   - `https://buatinweb.site/` → redirect ke `/id/` (via `public/_redirects`).
   - `https://buatinweb.site/en/` tampil.
   - Kirim brief dari `/id/contact` → status "Brief diterima" + ref `BW-...`.
   - Lihat data: `cd apps/api && bunx wrangler d1 execute bw-briefs --remote --command "select ref,name,service,created_at from briefs order by id desc limit 5"`.

## 3. Deploy ulang (rutin)

```sh
# dari root repo
bun run deploy:api    # hanya kalau apps/api atau packages/shared berubah
bun run deploy:web    # kalau apps/web / packages/shared berubah
```

Ubah harga/katalog = edit `packages/shared/bw-data.js` → deploy **keduanya** (API validasi kode layanan, web render harga).

## 4. Lokal

```sh
cd apps/api && bun run db:init:local   # sekali, buat tabel di D1 lokal
cd ../.. && bun run dev                # web :4321, api :8787
```

`apps/web/.env` lokal: `PUBLIC_API_URL=http://localhost:8787`. Origin `http://localhost:4321` sudah ada di `ALLOWED_ORIGINS`.

## 5. Troubleshooting

| Gejala | Sebab | Fix |
|---|---|---|
| Form: "Layanan tidak tersedia" / 503 | D1 binding salah / tabel belum ada | cek `database_id`, jalankan `bun run db:init` |
| Form gagal, console `CORS` | origin web tidak ada di `ALLOWED_ORIGINS` | tambah origin di `wrangler.toml`, `deploy:api` |
| Form kirim ke `/api/brief` relatif, 404 | `PUBLIC_API_URL` kosong saat build | isi `.env`, build ulang |
| 429 | rate limit 5 brief/menit per IP (hitung di D1) | normal; tunggu 1 menit atau ubah angka `5` di `apps/api/src/index.ts` |
| `/` tampil 404 di Pages | `public/_redirects` tidak ikut | pastikan ada di `dist/_redirects` setelah build |

## 6. Rollback

- Pages: dashboard → Deployments → pilih deployment lama → **Rollback**.
- Worker: `bunx wrangler rollback` di `apps/api`, atau dashboard → Deployments → Rollback.
- D1 tidak otomatis rollback. Backup sebelum ubah schema: `bunx wrangler d1 export bw-briefs --remote --output backup.sql`.
