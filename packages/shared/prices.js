// Buatinweb price book — SINGLE SOURCE OF TRUTH for catalog, pricing, sections, groups.
//
// HOW TO UPDATE A PRICE:
//   1. Find the item by its `code` (e.g. "WEB-01") in ITEMS below — one per line, grouped by section.
//   2. Edit `p` (price in IDR, no decimals). For ranges also edit `max`.
//   3. Bump VERSION below and update the matching string in:
//      - apps/web/src/components/Footer.astro (FT.en.prices / FT.id.prices)
//      - apps/web/src/i18n/home.js (footPrices, priceUpdated)
//   4. Run `bun run build` in apps/web to verify, then deploy.
//
// ITEM FIELDS:
//   code  SKU, e.g. "WEB-01" — used in URLs (lowercased) and cross-refs.
//   sec   Section key, e.g. "A.1" — must exist in SECTIONS below.
//   id/en Service name, Indonesian / English.
//   p     Price in IDR. 0 when type is "q" (quote-only).
//   max   Upper bound, only used when type is "r" (range); else 0.
//   type  "f" fixed | "s" starting-from | "r" range | "q" quote-only | "a" actual-cost.
//   bill  "o" one-time | "m" monthly | "y" yearly.
//   sid/sen  Scope/inclusions text, Indonesian / English.
//
// RENEW holds year-2+ recurring pricing — only for items with ongoing hosting;
// most items have no entry here (no published separate renewal price).

export const VERSION = "2026-10-27.v1";

// Top-level categories (nav/filter tabs).
export const GROUPS = [
  { k: "web", en: "Websites", id: "Website" },
  { k: "app", en: "Applications", id: "Aplikasi" },
  { k: "tech", en: "Technical support", id: "Technical support" },
  { k: "data", en: "Data services", id: "Layanan data" },
  { k: "ai", en: "AI & ML", id: "AI & ML" },
  { k: "care", en: "Security & maintenance", id: "Keamanan & maintenance" },
  { k: "extra", en: "Add-ons & bundles", id: "Add-on & bundel" },
];

// PRD sub-sections, each belongs to one GROUP via `g`.
export const SECTIONS = [
  { k: "A.1", g: "web", en: "Website development", id: "Pengembangan website" },
  { k: "A.2", g: "app", en: "Web application & backend", id: "Aplikasi web & backend" },
  { k: "A.3", g: "ai", en: "AI integration & automation", id: "Integrasi AI & otomasi" },
  { k: "A.4", g: "ai", en: "Machine learning & data science", id: "Machine learning & data science" },
  { k: "A.5", g: "tech", en: "Bug fixing & troubleshooting", id: "Perbaikan bug & troubleshooting" },
  { k: "A.6", g: "tech", en: "Deployment & DevOps", id: "Deployment & DevOps" },
  { k: "A.7", g: "tech", en: "Server, DNS & infrastructure", id: "Server, DNS & infrastruktur" },
  { k: "A.8", g: "data", en: "Spreadsheet & lightweight data", id: "Spreadsheet & data ringan" },
  { k: "A.9", g: "data", en: "Database services", id: "Layanan database" },
  { k: "A.10", g: "data", en: "Database management packages", id: "Paket pengelolaan database" },
  { k: "A.13", g: "care", en: "Security, backup & maintenance", id: "Keamanan, backup & maintenance" },
  { k: "A.14", g: "extra", en: "Website & integration add-ons", id: "Add-on website & integrasi" },
  { k: "A.15", g: "extra", en: "Ready-to-buy bundles", id: "Bundel siap beli" },
];

// Full catalog, one entry per line, grouped by section for readability.
export const ITEMS = [

  // A.1 — Website development
  { code: "WEB-01", sec: "A.1", id: "Compro Mini", en: "Compro Mini", p: 99000, max: 0, type: "f", bill: "o", sid: "1 halaman template, maksimal 5 section, subdomain, 1 revisi minor.", sen: "1 template page, up to 5 sections, subdomain, 1 minor revision." },
  { code: "WEB-02", sec: "A.1", id: "Mini Domain Sendiri", en: "Mini — own domain", p: 249000, max: 0, type: "f", bill: "o", sid: "Cakupan Mini + setup 1 domain yang sudah dimiliki klien; bukan tambahan WEB-01.", sen: "Mini scope + setup of 1 domain the client already owns; not an add-on to WEB-01." },
  { code: "WEB-03", sec: "A.1", id: "Mini Domain Baru", en: "Mini — new domain", p: 399000, max: 0, type: "s", bill: "o", sid: "Mini + setup domain + anggaran registrasi .com Rp150.000; selisih biaya aktual ditambahkan.", sen: "Mini + domain setup + IDR 150,000 .com registration budget; any difference is added at cost." },
  { code: "WEB-04", sec: "A.1", id: "Landing Page", en: "Landing Page", p: 299000, max: 0, type: "s", bill: "o", sid: "1 halaman template, 6-8 section, CTA, 2 revisi minor; subdomain.", sen: "1 template page, 6–8 sections, CTA, 2 minor revisions; subdomain." },
  { code: "WEB-05", sec: "A.1", id: "Compro Starter", en: "Compro Starter", p: 699000, max: 0, type: "s", bill: "o", sid: "Maksimal 3 halaman semi-custom, SEO dasar, subdomain, 2 revisi minor.", sen: "Up to 3 semi-custom pages, basic SEO, subdomain, 2 minor revisions." },
  { code: "WEB-06", sec: "A.1", id: "Compro Business", en: "Compro Business", p: 1699000, max: 0, type: "s", bill: "o", sid: "Maksimal 5 halaman, semi-custom, anggaran .com Rp249.000, 3 revisi minor.", sen: "Up to 5 semi-custom pages, IDR 249,000 .com budget, 3 minor revisions." },
  { code: "WEB-07", sec: "A.1", id: "Compro Professional", en: "Compro Professional", p: 4999000, max: 0, type: "s", bill: "o", sid: "Maksimal 10 halaman, desain khusus, anggaran .com Rp249.000, 3 tahap review.", sen: "Up to 10 pages, custom design, IDR 249,000 .com budget, 3 review stages." },
  { code: "WEB-08", sec: "A.1", id: "Katalog Produk", en: "Product catalogue", p: 1499000, max: 0, type: "s", bill: "o", sid: "Maksimal 30 produk awal, kategori, pemesanan WhatsApp; tanpa keranjang/pembayaran.", sen: "Up to 30 initial products, categories, WhatsApp ordering; no cart or payments." },
  { code: "WEB-09", sec: "A.1", id: "Blog / CMS", en: "Blog / CMS", p: 2999000, max: 0, type: "s", bill: "o", sid: "Artikel, 1 peran editor, CRUD konten, 5 artikel awal, database dasar.", sen: "Articles, 1 editor role, content CRUD, 5 starter articles, basic database." },
  { code: "WEB-10", sec: "A.1", id: "E-Commerce Basic", en: "E-Commerce Basic", p: 5999000, max: 0, type: "s", bill: "o", sid: "20 produk awal, keranjang, 1 payment gateway, pesanan; tanpa marketplace multi-vendor.", sen: "20 initial products, cart, 1 payment gateway, orders; no multi-vendor marketplace." },
  { code: "WEB-11", sec: "A.1", id: "Custom Frontend", en: "Custom Frontend", p: 3000000, max: 0, type: "s", bill: "o", sid: "1-3 template halaman khusus; backend, CMS, domain, dan hosting terpisah.", sen: "1–3 custom page templates; backend, CMS, domain and hosting are separate." },

  // A.2 — Web application & backend
  { code: "APP-01", sec: "A.2", id: "Booking System", en: "Booking System", p: 4499000, max: 0, type: "s", bill: "o", sid: "1 bisnis, jadwal, reservasi, dashboard; pembayaran bukan bawaan.", sen: "1 business, schedules, reservations, dashboard; payments not included." },
  { code: "APP-02", sec: "A.2", id: "Custom API / Backend", en: "Custom API / Backend", p: 3999000, max: 0, type: "s", bill: "o", sid: "Maksimal 5 endpoint bisnis, autentikasi dasar, 1 database, dokumentasi API.", sen: "Up to 5 business endpoints, basic auth, 1 database, API documentation." },
  { code: "APP-03", sec: "A.2", id: "Dashboard Analytics", en: "Analytics dashboard", p: 5999000, max: 0, type: "s", bill: "o", sid: "1 sumber data terstruktur, maksimal 5 metrik/grafik, filter dan ekspor.", sen: "1 structured data source, up to 5 metrics/charts, filters and export." },
  { code: "APP-04", sec: "A.2", id: "Inventory System", en: "Inventory System", p: 7999000, max: 0, type: "s", bill: "o", sid: "1 gudang, produk, stok masuk/keluar, laporan; bukan ERP akuntansi.", sen: "1 warehouse, products, stock in/out, reports; not an accounting ERP." },
  { code: "APP-05", sec: "A.2", id: "Web Application MVP", en: "Web Application MVP", p: 9999000, max: 0, type: "s", bill: "o", sid: "Login, 2 peran, database, maksimal 3 modul sederhana dengan acceptance criteria.", sen: "Login, 2 roles, database, up to 3 simple modules with acceptance criteria." },
  { code: "APP-06", sec: "A.2", id: "LMS / E-Learning", en: "LMS / E-Learning", p: 12999000, max: 0, type: "s", bill: "o", sid: "Kursus, materi, akun, progres; video hosting/ujian kompleks terpisah.", sen: "Courses, materials, accounts, progress; video hosting/complex exams separate." },
  { code: "APP-07", sec: "A.2", id: "SaaS MVP", en: "SaaS MVP", p: 19999000, max: 0, type: "s", bill: "o", sid: "Tenant isolation dasar, subscription 1 provider, dashboard; discovery wajib.", sen: "Basic tenant isolation, 1 subscription provider, dashboard; discovery required." },
  { code: "APP-08", sec: "A.2", id: "Enterprise System", en: "Enterprise System", p: 49999000, max: 0, type: "s", bill: "o", sid: "Discovery dan delivery bertahap; scope, SSO, integrasi dan SLA ditentukan quotation.", sen: "Phased discovery and delivery; scope, SSO, integrations and SLA set by quotation." },

  // A.3 — AI integration & automation
  { code: "AI-01", sec: "A.3", id: "Workflow Automation", en: "Workflow Automation", p: 1499000, max: 0, type: "s", bill: "o", sid: "1 alur, maksimal 3 integrasi sederhana; akun dan API disediakan klien.", sen: "1 flow, up to 3 simple integrations; accounts and APIs provided by client." },
  { code: "AI-02", sec: "A.3", id: "AI Chatbot Basic", en: "AI Chatbot Basic", p: 2999000, max: 0, type: "s", bill: "o", sid: "1 widget website, 1 use case, system prompt, pembatasan biaya; API terpisah.", sen: "1 website widget, 1 use case, system prompt, cost limits; API billed separately." },
  { code: "AI-03", sec: "A.3", id: "AI Customer Support", en: "AI Customer Support", p: 4999000, max: 0, type: "s", bill: "o", sid: "1 knowledge base kecil, maksimal 20 FAQ, handoff admin; bukan agen tanpa pengawasan.", sen: "1 small knowledge base, up to 20 FAQs, admin handoff; not an unsupervised agent." },
  { code: "AI-04", sec: "A.3", id: "AI Document Processing", en: "AI Document Processing", p: 5999000, max: 0, type: "s", bill: "o", sid: "1 tipe dokumen, maksimal 10 field, sampel evaluasi dan review hasil ekstraksi.", sen: "1 document type, up to 10 fields, evaluation samples and extraction review." },
  { code: "AI-05", sec: "A.3", id: "RAG Knowledge Assistant", en: "RAG Knowledge Assistant", p: 7999000, max: 0, type: "s", bill: "o", sid: "1 sumber dokumen, maksimal 100 dokumen awal/1.000 halaman, retrieval dan evaluasi.", sen: "1 document source, up to 100 docs / 1,000 pages, retrieval and evaluation." },
  { code: "AI-06", sec: "A.3", id: "AI Agent Custom", en: "Custom AI agent", p: 14999000, max: 0, type: "s", bill: "o", sid: "1 workflow, maksimal 3 tool, human approval untuk aksi berisiko, log dan evaluasi.", sen: "1 workflow, up to 3 tools, human approval for risky actions, logs and evaluation." },
  { code: "AI-07", sec: "A.3", id: "Multi-Agent System", en: "Multi-Agent System", p: 29999000, max: 0, type: "s", bill: "o", sid: "Discovery, orkestrasi terbatas, observability; hanya bila satu agent tidak mencukupi.", sen: "Discovery, limited orchestration, observability; only when one agent is not enough." },

  // A.4 — Machine learning & data science
  { code: "ML-01", sec: "A.4", id: "Data Analysis", en: "Data Analysis", p: 2999000, max: 0, type: "s", bill: "o", sid: "1 dataset siap pakai, cleaning ringan, EDA, visualisasi dan laporan.", sen: "1 ready dataset, light cleaning, EDA, visualisation and report." },
  { code: "ML-02", sec: "A.4", id: "ML Proof of Concept", en: "ML Proof of Concept", p: 5999000, max: 0, type: "s", bill: "o", sid: "1 target prediksi, baseline, validasi terpisah, laporan; belum production.", sen: "1 prediction target, baseline, held-out validation, report; not production." },
  { code: "ML-03", sec: "A.4", id: "Predictive Analytics", en: "Predictive Analytics", p: 9999000, max: 0, type: "s", bill: "o", sid: "1 masalah regresi/forecasting, evaluasi sesuai waktu, prototipe API.", sen: "1 regression/forecasting problem, time-aware evaluation, prototype API." },
  { code: "ML-04", sec: "A.4", id: "NLP / Text Classification", en: "NLP / Text Classification", p: 12999000, max: 0, type: "s", bill: "o", sid: "1 tugas klasifikasi, data berlabel tersedia, preprocessing dan evaluasi per kelas.", sen: "1 classification task, labelled data available, preprocessing and per-class evaluation." },
  { code: "ML-05", sec: "A.4", id: "Recommendation System", en: "Recommendation System", p: 14999000, max: 0, type: "s", bill: "o", sid: "1 use case rekomendasi, baseline, evaluasi offline; integrasi besar terpisah.", sen: "1 recommendation use case, baseline, offline evaluation; large integrations separate." },
  { code: "ML-06", sec: "A.4", id: "Computer Vision", en: "Computer Vision", p: 19999000, max: 0, type: "s", bill: "o", sid: "1 tugas klasifikasi/deteksi gambar, dataset tersedia; anotasi dan GPU terpisah.", sen: "1 image classification/detection task, dataset available; labelling and GPU separate." },
  { code: "ML-07", sec: "A.4", id: "Deep Learning Custom", en: "Deep Learning Custom", p: 24999000, max: 0, type: "s", bill: "o", sid: "Eksperimen/fine-tuning terbatas dengan budget compute disepakati; bukan foundation model baru.", sen: "Limited experiments/fine-tuning within an agreed compute budget; not a new foundation model." },
  { code: "ML-08", sec: "A.4", id: "ML Production / MLOps", en: "ML Production / MLOps", p: 39999000, max: 0, type: "s", bill: "o", sid: "1 pipeline training/inference, versioning, deployment, monitoring dan rollback model.", sen: "1 training/inference pipeline, versioning, deployment, monitoring and model rollback." },

  // A.5 — Bug fixing & troubleshooting
  { code: "BUG-01", sec: "A.5", id: "Diagnosis Error", en: "Error diagnosis", p: 99000, max: 0, type: "s", bill: "o", sid: "1 kasus, maksimal 45 menit investigasi; laporan penyebab/next step, bukan jaminan fix.", sen: "1 case, up to 45 minutes of investigation; cause/next-step report, not a guaranteed fix." },
  { code: "BUG-02", sec: "A.5", id: "Fix HTML / CSS / Responsive", en: "Fix HTML / CSS / responsive", p: 99000, max: 0, type: "s", bill: "o", sid: "1 defect tampilan yang dapat direproduksi pada 1 komponen.", sen: "1 reproducible display defect in 1 component." },
  { code: "BUG-03", sec: "A.5", id: "Fix JavaScript", en: "Fix JavaScript", p: 149000, max: 0, type: "s", bill: "o", sid: "1 defect frontend terisolasi; tidak termasuk refactor besar.", sen: "1 isolated frontend defect; no major refactor." },
  { code: "BUG-04", sec: "A.5", id: "Fix API", en: "Fix API", p: 199000, max: 0, type: "s", bill: "o", sid: "1 endpoint/kontrak API yang bermasalah.", sen: "1 failing endpoint/API contract." },
  { code: "BUG-05", sec: "A.5", id: "Fix PHP / Laravel", en: "Fix PHP / Laravel", p: 199000, max: 0, type: "s", bill: "o", sid: "1 bug terisolasi pada aplikasi yang dapat dijalankan.", sen: "1 isolated bug in a runnable application." },
  { code: "BUG-06", sec: "A.5", id: "Fix Node.js / Go", en: "Fix Node.js / Go", p: 249000, max: 0, type: "s", bill: "o", sid: "1 bug backend terisolasi; bukan upgrade arsitektur.", sen: "1 isolated backend bug; not an architecture upgrade." },
  { code: "BUG-07", sec: "A.5", id: "Fix Query Database", en: "Fix database query", p: 249000, max: 0, type: "s", bill: "o", sid: "1 query/error SQL; perubahan schema besar terpisah.", sen: "1 SQL query/error; large schema changes separate." },
  { code: "BUG-08", sec: "A.5", id: "Fix Login / Auth", en: "Fix login / auth", p: 299000, max: 0, type: "s", bill: "o", sid: "1 alur autentikasi; wajib akses sah dan uji regresi.", sen: "1 auth flow; legitimate access and regression test required." },
  { code: "BUG-09", sec: "A.5", id: "Fix Docker / Container", en: "Fix Docker / Container", p: 299000, max: 0, type: "s", bill: "o", sid: "1 service/container; akses konfigurasi diperlukan.", sen: "1 service/container; configuration access required." },
  { code: "BUG-10", sec: "A.5", id: "Fix Deployment Gagal", en: "Fix failed deployment", p: 249000, max: 0, type: "s", bill: "o", sid: "1 pipeline/target deploy yang gagal; hosting terpisah.", sen: "1 failing pipeline/deploy target; hosting separate." },
  { code: "BUG-11", sec: "A.5", id: "Fix Payment Gateway", en: "Fix Payment Gateway", p: 399000, max: 0, type: "s", bill: "o", sid: "1 integrasi, sandbox/replay aman; tidak memproses pembayaran tanpa izin.", sen: "1 integration, safe sandbox/replay; never processes payments without permission." },
  { code: "BUG-12", sec: "A.5", id: "Optimasi Performa Web", en: "Web performance optimisation", p: 499000, max: 0, type: "s", bill: "o", sid: "Audit 1 halaman dan perbaikan prioritas; tidak menjanjikan skor tertentu.", sen: "Audit of 1 page and priority fixes; no specific score promised." },
  { code: "BUG-13", sec: "A.5", id: "Debug Multi-Service", en: "Debug Multi-Service", p: 999000, max: 0, type: "s", bill: "o", sid: "Investigasi lintas service; scope lanjutan ditaksir setelah diagnosis.", sen: "Cross-service investigation; further scope estimated after diagnosis." },

  // A.6 — Deployment & DevOps
  { code: "DEP-01", sec: "A.6", id: "Deploy Website Statis", en: "Deploy static website", p: 99000, max: 0, type: "s", bill: "o", sid: "1 build siap rilis, 1 environment; tanpa DNS domain baru/bug fixing.", sen: "1 release-ready build, 1 environment; no new domain DNS or bug fixing." },
  { code: "DEP-02", sec: "A.6", id: "Deploy Cloudflare Workers", en: "Deploy Cloudflare Workers", p: 149000, max: 0, type: "s", bill: "o", sid: "1 Worker yang kompatibel, binding/environment dasar.", sen: "1 compatible Worker, basic bindings/environment." },
  { code: "DEP-03", sec: "A.6", id: "Deploy Vercel / Netlify", en: "Deploy Vercel / Netlify", p: 149000, max: 0, type: "s", bill: "o", sid: "1 proyek dan konfigurasi build; paket provider sesuai penggunaan komersial.", sen: "1 project and build config; provider plan must allow commercial use." },
  { code: "DEP-04", sec: "A.6", id: "Deploy React / Svelte", en: "Deploy React / Svelte", p: 199000, max: 0, type: "s", bill: "o", sid: "1 frontend dengan build yang sudah berhasil.", sen: "1 frontend whose build already succeeds." },
  { code: "DEP-05", sec: "A.6", id: "Deploy PHP / Laravel", en: "Deploy PHP / Laravel", p: 299000, max: 0, type: "s", bill: "o", sid: "1 aplikasi pada server siap pakai, environment dan smoke test.", sen: "1 app on a ready server, environment and smoke test." },
  { code: "DEP-06", sec: "A.6", id: "Deploy Node.js", en: "Deploy Node.js", p: 349000, max: 0, type: "s", bill: "o", sid: "1 backend, process/container dan health check.", sen: "1 backend, process/container and health check." },
  { code: "DEP-07", sec: "A.6", id: "Deploy Golang", en: "Deploy Go", p: 399000, max: 0, type: "s", bill: "o", sid: "1 binary/service, environment, health check dan restart policy.", sen: "1 binary/service, environment, health check and restart policy." },
  { code: "DEP-08", sec: "A.6", id: "Deploy Fullstack", en: "Deploy full-stack", p: 599000, max: 0, type: "s", bill: "o", sid: "1 frontend + 1 backend + koneksi 1 DB yang tersedia.", sen: "1 frontend + 1 backend + connection to 1 existing DB." },
  { code: "DEP-09", sec: "A.6", id: "Setup Docker Compose", en: "Docker Compose setup", p: 499000, max: 0, type: "s", bill: "o", sid: "Maksimal 3 service, health check dan dokumentasi menjalankan.", sen: "Up to 3 services, health checks and run documentation." },
  { code: "DEP-10", sec: "A.6", id: "Reverse Proxy Nginx / Caddy", en: "Reverse Proxy Nginx / Caddy", p: 249000, max: 0, type: "s", bill: "o", sid: "1 aplikasi/domain, routing dan HTTPS sesuai akses tersedia.", sen: "1 app/domain, routing and HTTPS given available access." },
  { code: "DEP-11", sec: "A.6", id: "CI/CD GitHub Actions", en: "CI/CD with GitHub Actions", p: 599000, max: 0, type: "s", bill: "o", sid: "1 repositori, test/build/deploy ke 1 environment dengan secret terbatas.", sen: "1 repository, test/build/deploy to 1 environment with scoped secrets." },
  { code: "DEP-12", sec: "A.6", id: "Staging + Production", en: "Staging + Production", p: 799000, max: 0, type: "s", bill: "o", sid: "2 environment terpisah; resource dan database tidak tercampur.", sen: "2 separate environments; resources and databases never mixed." },
  { code: "DEP-13", sec: "A.6", id: "Low-Downtime Deployment", en: "Low-Downtime Deployment", p: 1499000, max: 0, type: "s", bill: "o", sid: "Strategi rollout/rollback; zero downtime hanya setelah kompatibilitas terbukti.", sen: "Rollout/rollback strategy; zero downtime only once compatibility is proven." },
  { code: "DEP-14", sec: "A.6", id: "Migrasi Antarserver", en: "Server-to-server migration", p: 999000, max: 0, type: "s", bill: "o", sid: "1 aplikasi, rencana backup/cutover/rollback; ukuran data disepakati.", sen: "1 app, backup/cutover/rollback plan; data size agreed." },

  // A.7 — Server, DNS & infrastructure
  { code: "INF-01", sec: "A.7", id: "Setup DNS", en: "DNS setup", p: 99000, max: 0, type: "s", bill: "o", sid: "1 domain, maksimal 5 record; jangan menimpa email aktif tanpa persetujuan.", sen: "1 domain, up to 5 records; never overwrites live email without approval." },
  { code: "INF-02", sec: "A.7", id: "Setup SSL / HTTPS", en: "SSL / HTTPS setup", p: 99000, max: 0, type: "s", bill: "o", sid: "1 hostname, sertifikat dan redirect; akses DNS/server diperlukan.", sen: "1 hostname, certificate and redirect; DNS/server access required." },
  { code: "INF-03", sec: "A.7", id: "Cloudflare DNS & Proxy", en: "Cloudflare DNS & Proxy", p: 149000, max: 0, type: "s", bill: "o", sid: "1 zone, pengecekan proxy dan origin TLS.", sen: "1 zone, proxy check and origin TLS." },
  { code: "INF-04", sec: "A.7", id: "WAF Dasar", en: "Basic WAF", p: 299000, max: 0, type: "s", bill: "o", sid: "Aturan dasar sesuai fitur paket provider; bukan pentest atau anti-hack guarantee.", sen: "Basic rules within the provider plan; not a pentest or anti-hack guarantee." },
  { code: "INF-05", sec: "A.7", id: "Email Domain / SMTP", en: "Domain email / SMTP", p: 249000, max: 0, type: "s", bill: "o", sid: "1 domain, maksimal 2 mailbox/account, SPF/DKIM/DMARC jika didukung.", sen: "1 domain, up to 2 mailboxes, SPF/DKIM/DMARC where supported." },
  { code: "INF-06", sec: "A.7", id: "Setup VPS Linux", en: "Linux VPS setup", p: 399000, max: 0, type: "s", bill: "o", sid: "1 VPS, user non-root, update dasar, SSH; server belum termasuk.", sen: "1 VPS, non-root user, base updates, SSH; server not included." },
  { code: "INF-07", sec: "A.7", id: "Setup Web Server", en: "Web server setup", p: 299000, max: 0, type: "s", bill: "o", sid: "1 Nginx/Apache/Caddy, virtual host dan service management.", sen: "1 Nginx/Apache/Caddy, virtual host and service management." },
  { code: "INF-08", sec: "A.7", id: "Setup Docker Engine", en: "Docker Engine setup", p: 299000, max: 0, type: "s", bill: "o", sid: "1 server Linux, instalasi, validasi dan akses terbatas.", sen: "1 Linux server, install, validation and limited access." },
  { code: "INF-09", sec: "A.7", id: "Monitoring Uptime", en: "Uptime monitoring", p: 249000, max: 0, type: "s", bill: "o", sid: "Maksimal 3 endpoint dan 1 kanal alert.", sen: "Up to 3 endpoints and 1 alert channel." },
  { code: "INF-10", sec: "A.7", id: "Firewall / SSH Hardening", en: "Firewall / SSH Hardening", p: 399000, max: 0, type: "s", bill: "o", sid: "1 server; backup konfigurasi dan akses pemulihan sebelum perubahan.", sen: "1 server; config backup and recovery access before changes." },
  { code: "INF-11", sec: "A.7", id: "Scheduled Backup", en: "Scheduled Backup", p: 399000, max: 0, type: "s", bill: "o", sid: "1 sumber data, 1 tujuan backup, retensi dan 1 uji restore.", sen: "1 data source, 1 backup target, retention and 1 restore test." },
  { code: "INF-12", sec: "A.7", id: "Logging & Monitoring", en: "Logging & Monitoring", p: 599000, max: 0, type: "s", bill: "o", sid: "1 aplikasi, error log, health metric dan alert dasar.", sen: "1 app, error logs, health metrics and basic alerts." },
  { code: "INF-13", sec: "A.7", id: "Audit Infrastruktur", en: "Infrastructure audit", p: 799000, max: 0, type: "s", bill: "o", sid: "1 server/proyek cloud, temuan dan prioritas; remediasi terpisah.", sen: "1 server/cloud project, findings and priorities; remediation separate." },
  { code: "INF-14", sec: "A.7", id: "Production Server Setup", en: "Production Server Setup", p: 1499000, max: 0, type: "s", bill: "o", sid: "1 server, proxy, TLS, firewall, backup, monitoring dasar; tidak termasuk kode aplikasi.", sen: "1 server, proxy, TLS, firewall, backup, basic monitoring; app code not included." },

  // A.8 — Spreadsheet & lightweight data
  { code: "SHT-01", sec: "A.8", id: "Spreadsheet Sederhana", en: "Simple spreadsheet", p: 99000, max: 0, type: "s", bill: "o", sid: "1 file, maksimal 3 tab, struktur input dan format dasar.", sen: "1 file, up to 3 tabs, input structure and basic formatting." },
  { code: "SHT-02", sec: "A.8", id: "Formula Otomatis", en: "Automated formulas", p: 199000, max: 0, type: "s", bill: "o", sid: "1 file, maksimal 10 formula/aturan yang disepakati.", sen: "1 file, up to 10 agreed formulas/rules." },
  { code: "SHT-03", sec: "A.8", id: "Dashboard Spreadsheet", en: "Spreadsheet dashboard", p: 299000, max: 0, type: "s", bill: "o", sid: "1 sumber data, maksimal 5 indikator/grafik.", sen: "1 data source, up to 5 indicators/charts." },
  { code: "SHT-04", sec: "A.8", id: "Google Forms ke Sheets", en: "Google Forms to Sheets", p: 199000, max: 0, type: "s", bill: "o", sid: "1 formulir, maksimal 15 field, 1 spreadsheet tujuan.", sen: "1 form, up to 15 fields, 1 target spreadsheet." },
  { code: "SHT-05", sec: "A.8", id: "Form Web ke Sheets", en: "Web form to Sheets", p: 299000, max: 0, type: "s", bill: "o", sid: "1 formulir yang sudah ada, maksimal 10 field, integrasi append dasar.", sen: "1 existing form, up to 10 fields, basic append integration." },
  { code: "SHT-06", sec: "A.8", id: "Spreadsheet as Storage", en: "Spreadsheet as Storage", p: 399000, max: 0, type: "s", bill: "o", sid: "1 formulir baru, maksimal 15 field, validasi, endpoint aman dan dokumentasi.", sen: "1 new form, up to 15 fields, validation, secure endpoint and docs." },
  { code: "SHT-07", sec: "A.8", id: "Apps Script Automation", en: "Apps Script Automation", p: 499000, max: 0, type: "s", bill: "o", sid: "1 workflow, 1 trigger dan error handling dasar.", sen: "1 workflow, 1 trigger and basic error handling." },
  { code: "SHT-08", sec: "A.8", id: "Sinkronisasi Sheets / API", en: "Sheets / API sync", p: 699000, max: 0, type: "s", bill: "o", sid: "1 sumber-tujuan, 1 arah; sinkronisasi dua arah memerlukan quotation.", sen: "1 source-target, one direction; two-way sync needs a quotation." },
  { code: "SHT-09", sec: "A.8", id: "Import / Export CSV Excel", en: "Import / export CSV, Excel", p: 299000, max: 0, type: "s", bill: "o", sid: "1 format terstruktur, mapping kolom dan validasi dasar.", sen: "1 structured format, column mapping and basic validation." },
  { code: "SHT-10", sec: "A.8", id: "Data Cleaning Spreadsheet", en: "Spreadsheet data cleaning", p: 299000, max: 0, type: "s", bill: "o", sid: "1 dataset, aturan duplikasi/format; volume disepakati sebelum mulai.", sen: "1 dataset, duplicate/format rules; volume agreed upfront." },
  { code: "SHT-11", sec: "A.8", id: "Laporan Keuangan Spreadsheet", en: "Spreadsheet financial report", p: 499000, max: 0, type: "s", bill: "o", sid: "Template arus kas/laporan sederhana; bukan audit atau nasihat akuntansi.", sen: "Simple cash-flow/report template; not an audit or accounting advice." },
  { code: "SHT-12", sec: "A.8", id: "Multi-User Workflow", en: "Multi-User Workflow", p: 799000, max: 0, type: "s", bill: "o", sid: "Maksimal 3 peran operasional, 1 alur persetujuan; batas akses diuji.", sen: "Up to 3 operational roles, 1 approval flow; access limits tested." },
  { code: "SHT-13", sec: "A.8", id: "Migrasi Sheets ke Database", en: "Sheets to database migration", p: 999000, max: 0, type: "s", bill: "o", sid: "1 dataset/sumber, mapping schema dan validasi sampel; ukuran disepakati.", sen: "1 dataset/source, schema mapping and sample validation; size agreed." },
  { code: "SHT-14", sec: "A.8", id: "Managed Sheets Support", en: "Managed Sheets Support", p: 49000, max: 0, type: "s", bill: "m", sid: "1 integrasi, pemeriksaan otomatis + maksimal 15 menit bantuan/bulan; tanpa fitur baru.", sen: "1 integration, automated checks + up to 15 minutes help/month; no new features." },

  // A.9 — Database services
  { code: "DB-01", sec: "A.9", id: "Setup SQLite", en: "SQLite setup", p: 149000, max: 0, type: "s", bill: "o", sid: "1 file DB/schema awal dan konfigurasi akses aplikasi.", sen: "1 DB file/initial schema and app access config." },
  { code: "DB-02", sec: "A.9", id: "Setup Cloudflare D1", en: "Cloudflare D1 setup", p: 249000, max: 0, type: "s", bill: "o", sid: "1 DB, binding Worker dan migration awal.", sen: "1 DB, Worker binding and initial migration." },
  { code: "DB-03", sec: "A.9", id: "Setup MySQL / MariaDB", en: "MySQL / MariaDB setup", p: 299000, max: 0, type: "s", bill: "o", sid: "1 instance siap pakai, user terbatas dan koneksi aplikasi.", sen: "1 ready instance, limited user and app connection." },
  { code: "DB-04", sec: "A.9", id: "Setup PostgreSQL", en: "PostgreSQL setup", p: 349000, max: 0, type: "s", bill: "o", sid: "1 instance, database/user, akses jaringan terbatas.", sen: "1 instance, database/user, restricted network access." },
  { code: "DB-05", sec: "A.9", id: "Setup Supabase", en: "Supabase setup", p: 399000, max: 0, type: "s", bill: "o", sid: "1 proyek, konfigurasi koneksi dan RLS bila akses dari client.", sen: "1 project, connection config and RLS for client-side access." },
  { code: "DB-06", sec: "A.9", id: "Database Schema", en: "Database Schema", p: 399000, max: 0, type: "s", bill: "o", sid: "Maksimal 5 tabel relasional, constraint dan diagram sederhana.", sen: "Up to 5 relational tables, constraints and a simple diagram." },
  { code: "DB-07", sec: "A.9", id: "Integrasi Database", en: "Database integration", p: 499000, max: 0, type: "s", bill: "o", sid: "1 modul website yang sudah ada ke 1 database.", sen: "1 existing website module to 1 database." },
  { code: "DB-08", sec: "A.9", id: "CRUD API + DB", en: "CRUD API + DB", p: 999000, max: 0, type: "s", bill: "o", sid: "1 resource, maksimal 5 operasi, validasi dan akses dasar; bukan aplikasi lengkap.", sen: "1 resource, up to 5 operations, validation and basic access; not a full app." },
  { code: "DB-09", sec: "A.9", id: "Database Migration", en: "Database Migration", p: 699000, max: 0, type: "s", bill: "o", sid: "1 schema/dataset, dry run dan verifikasi; volume disepakati.", sen: "1 schema/dataset, dry run and verification; volume agreed." },
  { code: "DB-10", sec: "A.9", id: "Query / Index Optimization", en: "Query / Index Optimization", p: 499000, max: 0, type: "s", bill: "o", sid: "Maksimal 3 query dengan explain/benchmark sebelum dan sesudah.", sen: "Up to 3 queries with before/after explain and benchmark." },
  { code: "DB-11", sec: "A.9", id: "Backup & Restore DB", en: "DB backup & restore", p: 399000, max: 0, type: "s", bill: "o", sid: "1 database, 1 backup dan 1 uji restore ke lokasi non-production.", sen: "1 database, 1 backup and 1 restore test to non-production." },
  { code: "DB-12", sec: "A.9", id: "Database Replication", en: "Database Replication", p: 1999000, max: 0, type: "s", bill: "o", sid: "1 primary dan 1 replica; topology, failover dan biaya compute terpisah.", sen: "1 primary and 1 replica; topology, failover and compute separate." },
  { code: "DB-13", sec: "A.9", id: "Database Audit / Hardening", en: "Database Audit / Hardening", p: 799000, max: 0, type: "s", bill: "o", sid: "1 DB: user, grants, jaringan, backup dan logging.", sen: "1 DB: users, grants, network, backup and logging." },
  { code: "DB-14", sec: "A.9", id: "Performance Tuning DB", en: "DB performance tuning", p: 999000, max: 0, type: "s", bill: "o", sid: "1 workload terukur; target dan batas perubahan disepakati.", sen: "1 measured workload; targets and change limits agreed." },

  // A.10 — Database management packages
  { code: "DBM-01", sec: "A.10", id: "DB Lite Setup", en: "DB Lite Setup", p: 249000, max: 0, type: "s", bill: "o", sid: "SQLite/D1; 1 DB, konfigurasi dasar; alternatif bundel, bukan biaya tambahan DB-02.", sen: "SQLite/D1, 1 DB, base config; a bundle alternative, not an extra charge on DB-02." },
  { code: "DBM-02", sec: "A.10", id: "DB Lite Management", en: "DB Lite Management", p: 49000, max: 0, type: "s", bill: "m", sid: "1 DB, cek otomatis + maksimal 15 menit bantuan/bulan; biaya provider terpisah.", sen: "1 DB, automated checks + up to 15 minutes help/month; provider cost separate." },
  { code: "DBM-03", sec: "A.10", id: "DB Basic Setup", en: "DB Basic Setup", p: 499000, max: 0, type: "s", bill: "o", sid: "Supabase/PostgreSQL terkelola, user/grants dan 1 rencana backup.", sen: "Managed Supabase/PostgreSQL, users/grants and 1 backup plan." },
  { code: "DBM-04", sec: "A.10", id: "DB Basic Management", en: "DB Basic Management", p: 99000, max: 0, type: "s", bill: "m", sid: "1 DB, review bulanan + maksimal 30 menit bantuan/bulan; compute terpisah.", sen: "1 DB, monthly review + up to 30 minutes help/month; compute separate." },
  { code: "DBM-05", sec: "A.10", id: "DB Business Setup", en: "DB Business Setup", p: 999000, max: 0, type: "s", bill: "o", sid: "PostgreSQL/MySQL, konfigurasi operasional dan uji restore.", sen: "PostgreSQL/MySQL, operational config and restore test." },
  { code: "DBM-06", sec: "A.10", id: "DB Business Management", en: "DB Business Management", p: 199000, max: 0, type: "s", bill: "m", sid: "1 DB, review backup + maksimal 60 menit bantuan/bulan; tanpa on-call.", sen: "1 DB, backup review + up to 60 minutes help/month; no on-call." },
  { code: "DBM-07", sec: "A.10", id: "DB Advanced Setup", en: "DB Advanced Setup", p: 2499000, max: 0, type: "s", bill: "o", sid: "Dedicated service dengan discovery, akses, backup dan monitoring.", sen: "Dedicated service with discovery, access, backup and monitoring." },
  { code: "DBM-08", sec: "A.10", id: "DB Advanced Management", en: "DB Advanced Management", p: 499000, max: 0, type: "s", bill: "m", sid: "Review operasional + maksimal 2 jam bantuan/bulan; SLA khusus terpisah.", sen: "Operational review + up to 2 hours help/month; custom SLA separate." },

  // A.13 — Security, backup & maintenance
  { code: "SEC-01", sec: "A.13", id: "Basic Security Check", en: "Basic Security Check", p: 299000, max: 0, type: "s", bill: "o", sid: "1 website, konfigurasi publik dan temuan dasar; bukan pentest menyeluruh.", sen: "1 website, public configuration and basic findings; not a full pentest." },
  { code: "SEC-02", sec: "A.13", id: "Dependency Scan", en: "Dependency Scan", p: 399000, max: 0, type: "s", bill: "o", sid: "1 repositori/stack, triase temuan dependency; remediasi terpisah.", sen: "1 repository/stack, dependency triage; remediation separate." },
  { code: "SEC-03", sec: "A.13", id: "Security Configuration Review", en: "Security Configuration Review", p: 599000, max: 0, type: "s", bill: "o", sid: "1 aplikasi/lingkungan, review auth/header/secrets yang disepakati.", sen: "1 app/environment, agreed auth/header/secrets review." },
  { code: "SEC-04", sec: "A.13", id: "Web Security Audit", en: "Web Security Audit", p: 1499000, max: 0, type: "s", bill: "o", sid: "Scope dan otorisasi tertulis; deliverable laporan, bukan sertifikasi keamanan.", sen: "Written scope and authorisation; a report, not a security certification." },
  { code: "SEC-05", sec: "A.13", id: "Remediasi Kerentanan", en: "Vulnerability remediation", p: 499000, max: 0, type: "s", bill: "o", sid: "1 temuan terkonfirmasi, fix dan retest sesuai scope.", sen: "1 confirmed finding, fix and retest within scope." },
  { code: "SEC-06", sec: "A.13", id: "Setup Backup Otomatis", en: "Automated backup setup", p: 399000, max: 0, type: "s", bill: "o", sid: "Setara INF-11 untuk scope yang sama; tidak boleh ditagih dua kali.", sen: "Equivalent to INF-11 for the same scope; never billed twice." },
  { code: "SEC-07", sec: "A.13", id: "Disaster Recovery Drill", en: "Disaster Recovery Drill", p: 999000, max: 0, type: "s", bill: "o", sid: "1 skenario pemulihan non-production dengan hasil RPO/RTO terukur.", sen: "1 non-production recovery scenario with measured RPO/RTO." },
  { code: "SEC-08", sec: "A.13", id: "Security Monitoring Basic", en: "Security Monitoring Basic", p: 199000, max: 0, type: "s", bill: "m", sid: "Alert otomatis + review terjadwal, maksimal 30 menit/bulan; bukan SOC 24/7.", sen: "Automated alerts + scheduled review, up to 30 minutes/month; not a 24/7 SOC." },
  { code: "SEC-09", sec: "A.13", id: "Website Maintenance", en: "Website Maintenance", p: 149000, max: 0, type: "s", bill: "m", sid: "Maksimal 30 menit pekerjaan minor/bulan, 1 website, tanpa redesign.", sen: "Up to 30 minutes of minor work/month, 1 website, no redesign." },
  { code: "SEC-10", sec: "A.13", id: "Web App Maintenance", en: "Web App Maintenance", p: 499000, max: 0, type: "s", bill: "m", sid: "Maksimal 2 jam/bulan, triase bug dan update kecil; fitur baru terpisah.", sen: "Up to 2 hours/month, bug triage and small updates; new features separate." },
  { code: "SEC-11", sec: "A.13", id: "Managed VPS", en: "Managed VPS", p: 399000, max: 0, type: "s", bill: "m", sid: "1 VPS, patch/review terjadwal, maksimal 1 jam/bulan; compute terpisah.", sen: "1 VPS, scheduled patching/review, up to 1 hour/month; compute separate." },
  { code: "SEC-12", sec: "A.13", id: "Managed Infrastructure", en: "Managed Infrastructure", p: 1499000, max: 0, type: "s", bill: "m", sid: "Scope multi-service, maksimal 4 jam/bulan awal; on-call terpisah.", sen: "Multi-service scope, up to 4 hours/month to start; on-call separate." },
  { code: "SEC-13", sec: "A.13", id: "AI / ML Maintenance", en: "AI / ML Maintenance", p: 1000000, max: 0, type: "s", bill: "m", sid: "Evaluasi/monitoring terjadwal, maksimal 3 jam/bulan; token/GPU/retraining terpisah.", sen: "Scheduled evaluation/monitoring, up to 3 hours/month; tokens/GPU/retraining separate." },

  // A.14 — Website & integration add-ons
  { code: "ADD-01", sec: "A.14", id: "Setup Custom Domain", en: "Custom domain setup", p: 150000, max: 0, type: "f", bill: "o", sid: "1 domain klien ke website yang kompatibel; tidak ditambah bila sudah termasuk paket.", sen: "1 client domain to a compatible website; not added when already in the package." },
  { code: "ADD-02", sec: "A.14", id: "Registrasi Domain", en: "Domain registration", p: 0, max: 0, type: "a", bill: "y", sid: "Biaya registrar aktual + setup jika belum tercakup; kepemilikan atas nama klien.", sen: "Actual registrar cost + setup if not covered; registered in the client’s name." },
  { code: "ADD-03", sec: "A.14", id: "Halaman Statis Tambahan", en: "Extra static page", p: 150000, max: 350000, type: "r", bill: "o", sid: "1 halaman berdasarkan komponen yang sudah tersedia.", sen: "1 page built from existing components." },
  { code: "ADD-04", sec: "A.14", id: "Landing Page Khusus", en: "Campaign landing page", p: 500000, max: 1500000, type: "r", bill: "o", sid: "1 halaman kampanye tambahan; tidak sama dengan WEB-04 template.", sen: "1 extra campaign page; not the same as the WEB-04 template." },
  { code: "ADD-05", sec: "A.14", id: "Desain UI Halaman Custom", en: "Custom page UI design", p: 300000, max: 750000, type: "r", bill: "o", sid: "1 desain halaman; implementasi kode terpisah kecuali dinyatakan.", sen: "1 page design; code implementation separate unless stated." },
  { code: "ADD-06", sec: "A.14", id: "Form Email / Notifikasi", en: "Email form / notifications", p: 250000, max: 500000, type: "r", bill: "o", sid: "1 formulir/tujuan email; biaya pengiriman provider terpisah.", sen: "1 form/email target; provider sending costs separate." },
  { code: "ADD-07", sec: "A.14", id: "Analytics & Search Console", en: "Analytics & Search Console", p: 200000, max: 400000, type: "r", bill: "o", sid: "1 website/properti, event dasar dan verifikasi; akses klien diperlukan.", sen: "1 website/property, basic events and verification; client access required." },
  { code: "ADD-08", sec: "A.14", id: "Technical SEO", en: "Technical SEO", p: 500000, max: 1500000, type: "r", bill: "o", sid: "Audit/perbaikan teknis terukur; tidak menjamin peringkat Google.", sen: "Measured technical audit/fixes; no Google ranking guaranteed." },
  { code: "ADD-09", sec: "A.14", id: "Blog / CMS Add-on", en: "Blog / CMS Add-on", p: 1500000, max: 3000000, type: "r", bill: "o", sid: "Modul artikel untuk website yang sudah ada; bukan WEB-09 website baru.", sen: "Article module for an existing website; not a new WEB-09 site." },
  { code: "ADD-10", sec: "A.14", id: "Dashboard Admin Sederhana", en: "Simple admin dashboard", p: 1500000, max: 0, type: "s", bill: "o", sid: "1 resource/role admin; dashboard custom multi-modul mulai ADD-11.", sen: "1 resource/admin role; multi-module dashboards start at ADD-11." },
  { code: "ADD-11", sec: "A.14", id: "Dashboard Admin Custom", en: "Custom admin dashboard", p: 3000000, max: 0, type: "s", bill: "o", sid: "Scope khusus; autentikasi, role dan modul ditaksir terpisah.", sen: "Custom scope; auth, roles and modules estimated separately." },
  { code: "ADD-12", sec: "A.14", id: "Bahasa Tambahan", en: "Additional language", p: 500000, max: 1500000, type: "r", bill: "o", sid: "1 bahasa, maksimal 5 halaman; klien menyediakan terjemahan, copywriting terpisah.", sen: "1 language, up to 5 pages; client supplies translation, copywriting separate." },
  { code: "ADD-13", sec: "A.14", id: "Katalog Produk Add-on", en: "Catalogue add-on", p: 750000, max: 2000000, type: "r", bill: "o", sid: "Tambahan katalog tanpa pembayaran pada website yang sudah ada.", sen: "Catalogue without payments on an existing website." },
  { code: "ADD-14", sec: "A.14", id: "Integrasi API Eksternal", en: "External API integration", p: 1000000, max: 0, type: "s", bill: "o", sid: "1 provider/use case; sandbox, dokumentasi dan akses diperlukan.", sen: "1 provider/use case; sandbox, docs and access required." },
  { code: "ADD-15", sec: "A.14", id: "Integrasi Payment Gateway", en: "Payment gateway integration", p: 750000, max: 0, type: "s", bill: "o", sid: "1 gateway pada checkout yang sudah tersedia, webhook/idempotency; biaya provider terpisah.", sen: "1 gateway on an existing checkout, webhooks/idempotency; provider fees separate." },
  { code: "ADD-16", sec: "A.14", id: "Migrasi Hosting Web", en: "Web hosting migration", p: 500000, max: 2000000, type: "r", bill: "o", sid: "Website sederhana; aplikasi multi-service menggunakan DEP-14.", sen: "Simple website; multi-service apps use DEP-14." },
  { code: "ADD-17", sec: "A.14", id: "Perubahan Konten Mini", en: "Mini content change", p: 49000, max: 0, type: "s", bill: "o", sid: "1 batch maksimal 5 perubahan teks/gambar, tanpa layout baru.", sen: "1 batch of up to 5 text/image changes, no new layout." },
  { code: "ADD-18", sec: "A.14", id: "Fitur Custom Tambahan", en: "Custom feature", p: 0, max: 0, type: "q", bill: "o", sid: "Estimasi berdasarkan scope, integrasi dan acceptance criteria.", sen: "Estimated from scope, integrations and acceptance criteria." },

  // A.15 — Ready-to-buy bundles
  { code: "BND-01", sec: "A.15", id: "Tech Support Starter", en: "Tech Support Starter", p: 149000, max: 0, type: "s", bill: "o", sid: "1 kendala sederhana, diagnosis + fix maksimal 1 jam jika feasible; tidak menjamin semua bug selesai.", sen: "1 simple issue, diagnosis + up to 1 hour of fixing if feasible; not every bug is guaranteed." },
  { code: "BND-02", sec: "A.15", id: "Website Go Live", en: "Website Go Live", p: 399000, max: 0, type: "s", bill: "o", sid: "Frontend siap rilis, deploy + 1 domain existing + SSL + smoke test.", sen: "Release-ready frontend, deploy + 1 existing domain + SSL + smoke test." },
  { code: "BND-03", sec: "A.15", id: "Website + Spreadsheet", en: "Website + Spreadsheet", p: 449000, max: 0, type: "s", bill: "o", sid: "WEB-01 + 1 form maksimal 10 field ke Sheets; diskon bundel, bukan menjumlah SKU mentah.", sen: "WEB-01 + 1 form of up to 10 fields to Sheets; a bundle discount, not raw SKUs summed." },
  { code: "BND-04", sec: "A.15", id: "Backend Starter", en: "Backend Starter", p: 1499000, max: 0, type: "s", bill: "o", sid: "1 CRUD resource + DB + deployment ke environment siap; bukan APP-02 lengkap.", sen: "1 CRUD resource + DB + deployment to a ready environment; not a full APP-02." },
  { code: "BND-05", sec: "A.15", id: "Production Ready", en: "Production Ready", p: 2999000, max: 0, type: "s", bill: "o", sid: "Fullstack siap rilis, Compose, proxy, TLS, backup dan monitor; aplikasi bukan dibuat dari nol.", sen: "Release-ready full-stack, Compose, proxy, TLS, backup and monitoring; app not built from scratch." },
];

// Year-2+ renewal pricing — keyed by code, omitted = no separate renewal price.
export const RENEW = {
  "WEB-01": { p: 99000, from: false, id: "Subdomain + hosting template terkelola; tanpa perubahan konten.", en: "Subdomain + managed template hosting; no content changes." },
  "WEB-02": { p: 199000, from: false, id: "Hosting/pengelolaan; perpanjangan domain dibayar klien terpisah.", en: "Hosting/management; domain renewal paid separately by client." },
  "WEB-03": { p: 199000, from: false, id: "Pengelolaan + biaya renewal domain aktual; Rp199.000 bukan total termasuk domain.", en: "Management + actual domain renewal cost; IDR 199,000 does not include the domain." },
  "WEB-04": { p: 149000, from: false, id: "Subdomain + hosting statis terkelola.", en: "Subdomain + managed static hosting." },
  "WEB-05": { p: 299000, from: false, id: "Subdomain + hosting statis terkelola.", en: "Subdomain + managed static hosting." },
  "WEB-06": { p: 599000, from: false, id: "Termasuk anggaran renewal domain Rp249.000; selisih biaya aktual ditambahkan.", en: "Includes IDR 249,000 domain renewal budget; any difference added at cost." },
  "WEB-07": { p: 1499000, from: false, id: "Termasuk anggaran renewal domain Rp249.000; selisih biaya aktual ditambahkan.", en: "Includes IDR 249,000 domain renewal budget; any difference added at cost." },
  "WEB-08": { p: 399000, from: false, id: "Katalog statis, subdomain; perubahan produk tidak termasuk.", en: "Static catalogue, subdomain; product changes not included." },
  "WEB-09": { p: 1200000, from: true, id: "Mulai; kapasitas DB/operasi dalam quotation, bukan resource tanpa batas.", en: "From; DB capacity/operations in quotation, not unlimited resources." },
  "WEB-10": { p: 1800000, from: true, id: "Mulai; resource aplikasi dalam quotation, biaya transaksi provider terpisah.", en: "From; app resources in quotation, provider transaction fees separate." },
  "BND-03": { p: 99000, from: false, id: "Hosting website; dukungan integrasi Sheets SHT-14 opsional dan ditagih terpisah.", en: "Website hosting; SHT-14 Sheets support optional and billed separately." },
};
