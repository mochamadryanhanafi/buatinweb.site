# PRD - BUATINWEB.SITE
## Company Profile, Service Catalogue & Lead Generation

Versi 1.0 | 27 Oktober 2026 | Product owner: Buatinweb.site

**Arah produk:** website pemasaran modern, minimalis, futuristik dan monokrom untuk menjual layanan website, pengembangan aplikasi, technical support, data, AI dan machine learning kepada klien Indonesia maupun internasional.

**Keputusan utama:** bangun company profile multi-halaman yang ringan, bukan langsung sebuah SaaS website builder. Paket Compro Mini Rp99.000 adalah produk yang dijual kepada klien, bukan batas fitur atau harga pembuatan website utama buatinweb.site.

**Status komersial:** angka dalam katalog merupakan rancangan harga jual internal. Harga yang bertanda "Mulai" memerlukan konfirmasi scope. Harga vendor, pajak yang berlaku, kapasitas, dan biaya pihak ketiga harus ditampilkan terpisah bila belum termasuk paket. Katalog ini menggantikan penamaan paket yang tumpang tindih pada rancangan sebelumnya.

### Peta dokumen

Bagian 1-3: tujuan, pengguna dan batas produk. Bagian 4-8: halaman, kebutuhan fungsional, bahasa, tema dan harga. Bagian 9-14: stack, arsitektur, data, API, keamanan dan operasi. Bagian 15-18: pengukuran, acceptance criteria, roadmap dan keputusan peluncuran. Lampiran A: seluruh price list. Lampiran B: sumber teknis resmi.

## 1. Ringkasan produk dan keputusan

Buatinweb.site menjadi pintu masuk penjualan: pengunjung memahami layanan, membandingkan paket, melihat bukti pekerjaan, menghitung indikasi biaya, lalu mengirim brief atau meminta konsultasi. Transaksi dan approval pekerjaan berlangsung melalui quotation, bukan dianggap selesai hanya karena pengunjung menekan tombol WhatsApp.

| Area | Keputusan versi awal |
|---|---|
| Website utama | buatinweb.site; company profile + katalog + form brief |
| Bahasa | Indonesia dan English; URL terpisah untuk masing-masing bahasa |
| Tema | Light, Dark, System; pilihan tersimpan dan dapat diubah |
| Produk entry-level | Compro Mini Rp99.000, 1 halaman template dengan subdomain |
| Katalog | Seluruh layanan dan harga dasar pada Lampiran A; pemilik menyetujui status publikasi |
| Stack pilihan utama | Astro static-first + TypeScript + CSS tokens; Svelte island bila diperlukan |
| Backend minimum | Hono di Cloudflare Workers untuk form dan estimasi; D1 sebagai penyimpanan lead |
| Penyimpanan operasional | Google Sheets sebagai salinan kerja opsional, bukan satu-satunya sumber lead |
| File | Aset publik dari static assets; R2 hanya jika ada kebutuhan upload/private files |
| Pengelolaan konten | Git/Markdown/JSON pada MVP; CMS/admin menjadi fase berikutnya |
| Pembayaran | Quotation dan invoice manual terlebih dahulu; checkout/gateway ditunda |
| AI/ML di website | Kategori jasa; tidak wajib memasang chatbot atau model ML pada compro |

Pemilihan Astro merupakan keputusan desain untuk situs dominan konten. Astro memungkinkan halaman HTML statis dengan JavaScript hanya pada bagian interaktif; versi statis murni tidak memerlukan adapter server-rendering Cloudflare. [R01, R02]

## 2. Tujuan, pengguna dan definisi sukses

### 2.1. Tujuan bisnis

Membuat katalog yang mudah dipahami, memisahkan pekerjaan murah berbasis template dari proyek custom, dan menghasilkan brief yang cukup lengkap untuk quotation. Penawaran harus menjelaskan biaya tahun pertama, biaya berulang, batas revisi dan layanan yang tidak termasuk.

Tidak menggunakan klaim "paling cepat", "100% aman", "akurasi AI 99%", "pasti halaman pertama Google", atau "dipercaya lembaga besar" tanpa bukti yang dapat dipublikasikan.

### 2.2. Kelompok pengguna

| Pengguna | Kebutuhan | Jalur utama |
|---|---|---|
| UMKM / usaha baru | Website sederhana dengan harga jelas | Home > Compro Mini > template > brief |
| Pemilik bisnis / lembaga | Kredibilitas, custom domain, contoh pekerjaan | Services > portfolio > paket business > konsultasi |
| Pemilik aplikasi bermasalah | Diagnosis, perbaikan, deployment | Technical services > pilih masalah > brief teknis |
| Klien internasional | Penjelasan Inggris, scope, timezone, email | English site > pricing > request quote |
| Tim data / operasional | Spreadsheet, database, otomatisasi, AI/ML | Data solutions > discovery > quotation |
| Operator Buatinweb.site | Lead terstruktur, harga konsisten, tindak lanjut | D1/ekspor kerja; dashboard internal pada fase 2 |

### 2.3. Ukuran keberhasilan

Target berikut adalah sasaran operasional awal, bukan hasil yang sudah dicapai: tidak ada selisih harga antarkomponen untuk SKU yang sama; 100% halaman inti terbit dalam dua bahasa; setidaknya 99% kiriman valid tersimpan pada pengujian pra-rilis; tidak ada kehilangan lead yang sudah mendapat tanda terima.

Setelah 30 hari pengukuran, tetapkan target conversion rate berdasarkan baseline nyata. Ukur rasio kunjungan layanan ke brief tersimpan, lead berkualifikasi ke quotation, dan quotation ke penjualan. Klik WhatsApp bukan penjualan atau bukti pesan terkirim.

## 3. Scope dan prioritas

| Prioritas | Termasuk | Batasan |
|---|---|---|
| P0 / wajib rilis | Home, about, services, pricing lengkap, portfolio/demo, FAQ, contact, privacy, terms | Dua bahasa, dua tema + System, responsive, SEO, form yang benar-benar tersimpan |
| P0 / katalog | Filter kategori, detail paket, biaya berulang, label "Mulai", CTA sesuai layanan | Semua harga berasal dari satu katalog; tidak ditulis ulang di banyak komponen |
| P0 / operasi | Environment terpisah, CI checks, backup lead, error monitoring, rollback | Tidak menjanjikan on-call 24/7 |
| P1 | Kalkulator kombinasi, sinkronisasi Sheets, artikel, CMS/admin internal | Diterbitkan setelah alur form dan katalog stabil |
| P2 | Invoice/payment gateway, portal klien, order tracking, self-service onboarding | Memerlukan PRD modul lanjutan |
| Di luar versi awal | Builder drag-and-drop, provisioning tenant otomatis, marketplace, training ML online | Jasa tersebut boleh ada di katalog tanpa menjadi fitur situs |

Website utama dan situs pelanggan harus dipisahkan secara konfigurasi, data dan izin. Alamat `compro.buatinweb.site` disiapkan sebagai demo template. Klien memakai alamat unik, misalnya `namabisnis.buatinweb.site`; subdomain `admin`, `api`, `www`, `mail`, `staging` dan `compro` harus direservasi.

## 4. Struktur halaman dan konten

### 4.1. Sitemap

Gunakan prefix `/id/` dan `/en/`, dengan slug rute internal yang konsisten. Root `/` melakukan redirect tetap ke `/id/`; pengunjung dapat berpindah bahasa secara eksplisit. Tidak ada pengalihan otomatis berdasarkan negara.

| Rute setelah prefix bahasa | Isi dan tindakan utama |
|---|---|
| `/` | Home dengan ringkasan positioning dan layanan unggulan |
| `/about/` | Profil, cara kerja, prinsip kualitas, identitas usaha yang valid |
| `/services/` | Semua kategori layanan; filter kebutuhan |
| `/services/[category]/` | Penjelasan kategori, use case, price list, FAQ |
| `/services/[category]/[slug]/` | Detail layanan prioritas; tidak wajib membuat halaman tipis untuk setiap SKU |
| `/pricing/` | Katalog lengkap yang dapat difilter; perpanjangan dan pengecualian |
| `/portfolio/` | Proyek nyata berizin dan demo berlabel jelas |
| `/portfolio/[slug]/` | Masalah, peran, solusi, stack, hasil terverifikasi |
| `/process/` | Brief, scope, quotation, pengerjaan, review, serah terima |
| `/faq/` | Domain, hosting, support, data, pembayaran, bahasa |
| `/contact/` | Form brief, email, WhatsApp jika tersedia, jam layanan |
| `/privacy/`, `/terms/` | Kebijakan data dan ketentuan layanan yang telah ditinjau |
| `/insights/`, `/insights/[slug]/` | Artikel opsional; keamanan, performa, edukasi dan studi kasus |
| Halaman 404 | Pesan lokal, navigasi kembali; status HTTP harus 404 |

### 4.2. Susunan homepage

Header menampilkan logo, Services, Pricing, Portfolio, About, kontrol bahasa dan tema, serta CTA "Konsultasi". Mobile memakai menu ringkas dengan fokus keyboard yang dikelola.

Hero Indonesia: **"Website yang tepat. Sistem yang siap berkembang."** Subjudul: "Dari company profile mulai Rp99.000 hingga aplikasi, otomasi, dan solusi data sesuai kebutuhan bisnis." CTA utama "Lihat Paket" dan sekunder "Diskusikan Proyek".

Hero Inggris: **"The right website. Systems built to grow."** Subjudul: "From template-based business websites to custom applications, automation, and data solutions." Harga tetap menampilkan mata uang yang jelas, tidak otomatis berubah menjadi USD karena bahasa berubah.

Urutan berikutnya: kategori layanan; tiga paket website unggulan; contoh proyek/demo; proses kerja; technical support; data/AI/ML berbasis konsultasi; FAQ; CTA brief; footer. Jangan memuat seluruh 161 baris katalog di homepage. Halaman pricing menampilkan seluruh item melalui kategori dan pencarian.

### 4.3. Komponen detail layanan

Setiap layanan memuat nama, masalah yang diselesaikan, harga dan basis penagihan, hasil yang diterima, batas scope, kebutuhan dari klien, yang tidak termasuk, perpanjangan jika ada, revisi/garansi, dan CTA dengan `service_id`. Layanan AI/ML atau enterprise memakai CTA "Konsultasi Kebutuhan", bukan checkout instan.

## 5. Kebutuhan fungsional

| ID | Requirement | Kriteria penerimaan utama |
|---|---|---|
| FR-01 | Katalog terpusat | Kartu, detail, estimator dan brief menggunakan ID serta versi harga yang sama |
| FR-02 | Filter dan pencarian | Filter kategori/billing dan pencarian nama bekerja; state dapat dibagikan lewat query URL |
| FR-03 | Package comparison | Maksimal 3 paket dibandingkan; mencantumkan biaya awal, tahunan dan pengecualian |
| FR-04 | Estimator | Memisahkan sekali bayar, bulanan, tahunan dan biaya belum diketahui |
| FR-05 | Detail scope | Harga "Mulai" tidak pernah ditampilkan seolah penawaran final |
| FR-06 | Form brief | Validasi client + server, state sukses/error, referensi kiriman |
| FR-07 | Handoff kontak | WhatsApp/email membawa nama layanan, locale dan referensi tanpa data sensitif |
| FR-08 | Locale switch | Berpindah ke halaman padanan; harga/SKU tidak berubah tanpa aksi pengguna |
| FR-09 | Theme switch | Light/Dark/System tersimpan, tanpa flash menyilaukan atau layout shift |
| FR-10 | Portfolio | Proyek nyata atau demo dibedakan; tidak memalsukan klien, testimoni atau metrik |
| FR-11 | Content management | Perubahan draft direview, terversi dan dapat di-rollback |
| FR-12 | Privacy | Notice tersedia sebelum submit; consent marketing terpisah dan opsional |
| FR-13 | Error handling | Kesalahan provider tidak menyebabkan klaim sukses palsu |
| FR-14 | Accessibility | Navigasi keyboard, label form, status error dan dialog dapat dioperasikan |
| FR-15 | SEO | Metadata, canonical, hreflang dan sitemap per locale valid |
| FR-16 | Analytics | Event tidak membawa email, nomor telepon, brief, credential atau query sensitif |
| FR-17 | Mobile | Tabel memiliki alternatif card/accordion; tidak membuat seluruh halaman melebar |
| FR-18 | Advanced services | Status tersedia/konsultasi/disembunyikan dapat diatur per layanan |

### 5.1. Form brief

Field wajib: nama, kanal kontak yang dipilih dan nilai kontak yang valid, layanan yang diminati, ringkasan kebutuhan, locale, serta persetujuan telah membaca pemberitahuan privasi. Email wajib bila memilih email; nomor internasional wajib bila memilih WhatsApp. Perusahaan, negara, timezone, URL website, budget range, target tanggal dan preferensi stack bersifat opsional.

Sediakan pilihan "Belum tahu, minta rekomendasi" untuk stack dan budget. Pertanyaan teknis tambahan hanya muncul untuk layanan yang relevan. Jangan mewajibkan pengunjung nonteknis memilih database, framework atau arsitektur.

Batas awal yang diusulkan: nama 120 karakter, perusahaan 160, brief 3.000, URL 2.048, total request JSON 16 KB. P0 tidak menerima upload. Jangan menerima password, private key, API token, data kartu, dump database produksi atau dataset sensitif melalui form publik.

State UI: idle, validating, submitting, received, validation_error, rate_limited, unavailable. Ketika gagal, input tetap tersedia dan pengguna mendapat jalur email/WhatsApp yang sudah diverifikasi pemilik. Jika penyimpanan gagal, jangan menampilkan "terkirim".

### 5.2. Alur sales

Layanan dipilih > brief disimpan > operator meninjau > kebutuhan diklarifikasi > scope dan quotation disepakati > pembayaran sesuai kontrak > pengerjaan > review/UAT > pelunasan/serah terima > support/perpanjangan. Website MVP berhenti pada brief dan pencatatan status operasional, bukan otomatis mengeksekusi seluruh proses tersebut.

## 6. Bahasa dan klien internasional

### 6.1. Bahasa yang didukung

Indonesia (`id`) dan English (`en`) wajib lengkap pada rilis. Arsitektur kamus memungkinkan bahasa tambahan seperti Melayu, Jepang atau Arab, tetapi pilihan itu tidak tampil sebelum konten, font, layout dan QA siap. Dukungan RTL harus dikerjakan khusus ketika bahasa Arab diaktifkan; jangan sekadar menerjemahkan teks.

Bahasa meliputi navigasi, konten layanan, scope, pengecualian, FAQ, form, validasi, email konfirmasi, SEO, privacy dan terms. Jangan hanya menerjemahkan hero. Terminologi dan nominal disetujui reviewer manusia; terjemahan mesin tidak diterbitkan otomatis.

URL adalah sumber kebenaran locale. Cookie/local storage menyimpan preferensi untuk saran UI, tetapi tidak boleh mengganti isi `/en/` menjadi bahasa Indonesia. Gunakan label "Indonesia" dan "English", bukan hanya bendera. Switch bahasa mempertahankan halaman padanan dan parameter yang aman; bila halaman belum diterjemahkan, arahkan ke kategori padanan dengan pemberitahuan, bukan menampilkan isi campuran.

Google merekomendasikan URL terpisah untuk versi bahasa. Setiap halaman memakai canonical ke dirinya sendiri; `hreflang="id"`, `hreflang="en"` dan `x-default` mengarah ke padanan yang benar. Versi Inggris dapat menjadi `x-default`. Halaman yang belum terbit tidak dimasukkan ke hreflang/sitemap. [R12, R13]

### 6.2. Bahasa tidak sama dengan mata uang

Default IDR untuk semua locale. Format Indonesia `Rp99.000`; English `IDR 99,000`. USD hanya aktif setelah pemilik menentukan kebijakan kurs atau price book USD. Jangan menampilkan angka `99,000` sebagai USD dengan hanya mengganti simbol.

Mode USD estimate: gunakan kurs yang disetujui, tanggal kurs terlihat, label "Estimated conversion; final quote may differ", dan rounding yang konsisten. Rate kedaluwarsa lebih dari 7 hari menyembunyikan estimasi USD dan kembali ke IDR. Tanpa rate valid, selector USD dinonaktifkan. Kurs tidak perlu diambil pada setiap page request.

Mode USD quotation: quotation menyimpan nominal USD yang disetujui dan masa berlaku tersendiri. Perubahan kurs sesudah persetujuan tidak mengubah invoice diam-diam. Harga internasional khusus hanya boleh menggunakan scope atau price book yang eksplisit, bukan surcharge tersembunyi berdasarkan IP.

### 6.3. Layanan lintas negara

Form mendukung nomor telepon internasional, nama Unicode, timezone dan email. Tampilkan jam layanan dalam WIB / UTC+7 yang telah dikonfirmasi pemilik. Sediakan email sebagai alternatif WhatsApp. Provider pembayaran internasional, biaya konversi dan metode payout dipilih setelah kelayakan akun merchant diverifikasi; jangan menampilkan logo metode yang belum aktif.

## 7. Desain visual, light/dark dan aksesibilitas

### 7.1. Identitas visual

Gunakan logo geometris monokrom Buatinweb.site. Varian hitam untuk latar terang dan putih untuk latar gelap. Siapkan SVG yang bersih dan favicon; jangan memakai gambar logo raster besar sebagai aset utama. Nuansa futuristik dibangun melalui grid, tipografi dan detail geometris, bukan animasi 3D berat atau efek yang mengganggu pembacaan.

| Token | Light | Dark |
|---|---|---|
| Background | #FFFFFF | #0A0A0A |
| Surface | #F5F5F5 | #151515 |
| Text primary | #111111 | #F5F5F5 |
| Text secondary | #525252 | #B3B3B3 |
| Border dekoratif | #E5E5E5 | #333333 |
| Primary button | Hitam dengan teks putih | Putih dengan teks hitam |
| Focus indicator | Outline kontras yang diuji | Outline kontras yang diuji |

Border dekoratif tidak boleh menjadi satu-satunya petunjuk keberadaan input atau status. Gunakan label, bentuk dan outline interaktif yang cukup kontras. Token error/success diberi teks dan ikon, bukan warna saja.

Typography: satu keluarga sans-serif self-hosted atau system stack; maksimal dua bobot untuk payload awal. Body minimal 16 px di web, line-height sekitar 1,5. Lebar konten maksimal sekitar 1.200 px. Radius tombol 6 px, card 12 px; spacing konsisten dan tidak berlebihan.

### 7.2. Perilaku tema

Pilihan eksplisit Light/Dark mengalahkan preferensi OS. System mengikuti `prefers-color-scheme`, termasuk perubahan OS saat sesi berjalan. Gunakan skrip kecil sebelum paint atau mekanisme yang setara, dengan CSP yang kompatibel. Ketika storage diblokir, UI tetap berfungsi dan mengikuti preferensi OS tanpa error.

Hindari mismatch hydration pada icon/label tema. Tabel, modal, form, skeleton, code block, logo, tooltip dan halaman error wajib diuji dalam kedua tema. Animation sekitar 120-200 ms dan menghormati `prefers-reduced-motion`; tidak ada autoplay video hero.

### 7.3. Accessibility baseline

Target WCAG 2.2 AA melalui kombinasi pengujian otomatis dan manual; bukan klaim sertifikasi. Untuk teks normal, minimum contrast 4,5:1; teks besar minimum 3:1. [R15] Wajib ada skip link, urutan heading yang logis, fokus terlihat, label input, error terhubung ke field, pengumuman status kiriman, dan navigasi modal dengan keyboard.

## 8. Aturan harga, scope dan penjualan

### 8.1. Jenis harga

`fixed` untuk paket dengan scope benar-benar terkunci; `starting` untuk harga awal; `range` untuk perkiraan pekerjaan; `quote` untuk kebutuhan khusus; `actual` untuk tagihan vendor aktual. Setiap item memiliki basis `once`, `month` atau `year`. Nilai harga kosong tidak boleh dirender sebagai gratis.

Harga full list tersedia pada Lampiran A. Lampiran tersebut merupakan sumber price book versi `2026-10-27.v1`; seluruh kartu, hasil estimator dan brief menyimpan versi yang digunakan. Website menampilkan tanggal pembaruan harga.

### 8.2. Batas paket Rp99.000

Termasuk 1 halaman template, maksimal 5 section, 6 item layanan/produk, 8 gambar yang disediakan klien, subdomain, HTTPS, responsive, title/meta dasar, 1 revisi minor sebelum serah terima, garansi defect hasil pengerjaan 7 hari, dan hosting template terkelola 12 bulan. Batas aset proyek awal 100 MB; tidak termasuk penyimpanan upload pengguna.

Tidak termasuk desain baru, CMS, blog, login, database, form server-side, domain sendiri, copywriting, penerjemahan, payment gateway atau perubahan konten rutin. CTA WhatsApp sederhana termasuk. Revisi minor berarti satu batch perubahan teks, gambar atau warna tanpa mengubah struktur/template.

Tahun kedua Rp99.000/tahun untuk subdomain dan hosting terkelola, bukan unlimited support. Perubahan konten memakai ADD-17 atau maintenance terpisah. Target kerja internal 30-45 menit hanya setelah template dan materi siap; jika waktu riil berulang kali melebihi batas, perbaiki proses atau harga.

### 8.3. Paket lain dan biaya yang termasuk

WEB-01 sampai WEB-08 mencakup hosting tahun pertama pada skema terkelola yang disepakati. WEB-09/10 memerlukan quota card sebelum penawaran final: storage DB, file, email, operasi dinamis, retensi dan tanggung jawab upgrade. Tanpa quota card, label harga tetap "Mulai", bukan janji hosting dinamis tanpa batas. WEB-11 dan kategori aplikasi, AI/ML, bug fixing, deployment atau setup tidak otomatis mencakup biaya operasional tahunan.

Domain WEB-03 memakai anggaran registrasi Rp150.000; WEB-06/07 memakai Rp249.000. Angka ini adalah anggaran paket, bukan klaim harga registrar saat ini. Biaya di atas anggaran, domain premium, renewal yang berbeda, dan transfer domain harus disetujui sebelum pembelian. Akun registrasi dan registrant tetap milik klien; akses teknis menggunakan delegasi jika memungkinkan.

Harga maintenance bulanan membeli kapasitas kerja terbatas sesuai tabel, bukan ketersediaan tanpa batas. Jam tidak terpakai tidak otomatis dibawa ke bulan berikutnya kecuali kontrak menyatakan lain. Response target dibedakan dari waktu penyelesaian; tidak ada SLA 24/7 pada paket murah.

### 8.4. Logika estimator dan anti-double-charge

Untuk Compro Mini pilih tepat satu varian: WEB-01, WEB-02 atau WEB-03. Harga WEB-02 Rp249.000 sudah menggantikan WEB-01, bukan Rp99.000 + Rp249.000. Setup domain yang sudah termasuk paket tidak ditambahkan lagi. Bundle menggantikan komponen yang tercakup, tidak dijumlah ulang.

Diagnosis BUG-01 yang dilanjutkan ke pekerjaan yang sama dapat dikreditkan satu kali sebesar jumlah yang benar-benar dibayar. Contoh: quotation fix Rp299.000 dan diagnosis Rp99.000 sudah dibayar, sisa Rp200.000, bukan total baru Rp398.000. Pembayaran diagnosis tetap sah untuk hasil investigasi meskipun klien tidak melanjutkan.

Estimator harus menghasilkan empat kelompok: biaya awal, biaya bulanan, biaya tahunan, dan biaya vendor/belum ditaksir. Jangan menjumlahnya sebagai satu total yang menyesatkan. Jika ada item quotation, tampilkan "Perlu penawaran final", bukan angka pasti. Backend menghitung ulang harga dari katalog sendiri, bukan mempercayai nominal dari browser.

### 8.5. Ketentuan operasional yang diusulkan

Mini dibayar penuh sebelum produksi setelah scope disetujui. Proyek standar memakai 50% awal dan 50% sebelum serah terima; proyek besar dapat memakai milestone. Quotation berlaku 14 hari kecuali dinyatakan lain. Estimasi pengerjaan dimulai setelah brief, materi, akses dan pembayaran yang disepakati lengkap.

Perubahan di luar scope memerlukan change request tertulis. Bug hasil pengerjaan dibedakan dari permintaan fitur, perubahan provider, input data klien dan perubahan oleh pihak lain. Atur hak kode sumber, lisensi template, konten milik klien, ekspor data dan serah terima di penawaran. Kebijakan pembatalan/refund dan pajak ditinjau sebelum dipublikasikan; jangan memakai janji hukum generik yang belum sesuai usaha.

Pemberitahuan renewal diusulkan H-30, H-14 dan H-3. Penghentian layanan dan retensi setelah berakhir harus dijelaskan sebelumnya; jangan menghapus data tanpa pemberitahuan. Operasional tanggal efektif dapat ditetapkan setelah pemilik menyetujui kebijakannya.

## 9. Pilihan tech stack dan strategi performa

Pilihan berikut merupakan alternatif arsitektur, bukan daftar dependency yang harus dipasang bersamaan. Sebutan "high-performance" harus dihubungkan dengan workload: halaman pemasaran, API, transaksi, atau inference model. Bahasa backend yang cepat tidak memperbaiki gambar hero terlalu besar, JavaScript berlebihan, query buruk, atau layanan pihak ketiga yang lambat secara otomatis.

### 9.1. Matriks pilihan utama

| Pilihan | Susunan stack yang diusulkan | Cocok untuk / trade-off |
|---|---|---|
| A. Minimal statis | HTML, CSS, JavaScript seperlunya, Workers Static Assets | Compro 1 halaman/template; sedikit komponen operasional; editing manual |
| B. Static-first terstruktur | Astro, TypeScript, CSS tokens/Tailwind, Svelte islands opsional, Hono + D1 | Pilihan utama compro Buatinweb.site; konten cepat, interaksi terisolasi [R01, R02, R19] |
| C. Balanced full-stack | SvelteKit, adapter Cloudflare, TypeScript, D1/R2 | Lebih sesuai bila portal/admin segera menjadi prioritas; tambah disiplin SSR/auth [R03] |
| D. Ekosistem React | Next.js, TypeScript, PostgreSQL/D1 sesuai adapter | Untuk tim React; Vercel/Node atau jalur Workers yang kompatibel; jangan menganggap semua fitur identik [R04, R05] |
| E. Ekosistem Vue | Nuxt, TypeScript, Nitro, D1/PostgreSQL | Alternatif jika tim memilih Vue; uji preset runtime dan modul [R22] |
| F. SPA dashboard | React/Vue/Angular + API terpisah | Pilihan untuk panel internal; halaman marketing tetap static/SSR, bukan shell kosong |
| G. Monolith konvensional | PHP supported, Laravel, Blade/Livewire/Inertia, PostgreSQL/MySQL | Admin dan proses bisnis dalam satu aplikasi; VPS/PaaS/container, bukan native PHP-FPM di Worker biasa |
| H. CMS konvensional | WordPress, PHP, MySQL/MariaDB, theme ringan, cache | Konten rutin untuk editor nonteknis; patch plugin/theme, backup dan managed hosting diperlukan [R21] |
| I. API high-performance Go | Go net/http/chi atau Gin, PostgreSQL, Redis opsional, Svelte/Astro frontend | Opsi pengembangan aplikasi lanjutan; binary/service dijalankan pada server/container [R23] |
| J. Rust untuk kebutuhan khusus | Rust Axum, Tokio, SQLx, PostgreSQL, frontend terpisah | Dipilih setelah profiling/keahlian mendukung; bukan syarat untuk landing page cepat [R24] |
| K. Python business app | Django, PostgreSQL, templates/HTMX atau frontend terpisah | CRUD dan admin berorientasi data; runtime aplikasi di server/PaaS [R26] |
| L. AI / ML API | Python, FastAPI, scikit-learn/PyTorch sesuai model, object storage, job worker | Training/inference terpisah dari marketing site; compute dan evaluasi ditaksir sendiri [R25] |
| M. Enterprise .NET | ASP.NET Core, PostgreSQL/SQL Server, React/Angular/Blazor | Pilihan sesuai ekosistem klien, identitas dan integrasi enterprise [R27] |
| N. Enterprise JVM | Java/Kotlin, Spring Boot, PostgreSQL, frontend terpisah | Pilihan untuk organisasi yang sudah memakai JVM; operasi sesuai beban [R28] |
| O. Hosted website builder | Builder/CMS terkelola vendor | Untuk klien yang mengutamakan editor visual; lisensi, export dan lock-in harus dinilai |

Laravel dapat memakai Octane dengan server yang didukung untuk pola worker yang bertahan hidup antar-request. Konsekuensinya termasuk pengelolaan state/memori, sehingga tidak dipasang hanya untuk memberi label "cepat". [R20]

Dokumentasi Cloudflare yang diperiksa untuk PRD ini mengarahkan aplikasi Next.js baru ke vinext dan mempertahankan OpenNext untuk kebutuhan kompatibilitas yang sesuai. Keputusan adapter harus diuji pada proof of concept, versi stabil dan fitur yang benar-benar dipakai; jangan mengunci proyek ke tutorial lama. [R04, R05]

### 9.2. Pilihan per lapisan

Frontend styling: CSS variables + CSS biasa untuk minimum dependency, atau Tailwind untuk konsistensi utilitas. Pilih satu pendekatan utama. Library komponen hanya dipasang bila mengurangi pekerjaan aksesibilitas dan tetap memenuhi budget ukuran.

Data: JSON/Markdown untuk konten dan katalog; D1 untuk lead/operasi ringan; PostgreSQL untuk transaksi dan aplikasi yang berkembang; MySQL/MariaDB untuk ekosistem yang memerlukannya; SQLite untuk aplikasi kecil yang sesuai pola penulisan. Redis hanya ketika cache/queue/coordination memiliki kebutuhan nyata, bukan default.

Storage: static assets untuk file build publik; R2/S3-compatible untuk object/file; Google Sheets untuk kerja administrasi sederhana. Vector store hanya untuk layanan RAG yang membutuhkan retrieval; jangan menambahkannya untuk company profile biasa.

Testing dan delivery: TypeScript strict, formatter/linter, unit test, Playwright untuk E2E, audit aksesibilitas dan Lighthouse CI, dependency/secret scan, CI deploy dengan approval production. Pilih versi paket yang masih didukung pada implementasi, simpan lockfile dan catat `compatibility_date` Worker.

### 9.3. Keputusan implementasi yang direkomendasikan

Untuk MVP gunakan opsi B. Gunakan konten Git, satu aplikasi frontend statis dan satu Worker kecil; tidak perlu monorepo banyak service. Tambahkan backend Go pada fase aplikasi/portal bila kebutuhan transaksi, integrasi atau workload menunjukkan manfaat nyata.

Jika dashboard menjadi pusat produk sejak hari pertama, opsi C menggantikan B; tidak perlu membangun Astro dan SvelteKit penuh sekaligus. Untuk lembaga yang mensyaratkan CMS siap pakai, pilih WordPress atau Laravel dengan kontrak maintenance yang sesuai, bukan memaksakan semua stack ke Workers.

Rust/Go melalui WebAssembly berbeda dari menjalankan server Axum/Gin biasa. Workers mendukung beberapa bahasa dan Wasm, tetapi dukungan bahasa tidak berarti semua library, syscall atau proses server portabel tanpa perubahan. [R18] Native backend/container merupakan jalur terpisah yang harus dihitung operasionalnya.

## 10. Arsitektur, data storage dan pemisahan sistem

### 10.1. Arsitektur MVP

```text
Pengunjung
  -> buatinweb.site/id/ atau /en/
  -> Cloudflare Workers Static Assets
       -> HTML, CSS, gambar, katalog publik
       -> /api/*: Hono Worker
            -> validasi + Turnstile + rate limit
            -> D1: leads + idempotency + outbox
            -> proses outbox terjadwal
                 -> email operator
                 -> Google Sheets (opsional)

Konten Git -> CI checks -> preview -> approval -> deploy production
R2 private -> baru diaktifkan saat lampiran/file benar-benar diperlukan
```

Static assets dilayani langsung ketika file cocok; Worker diprioritaskan hanya untuk path API. Jangan menjalankan middleware dinamis pada setiap gambar/halaman tanpa alasan. Konfigurasi asset-first dan selective Worker-first didukung Workers. [R07]

Tidak ada login publik pada MVP. Admin awal menggunakan akses operasional yang dibatasi dan ekspor yang diaudit. Bila dashboard fase 2 dibangun, gunakan IdP/session yang teruji, MFA untuk administrator, role owner/editor/sales, serta pemeriksaan otorisasi pada server.

### 10.2. Memilih storage

| Kebutuhan | Pilihan awal | Batas keputusan |
|---|---|---|
| Harga, FAQ, profil, artikel | JSON/Markdown terversi | Tidak butuh query database per page view |
| Lead dan status follow-up | D1 | Data pribadi; akses backend saja, bukan public JSON |
| Tampilan kerja sales | Google Sheets mirror | Salinan operasional; kegagalan sync tidak menghilangkan lead |
| Form sederhana milik klien | Sheets melalui backend/Apps Script yang aman | Quota, retry, izin dan volume harus dibatasi |
| Pengguna, transaksi, tenant | PostgreSQL atau database sesuai stack | Constraint, otorisasi, migration dan backup wajib |
| Gambar/dokumen upload | R2/private object storage | File bukan disimpan sebagai string besar dalam spreadsheet |
| AI knowledge base | Object store + metadata + vector index bila perlu | Terpisah dari PII lead; izin dokumen dan evaluasi retrieval |

Google Sheets API mempunyai kuota baca/tulis per menit dan memberikan error ketika kuota terlampaui; desain integrasi harus menangani backoff serta antrean. Karena itu Sheets dipilih sebagai mirror administrasi, bukan pengganti database transaksional atau tempat menyimpan credential. [R11]

Batas D1 Free yang diperiksa adalah 500 MB per database dan 5 GB total per akun; versi paid memiliki batas berbeda. Batas ini adalah batas provider, bukan kapasitas otomatis milik setiap klien. [R09] Upgrade dan pemisahan tenant ditentukan dari penggunaan nyata.

### 10.3. Domain dan hosting klien

Situs pemasaran, demo template dan situs pelanggan mempunyai konfigurasi/release terpisah. Klien dengan domain sendiri tetap dapat menggunakan hosting Cloudflare; custom domain tidak berarti wajib membeli VPS. Worker Custom Domain memerlukan zone Cloudflare aktif yang dikelola pada konfigurasi yang sesuai. [R17]

Bila domain klien berada di akun/DNS lain, lakukan discovery: delegasi akses, deploy di akun klien, atau evaluasi solusi custom hostname/SaaS. Jangan menjanjikan bahwa sebuah CNAME selalu cukup untuk semua skenario. Verifikasi kepemilikan, sertifikat, cache isolation dan hostname allowlist sebelum aktivasi.

P0 melakukan onboarding klien secara terkontrol dari template. Arsitektur multi-tenant otomatis, billing tenant dan custom hostname massal bukan bagian MVP compro. Jika kelak dipakai, cache key wajib mencakup tenant/hostname, konfigurasi tenant harus terisolasi dan hostname yang tidak dikenal tidak boleh menampilkan data klien lain.

## 11. Model data dan kontrak API

### 11.1. Entitas minimum

| Entitas | Field utama | Aturan |
|---|---|---|
| Service | id, category, slug, name_id/en, scope_id/en, status, sales_mode | ID stabil; konten English harus lengkap sebelum publish |
| Price | service_id, currency, amount, max_amount, type, billing, version | Gunakan integer rupiah atau minor unit sesuai mata uang; jangan floating point uang |
| Renewal | service_id, amount, period, included_budget, exclusions | Terpisah dari biaya awal |
| Lead | id, name, contact_channel/value, service_ids, brief, locale, status, timestamps | Field kontak tidak masuk URL/analytics/log umum |
| Consent | lead_id, notice_version, timestamp, marketing_opt_in | Marketing default false; privacy acknowledgement tidak digabung dengan iklan |
| Estimate | id, items, catalog_version, totals_by_period, currency_mode, created_at | Snapshot; estimasi bukan invoice |
| Outbox | id, lead_id, channel, status, attempts, next_retry_at | Retry persisten, dead-letter status dan tindakan manual |
| Portfolio | id, locale, client_permission, demo_flag, evidence | Publikasi hanya setelah validasi hak dan klaim |
| Settings | locales, theme defaults, contact, quote validity, FX settings | Tidak menyimpan secret di content repository |

SKU, rule bundel, harga dasar dan renewal tersedia dalam `buatinweb-pricelist-v1.json`. Status awal adalah draft. Nama layanan Indonesia/English disertakan; field scope English memerlukan editorial review sebelum dijadikan halaman publik. Nilai kosong harus menahan publikasi, bukan menghasilkan halaman setengah diterjemahkan.

### 11.2. Endpoint

| Endpoint | Perilaku |
|---|---|
| `GET /catalog.json` | Katalog publik non-sensitif, versi jelas, cache sesuai versi |
| `POST /api/estimate` | Memvalidasi SKU/quantity/exclusion dan menghitung ulang total; tanpa data kontak |
| `POST /api/leads` | Validasi, anti-abuse, idempotency, simpan lead + outbox secara konsisten |
| `GET /api/health` | Status minimal tanpa detail credential/database |
| Endpoint admin fase 2 | Session/authorization, no-store, audit log; tidak dibuka hanya dengan URL rahasia |

`POST /api/leads` mengembalikan 201 dengan referensi setelah penyimpanan berhasil. Notification/sync dapat masih pending. Error memakai 400 untuk input invalid, 429 untuk rate limit, dan 503 untuk layanan penyimpanan yang tidak tersedia. Detail exception internal tidak dikirim ke browser.

Idempotency key disimpan bersama hash payload. Retry payload yang sama mengembalikan referensi yang sama; penggunaan key sama untuk payload berbeda menghasilkan konflik. Lookup idempotency dikerjakan sebelum mengulangi validasi token sekali pakai agar retry sah tidak ditolak karena token telah digunakan.

D1 commit dilakukan sebelum mengembalikan sukses. Email/Sheets diproses dari outbox persisten dengan backoff dan batas retry; tidak hanya mengandalkan request/background task yang mudah terputus. Setiap record mirror memakai lead ID untuk rekonsiliasi duplikasi. Jangan menjanjikan exactly-once delivery ke API eksternal yang tidak menyediakan idempotency setara.

### 11.3. Struktur repositori awal

```text
buatinweb-site/
  src/
    components/        # header, pricing, theme, locale, form
    layouts/
    pages/id/
    pages/en/
    content/           # services, faq, portfolio, articles
    i18n/              # id.json, en.json
    lib/               # pricing rules, schemas, formatting
    styles/            # tokens, light, dark, base
  worker/
    index.ts
    routes/            # leads, estimate, health
    services/          # validation, persistence, outbox
  data/catalog.json
  migrations/
  public/              # logo SVG, favicon, optimized assets
  tests/               # unit, integration, e2e, accessibility
  docs/                # PRD, architecture, deployment, runbooks
  .github/workflows/
  .env.example
  wrangler.jsonc
```

Satu katalog terversi dipakai frontend dan backend. Binding database, secret Turnstile, credential email dan Sheets tidak memiliki prefix public dan tidak masuk bundle browser. Nilai kontak bisnis harus diisi pemilik; jangan mengambil nomor WhatsApp dari proyek lain.

## 12. Kebutuhan nonfungsional dan performance budget

| ID | Target yang diusulkan | Metode verifikasi |
|---|---|---|
| NFR-01 | LCP <= 2,5 detik; INP <= 200 ms; CLS <= 0,1 pada p75 | RUM per device/locale setelah data cukup; bukan hanya satu tes lab [R14] |
| NFR-02 | First-party JS awal homepage <= 75 KB gzip; CSS <= 40 KB gzip | Build report; third-party dilaporkan terpisah |
| NFR-03 | Transfer halaman awal utama <= 500 KB, selain skrip pihak ketiga yang terdokumentasi | Trace jaringan pada baseline yang dicatat |
| NFR-04 | Homepage dan pricing tetap memiliki konten/tautan saat JS dinonaktifkan | Uji render HTML; form punya fallback kontak |
| NFR-05 | Tidak ada horizontal page overflow pada 320-1.440 px | E2E viewport; tabel boleh mempunyai scroll internal berlabel |
| NFR-06 | Accessibility AA sebagai sasaran dan tanpa blocker keyboard | Automated audit + pengujian manual dua tema |
| NFR-07 | Test API 10 request/detik selama 5 menit dengan provider eksternal dimock | p95 < 500 ms dan error < 1% sebagai target internal, bukan SLA publik |
| NFR-08 | Target lead backup RPO <= 24 jam; RTO <= 1 hari kerja | Uji restore; target internal berlaku saat jadwal operasional disetujui |

NFR-07 mengukur kode dan storage yang dikendalikan proyek, bukan latency Google Sheets, jaringan pengunjung atau seluruh provider. Untuk tes end-to-end, catat kondisi dan angka aktual tanpa menghapus pengaruh provider dari laporan. INP lapangan tidak dapat dinyatakan lulus hanya dari Lighthouse.

Gambar memiliki dimensi eksplisit, format modern dan ukuran responsif. Hero penting tidak dilazy-load; media di bawah fold dapat lazy-load. Font dibatasi dan tidak memblokir render lebih lama dari perlu. Tidak memakai video background, library animasi besar, atau widget chat otomatis pada initial load.

Lighthouse menjadi regression check dengan profil dan versi alat yang dicatat, bukan janji nilai 100. Ukur baseline sebelum mengaktifkan analytics/chat/payment widgets. Perubahan performa harus memiliki bukti sebelum/sesudah.

## 13. Keamanan, privasi dan keandalan

Form menggunakan validasi server, prepared query, output encoding, body-size limit, honeypot/rate limit dan Turnstile. Verifikasi token Turnstile wajib di server; widget frontend saja tidak cukup. Token memiliki masa berlaku dan tidak boleh dipakai ulang. [R16]

CORS bukan autentikasi. Endpoint admin menggunakan authorization nyata; sesi ber-cookie memerlukan perlindungan CSRF yang sesuai. Secret disimpan pada provider secret store, akses cloud minimum, MFA, dan token deployment khusus proyek. Jangan menggunakan API key global untuk setiap klien.

Tambahkan CSP, HSTS setelah HTTPS stabil, referrer policy dan perlindungan MIME yang sesuai; uji agar form/Turnstile tetap bekerja. URL yang dimasukkan klien tidak otomatis di-fetch server sehingga tidak menciptakan jalur SSRF. Upload fase lanjutan membutuhkan allowlist format, pemeriksaan signature/ukuran, random key, private-by-default dan kontrol akses per objek.

Retensi yang diusulkan: lead yang tidak menjadi pelanggan 180 hari, log teknis 30 hari, dan backup operasional 30 hari. Data kontrak/invoice mengikuti kebijakan usaha dan kewajiban yang ditinjau sebelum rilis. Penghapusan harus mencakup database aktif serta mirror; backup mengikuti lifecycle dengan penjelasan yang transparan.

Gunakan log tanpa isi brief/credential. Monitoring memisahkan kegagalan form, D1, outbox dan provider. Alarm biaya diusulkan pada 50%, 80% dan 100% anggaran; budget alert bukan hard cap. Rate limit/kill switch harus diuji, dengan cara penonaktifan fitur yang tidak menyebabkan penghapusan data.

Managed storage membedakan data utama dan backup. Batas kapasitas/operasi pada Lampiran A adalah batas produk Buatinweb.site, bukan kuota gratis provider per klien. Beri pemberitahuan saat 80% dan 100%; tidak ada overage berbayar otomatis tanpa persetujuan. Jangan memasukkan streaming video, anonymous file hosting, atau retensi backup tak terbatas pada paket murah.

Semua audit keamanan, perbaikan dan deployment dilakukan hanya dengan otorisasi pemilik sistem. Untuk perubahan production, wajib ada backup yang layak, rencana rollback, pencatatan perubahan dan konfirmasi ruang lingkup. Tidak ada klaim bahwa situs klien pasti tidak bisa diretas.

## 14. Deployment, biaya operasional dan pemeliharaan

### 14.1. Lingkungan

Development lokal, preview per perubahan, staging dan production dipisahkan. Staging menggunakan data dummy, secret/binding berbeda, access control dan `noindex`. `noindex` bukan mekanisme keamanan. Build production tidak mengambil data lead untuk pre-render.

Pipeline: install dari lockfile > lint/typecheck > unit/integration > build > E2E minimum + audit aksesibilitas > preview > approval > deploy > smoke test > pantau error. Migrasi database memakai pola expand/contract yang kompatibel dengan versi aplikasi lama sebelum rollback. Rollback kode tidak otomatis mengembalikan schema/data.

Serah terima meliputi repositori, build/deploy instructions, env example tanpa secret, schema/migration, daftar akun milik klien, backup/restore, rollback dan batas support. Dokumentasi tidak menyimpan password produksi.

### 14.2. Anggaran platform

Cloudflare Workers Paid memiliki biaya minimum USD5 per akun per bulan, dengan allowance request/CPU dan biaya tambahan menurut pemakaian. Request static asset langsung dapat gratis, sedangkan eksekusi Worker atau mode caching tertentu dapat mengikuti aturan penagihan lain. Ini bukan hosting semua layanan tanpa batas. [R06]

Workers biasa memiliki batas memori 128 MB per isolate, bukan 128 MB khusus untuk setiap request; satu isolate dapat menangani banyak request. Karena itu training atau inference model besar tidak ditempatkan di Worker HTTP biasa hanya karena API/frontend memakai Cloudflare. [R08]

R2 Standard mencantumkan biaya storage USD0,015/GB-month dan biaya operasi tersendiri, dengan egress langsung dari R2 tanpa biaya transfer. Layanan lain dalam jalur akses tetap dapat menimbulkan biaya. [R10] Harga paket penyimpanan Buatinweb.site mencakup jasa pengelolaan, bukan tarif mentah R2.

Biaya bulanan internal dihitung sebagai: platform dasar + penggunaan API/DB/storage + email + monitoring + backup + domain yang diamortisasi + tenaga support. Kuota free/paid harus diperiksa pada akun yang sebenarnya; jangan mengalikan free tier seolah setiap pelanggan otomatis memperoleh kuota baru. Kurs IDR untuk biaya USD dimasukkan ketika membuat anggaran, bukan di-hardcode sebagai fakta tetap.

## 15. Analytics dan operasi konten

Event minimum: `service_view`, `pricing_filter`, `plan_select`, `estimate_start`, `estimate_complete`, `brief_start`, `lead_saved`, `contact_click`, `locale_change` dan `theme_change`. Properti hanya service/category ID, locale, theme, billing type dan label budget agregat bila dibutuhkan. Hindari payload pribadi atau isi form.

`lead_saved` hanya tercatat setelah backend menerima data. Klik kontak diberi label klik, bukan pesan masuk. Dashboard konversi menampilkan volume dan denominator; trafik uji, bot yang teridentifikasi dan duplikasi idempotency dipisahkan.

Artikel keamanan memakai sumber resmi, tanggal publikasi dan pembaruan. Penyebutan lembaga yang menerbitkan advisory tidak boleh diubah menjadi klaim lembaganya diretas atau berstatus resmi "Siaga 1" tanpa bukti. Tidak memasang logo klien/lembaga sebagai endorsement tanpa izin.

Perubahan harga mengikuti draft > review scope/margin > review terjemahan > publish satu versi > regression check. Penawaran yang sudah disetujui mengacu ke snapshot lama; halaman web yang berubah tidak otomatis mengubah kontrak.

## 16. Acceptance tests dan Definition of Done

| ID | Skenario | Hasil yang diwajibkan |
|---|---|---|
| AT-01 | Memilih WEB-01 | Rp99.000 awal; Rp99.000/tahun berikutnya; tidak ada DB/domain custom tersirat |
| AT-02 | Beralih WEB-01 ke WEB-02 | Total awal Rp249.000, bukan Rp348.000; renewal domain terpisah |
| AT-03 | Memilih BND-03 | Harga mulai Rp449.000; komponen website/Sheets tidak dijumlah ulang |
| AT-04 | Diagnosis sudah dibayar Rp99.000, fix Rp299.000 | Sisa Rp200.000 dan kredit tercatat satu kali |
| AT-05 | Pilih item bulanan dan tahunan | Total setiap periode dipisah; biaya vendor yang belum diketahui diberi label |
| AT-06 | Beralih ID ke EN pada pricing | Halaman padanan, SKU sama, nominal mata uang benar, tidak ada teks kunci tertinggal |
| AT-07 | USD tidak punya kurs atau sudah kedaluwarsa | Tidak ada harga USD palsu; IDR tetap dapat dibaca |
| AT-08 | Tema System/Light/Dark dan refresh | Pilihan konsisten, tidak ada flash/hydration error yang mengganggu |
| AT-09 | Local storage ditolak browser | Situs tetap berfungsi, fallback tema aman |
| AT-10 | Kiriman valid | Lead tersimpan, referensi diterima, outbox dibuat |
| AT-11 | D1 gagal | UI tidak mengklaim sukses; input aman dan fallback kontak tampil |
| AT-12 | Sheets/email gagal sesudah commit | Lead tetap ada; status pending/retry tercatat dan bisa direkonsiliasi |
| AT-13 | Double click/retry request | Satu lead logis, referensi konsisten, tidak ada penagihan atau kiriman berulang tak terkendali |
| AT-14 | Token tidak valid, request besar atau spam | Ditolak dengan status yang sesuai; tidak ada detail secret bocor |
| AT-15 | Bahasa, tema, viewport | Home, pricing dan contact diuji ID/EN x light/dark x mobile/desktop |
| AT-16 | Keyboard dan screen reader dasar | Menu, filter, form, switch dan modal dapat dioperasikan |
| AT-17 | SEO multilingual | Self-canonical, reciprocal hreflang, sitemap dan status 404 benar |
| AT-18 | Restore dan rollback | Lead pulih pada uji; rollback aplikasi kompatibel dengan schema aktif |
| AT-19 | Draft portfolio atau scope EN kosong | Publikasi diblokir, bukan membuat testimoni/terjemahan otomatis |
| AT-20 | Kontak belum diisi pemilik | Release gate gagal; tidak ada nomor contoh/proyek lain di production |

Definition of Done: semua P0 dan tes kritis lulus; tidak ada defect keamanan/kehilangan data berprioritas tinggi yang terbuka; harga dan versi konsisten; kedua bahasa dan tema direview; kontak/izin portfolio/terms disetujui; runbook deployment dan restore tersedia; pemilik memberi approval rilis.

## 17. Roadmap dan risiko

| Fase | Hasil | Gate keluar |
|---|---|---|
| 0. Validasi komersial dan konten | Scope harga, kemampuan layanan, kontak, logo, portfolio, terms | Pemilik menyetujui apa yang boleh dijual/diklaim |
| 1. Fondasi UI dan konten | Design tokens, ID/EN, tema, halaman inti, katalog statis | Navigasi, harga, responsive dan SEO dasar lulus |
| 2. Intake yang andal | API lead, D1, outbox, anti-abuse, error state | Uji sukses/gagal/retry dan backup lulus |
| 3. QA dan peluncuran | Accessibility, performa, security review, staging/production | Definition of Done dan approval |
| 4. Optimasi penjualan | Estimator lengkap, Sheets sync, artikel, CRM ringan | Baseline konversi dan data dukungan tersedia |
| 5. Ekspansi | Portal, pembayaran, multi-tenant, modul AI sesuai kebutuhan | PRD tambahan, business case dan anggaran operasi |

Tidak semua layanan katalog harus langsung ditandai "tersedia". Layanan tanpa kapasitas delivery atau bukti teknis memakai status konsultasi atau disembunyikan. Khusus ML, discovery memeriksa kualitas data, hak pemakaian, data leakage, baseline dan biaya evaluasi; tidak menjanjikan akurasi sebelum eksperimen.

Risiko utama: harga Rp99.000 tidak menutup support; scope custom meluas; konten Inggris tidak lengkap; hidden recurring cost; ketergantungan provider; form spam; kehilangan lead saat integrasi gagal; dan klaim portofolio berlebihan. Mitigasi: scope cap, harga berversi, publish gate terjemahan, biaya periodik transparan, storage durable, retry/reconciliation, backup dan persetujuan klaim.

## 18. Keputusan yang harus diisi sebelum rilis

Pemilik menetapkan kontak bisnis resmi dan jam dukungan; akun cloud/registrar/email milik siapa; identitas usaha dan ketentuan pembayaran; template yang tersedia; proyek yang boleh dipublikasikan; siapa yang mereview bahasa Inggris; budget platform; kapasitas support bulanan; kebijakan pembatalan/retensi; dan apakah estimasi USD diaktifkan.

Default implementasi tetap dapat dimulai dengan Astro static-first, ID/EN, Light/Dark/System, katalog IDR, form D1, tanpa dashboard/checkout/AI runtime. Hal yang belum disetujui menjadi release gate atau fitur nonaktif, bukan nilai yang ditebak oleh developer.

# Lampiran A - Price List Lengkap

Semua angka adalah usulan harga jual Buatinweb.site dalam rupiah. Harga bertanda "Mulai" bergantung pada scope dan prasyarat. Harga sekali bayar tidak mencakup biaya bulanan/tahunan kecuali dinyatakan eksplisit pada Bagian 8. Rentang adalah estimasi, bukan janji semua pekerjaan pasti tercakup. Item setup, bundel dan langganan yang fungsinya tumpang tindih tidak boleh ditagih dua kali.

Untuk AI/ML, seluruh API/token, GPU, anotasi/pengadaan data, dataset berlisensi dan resource production terpisah kecuali quotation menyatakan termasuk. Skala/volume di tabel adalah batas cakupan awal usulan, bukan kapasitas sistem yang telah dibenchmark.
### A.1. Website development

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| WEB-01 - Compro Mini | Rp99.000 | 1 halaman template, maksimal 5 section, subdomain, 1 revisi minor. |
| WEB-02 - Mini Domain Sendiri | Rp249.000 | Cakupan Mini + setup 1 domain yang sudah dimiliki klien; bukan tambahan WEB-01. |
| WEB-03 - Mini Domain Baru | Mulai Rp399.000 | Mini + setup domain + anggaran registrasi .com Rp150.000; selisih biaya aktual ditambahkan. |
| WEB-04 - Landing Page | Mulai Rp299.000 | 1 halaman template, 6-8 section, CTA, 2 revisi minor; subdomain. |
| WEB-05 - Compro Starter | Mulai Rp699.000 | Maksimal 3 halaman semi-custom, SEO dasar, subdomain, 2 revisi minor. |
| WEB-06 - Compro Business | Mulai Rp1.699.000 | Maksimal 5 halaman, semi-custom, anggaran .com Rp249.000, 3 revisi minor. |
| WEB-07 - Compro Professional | Mulai Rp4.999.000 | Maksimal 10 halaman, desain khusus, anggaran .com Rp249.000, 3 tahap review. |
| WEB-08 - Katalog Produk | Mulai Rp1.499.000 | Maksimal 30 produk awal, kategori, pemesanan WhatsApp; tanpa keranjang/pembayaran. |
| WEB-09 - Blog / CMS | Mulai Rp2.999.000 | Artikel, 1 peran editor, CRUD konten, 5 artikel awal, database dasar. |
| WEB-10 - E-Commerce Basic | Mulai Rp5.999.000 | 20 produk awal, keranjang, 1 payment gateway, pesanan; tanpa marketplace multi-vendor. |
| WEB-11 - Custom Frontend | Mulai Rp3.000.000 | 1-3 template halaman khusus; backend, CMS, domain, dan hosting terpisah. |

### A.2. Web application & backend

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| APP-01 - Booking System | Mulai Rp4.499.000 | 1 bisnis, jadwal, reservasi, dashboard; pembayaran bukan bawaan. |
| APP-02 - Custom API / Backend | Mulai Rp3.999.000 | Maksimal 5 endpoint bisnis, autentikasi dasar, 1 database, dokumentasi API. |
| APP-03 - Dashboard Analytics | Mulai Rp5.999.000 | 1 sumber data terstruktur, maksimal 5 metrik/grafik, filter dan ekspor. |
| APP-04 - Inventory System | Mulai Rp7.999.000 | 1 gudang, produk, stok masuk/keluar, laporan; bukan ERP akuntansi. |
| APP-05 - Web Application MVP | Mulai Rp9.999.000 | Login, 2 peran, database, maksimal 3 modul sederhana dengan acceptance criteria. |
| APP-06 - LMS / E-Learning | Mulai Rp12.999.000 | Kursus, materi, akun, progres; video hosting/ujian kompleks terpisah. |
| APP-07 - SaaS MVP | Mulai Rp19.999.000 | Tenant isolation dasar, subscription 1 provider, dashboard; discovery wajib. |
| APP-08 - Enterprise System | Mulai Rp49.999.000 | Discovery dan delivery bertahap; scope, SSO, integrasi dan SLA ditentukan quotation. |

### A.3. AI integration & automation

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| AI-01 - Workflow Automation | Mulai Rp1.499.000 | 1 alur, maksimal 3 integrasi sederhana; akun dan API disediakan klien. |
| AI-02 - AI Chatbot Basic | Mulai Rp2.999.000 | 1 widget website, 1 use case, system prompt, pembatasan biaya; API terpisah. |
| AI-03 - AI Customer Support | Mulai Rp4.999.000 | 1 knowledge base kecil, maksimal 20 FAQ, handoff admin; bukan agen tanpa pengawasan. |
| AI-04 - AI Document Processing | Mulai Rp5.999.000 | 1 tipe dokumen, maksimal 10 field, sampel evaluasi dan review hasil ekstraksi. |
| AI-05 - RAG Knowledge Assistant | Mulai Rp7.999.000 | 1 sumber dokumen, maksimal 100 dokumen awal/1.000 halaman, retrieval dan evaluasi. |
| AI-06 - AI Agent Custom | Mulai Rp14.999.000 | 1 workflow, maksimal 3 tool, human approval untuk aksi berisiko, log dan evaluasi. |
| AI-07 - Multi-Agent System | Mulai Rp29.999.000 | Discovery, orkestrasi terbatas, observability; hanya bila satu agent tidak mencukupi. |

### A.4. Machine learning & data science

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| ML-01 - Data Analysis | Mulai Rp2.999.000 | 1 dataset siap pakai, cleaning ringan, EDA, visualisasi dan laporan. |
| ML-02 - ML Proof of Concept | Mulai Rp5.999.000 | 1 target prediksi, baseline, validasi terpisah, laporan; belum production. |
| ML-03 - Predictive Analytics | Mulai Rp9.999.000 | 1 masalah regresi/forecasting, evaluasi sesuai waktu, prototipe API. |
| ML-04 - NLP / Text Classification | Mulai Rp12.999.000 | 1 tugas klasifikasi, data berlabel tersedia, preprocessing dan evaluasi per kelas. |
| ML-05 - Recommendation System | Mulai Rp14.999.000 | 1 use case rekomendasi, baseline, evaluasi offline; integrasi besar terpisah. |
| ML-06 - Computer Vision | Mulai Rp19.999.000 | 1 tugas klasifikasi/deteksi gambar, dataset tersedia; anotasi dan GPU terpisah. |
| ML-07 - Deep Learning Custom | Mulai Rp24.999.000 | Eksperimen/fine-tuning terbatas dengan budget compute disepakati; bukan foundation model baru. |
| ML-08 - ML Production / MLOps | Mulai Rp39.999.000 | 1 pipeline training/inference, versioning, deployment, monitoring dan rollback model. |

### A.5. Bug fixing & troubleshooting

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| BUG-01 - Diagnosis Error | Mulai Rp99.000 | 1 kasus, maksimal 45 menit investigasi; laporan penyebab/next step, bukan jaminan fix. |
| BUG-02 - Fix HTML / CSS / Responsive | Mulai Rp99.000 | 1 defect tampilan yang dapat direproduksi pada 1 komponen. |
| BUG-03 - Fix JavaScript | Mulai Rp149.000 | 1 defect frontend terisolasi; tidak termasuk refactor besar. |
| BUG-04 - Fix API | Mulai Rp199.000 | 1 endpoint/kontrak API yang bermasalah. |
| BUG-05 - Fix PHP / Laravel | Mulai Rp199.000 | 1 bug terisolasi pada aplikasi yang dapat dijalankan. |
| BUG-06 - Fix Node.js / Go | Mulai Rp249.000 | 1 bug backend terisolasi; bukan upgrade arsitektur. |
| BUG-07 - Fix Query Database | Mulai Rp249.000 | 1 query/error SQL; perubahan schema besar terpisah. |
| BUG-08 - Fix Login / Auth | Mulai Rp299.000 | 1 alur autentikasi; wajib akses sah dan uji regresi. |
| BUG-09 - Fix Docker / Container | Mulai Rp299.000 | 1 service/container; akses konfigurasi diperlukan. |
| BUG-10 - Fix Deployment Gagal | Mulai Rp249.000 | 1 pipeline/target deploy yang gagal; hosting terpisah. |
| BUG-11 - Fix Payment Gateway | Mulai Rp399.000 | 1 integrasi, sandbox/replay aman; tidak memproses pembayaran tanpa izin. |
| BUG-12 - Optimasi Performa Web | Mulai Rp499.000 | Audit 1 halaman dan perbaikan prioritas; tidak menjanjikan skor tertentu. |
| BUG-13 - Debug Multi-Service | Mulai Rp999.000 | Investigasi lintas service; scope lanjutan ditaksir setelah diagnosis. |

### A.6. Deployment & DevOps

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| DEP-01 - Deploy Website Statis | Mulai Rp99.000 | 1 build siap rilis, 1 environment; tanpa DNS domain baru/bug fixing. |
| DEP-02 - Deploy Cloudflare Workers | Mulai Rp149.000 | 1 Worker yang kompatibel, binding/environment dasar. |
| DEP-03 - Deploy Vercel / Netlify | Mulai Rp149.000 | 1 proyek dan konfigurasi build; paket provider sesuai penggunaan komersial. |
| DEP-04 - Deploy React / Svelte | Mulai Rp199.000 | 1 frontend dengan build yang sudah berhasil. |
| DEP-05 - Deploy PHP / Laravel | Mulai Rp299.000 | 1 aplikasi pada server siap pakai, environment dan smoke test. |
| DEP-06 - Deploy Node.js | Mulai Rp349.000 | 1 backend, process/container dan health check. |
| DEP-07 - Deploy Golang | Mulai Rp399.000 | 1 binary/service, environment, health check dan restart policy. |
| DEP-08 - Deploy Fullstack | Mulai Rp599.000 | 1 frontend + 1 backend + koneksi 1 DB yang tersedia. |
| DEP-09 - Setup Docker Compose | Mulai Rp499.000 | Maksimal 3 service, health check dan dokumentasi menjalankan. |
| DEP-10 - Reverse Proxy Nginx / Caddy | Mulai Rp249.000 | 1 aplikasi/domain, routing dan HTTPS sesuai akses tersedia. |
| DEP-11 - CI/CD GitHub Actions | Mulai Rp599.000 | 1 repositori, test/build/deploy ke 1 environment dengan secret terbatas. |
| DEP-12 - Staging + Production | Mulai Rp799.000 | 2 environment terpisah; resource dan database tidak tercampur. |
| DEP-13 - Low-Downtime Deployment | Mulai Rp1.499.000 | Strategi rollout/rollback; zero downtime hanya setelah kompatibilitas terbukti. |
| DEP-14 - Migrasi Antarserver | Mulai Rp999.000 | 1 aplikasi, rencana backup/cutover/rollback; ukuran data disepakati. |

### A.7. Server, DNS & infrastructure

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| INF-01 - Setup DNS | Mulai Rp99.000 | 1 domain, maksimal 5 record; jangan menimpa email aktif tanpa persetujuan. |
| INF-02 - Setup SSL / HTTPS | Mulai Rp99.000 | 1 hostname, sertifikat dan redirect; akses DNS/server diperlukan. |
| INF-03 - Cloudflare DNS & Proxy | Mulai Rp149.000 | 1 zone, pengecekan proxy dan origin TLS. |
| INF-04 - WAF Dasar | Mulai Rp299.000 | Aturan dasar sesuai fitur paket provider; bukan pentest atau anti-hack guarantee. |
| INF-05 - Email Domain / SMTP | Mulai Rp249.000 | 1 domain, maksimal 2 mailbox/account, SPF/DKIM/DMARC jika didukung. |
| INF-06 - Setup VPS Linux | Mulai Rp399.000 | 1 VPS, user non-root, update dasar, SSH; server belum termasuk. |
| INF-07 - Setup Web Server | Mulai Rp299.000 | 1 Nginx/Apache/Caddy, virtual host dan service management. |
| INF-08 - Setup Docker Engine | Mulai Rp299.000 | 1 server Linux, instalasi, validasi dan akses terbatas. |
| INF-09 - Monitoring Uptime | Mulai Rp249.000 | Maksimal 3 endpoint dan 1 kanal alert. |
| INF-10 - Firewall / SSH Hardening | Mulai Rp399.000 | 1 server; backup konfigurasi dan akses pemulihan sebelum perubahan. |
| INF-11 - Scheduled Backup | Mulai Rp399.000 | 1 sumber data, 1 tujuan backup, retensi dan 1 uji restore. |
| INF-12 - Logging & Monitoring | Mulai Rp599.000 | 1 aplikasi, error log, health metric dan alert dasar. |
| INF-13 - Audit Infrastruktur | Mulai Rp799.000 | 1 server/proyek cloud, temuan dan prioritas; remediasi terpisah. |
| INF-14 - Production Server Setup | Mulai Rp1.499.000 | 1 server, proxy, TLS, firewall, backup, monitoring dasar; tidak termasuk kode aplikasi. |

### A.8. Spreadsheet & lightweight data

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| SHT-01 - Spreadsheet Sederhana | Mulai Rp99.000 | 1 file, maksimal 3 tab, struktur input dan format dasar. |
| SHT-02 - Formula Otomatis | Mulai Rp199.000 | 1 file, maksimal 10 formula/aturan yang disepakati. |
| SHT-03 - Dashboard Spreadsheet | Mulai Rp299.000 | 1 sumber data, maksimal 5 indikator/grafik. |
| SHT-04 - Google Forms ke Sheets | Mulai Rp199.000 | 1 formulir, maksimal 15 field, 1 spreadsheet tujuan. |
| SHT-05 - Form Web ke Sheets | Mulai Rp299.000 | 1 formulir yang sudah ada, maksimal 10 field, integrasi append dasar. |
| SHT-06 - Spreadsheet as Storage | Mulai Rp399.000 | 1 formulir baru, maksimal 15 field, validasi, endpoint aman dan dokumentasi. |
| SHT-07 - Apps Script Automation | Mulai Rp499.000 | 1 workflow, 1 trigger dan error handling dasar. |
| SHT-08 - Sinkronisasi Sheets / API | Mulai Rp699.000 | 1 sumber-tujuan, 1 arah; sinkronisasi dua arah memerlukan quotation. |
| SHT-09 - Import / Export CSV Excel | Mulai Rp299.000 | 1 format terstruktur, mapping kolom dan validasi dasar. |
| SHT-10 - Data Cleaning Spreadsheet | Mulai Rp299.000 | 1 dataset, aturan duplikasi/format; volume disepakati sebelum mulai. |
| SHT-11 - Laporan Keuangan Spreadsheet | Mulai Rp499.000 | Template arus kas/laporan sederhana; bukan audit atau nasihat akuntansi. |
| SHT-12 - Multi-User Workflow | Mulai Rp799.000 | Maksimal 3 peran operasional, 1 alur persetujuan; batas akses diuji. |
| SHT-13 - Migrasi Sheets ke Database | Mulai Rp999.000 | 1 dataset/sumber, mapping schema dan validasi sampel; ukuran disepakati. |
| SHT-14 - Managed Sheets Support | Mulai Rp49.000 / bulan | 1 integrasi, pemeriksaan otomatis + maksimal 15 menit bantuan/bulan; tanpa fitur baru. |

### A.9. Database services

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| DB-01 - Setup SQLite | Mulai Rp149.000 | 1 file DB/schema awal dan konfigurasi akses aplikasi. |
| DB-02 - Setup Cloudflare D1 | Mulai Rp249.000 | 1 DB, binding Worker dan migration awal. |
| DB-03 - Setup MySQL / MariaDB | Mulai Rp299.000 | 1 instance siap pakai, user terbatas dan koneksi aplikasi. |
| DB-04 - Setup PostgreSQL | Mulai Rp349.000 | 1 instance, database/user, akses jaringan terbatas. |
| DB-05 - Setup Supabase | Mulai Rp399.000 | 1 proyek, konfigurasi koneksi dan RLS bila akses dari client. |
| DB-06 - Database Schema | Mulai Rp399.000 | Maksimal 5 tabel relasional, constraint dan diagram sederhana. |
| DB-07 - Integrasi Database | Mulai Rp499.000 | 1 modul website yang sudah ada ke 1 database. |
| DB-08 - CRUD API + DB | Mulai Rp999.000 | 1 resource, maksimal 5 operasi, validasi dan akses dasar; bukan aplikasi lengkap. |
| DB-09 - Database Migration | Mulai Rp699.000 | 1 schema/dataset, dry run dan verifikasi; volume disepakati. |
| DB-10 - Query / Index Optimization | Mulai Rp499.000 | Maksimal 3 query dengan explain/benchmark sebelum dan sesudah. |
| DB-11 - Backup & Restore DB | Mulai Rp399.000 | 1 database, 1 backup dan 1 uji restore ke lokasi non-production. |
| DB-12 - Database Replication | Mulai Rp1.999.000 | 1 primary dan 1 replica; topology, failover dan biaya compute terpisah. |
| DB-13 - Database Audit / Hardening | Mulai Rp799.000 | 1 DB: user, grants, jaringan, backup dan logging. |
| DB-14 - Performance Tuning DB | Mulai Rp999.000 | 1 workload terukur; target dan batas perubahan disepakati. |

### A.10. Database management packages

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| DBM-01 - DB Lite Setup | Mulai Rp249.000 | SQLite/D1; 1 DB, konfigurasi dasar; alternatif bundel, bukan biaya tambahan DB-02. |
| DBM-02 - DB Lite Management | Mulai Rp49.000 / bulan | 1 DB, cek otomatis + maksimal 15 menit bantuan/bulan; biaya provider terpisah. |
| DBM-03 - DB Basic Setup | Mulai Rp499.000 | Supabase/PostgreSQL terkelola, user/grants dan 1 rencana backup. |
| DBM-04 - DB Basic Management | Mulai Rp99.000 / bulan | 1 DB, review bulanan + maksimal 30 menit bantuan/bulan; compute terpisah. |
| DBM-05 - DB Business Setup | Mulai Rp999.000 | PostgreSQL/MySQL, konfigurasi operasional dan uji restore. |
| DBM-06 - DB Business Management | Mulai Rp199.000 / bulan | 1 DB, review backup + maksimal 60 menit bantuan/bulan; tanpa on-call. |
| DBM-07 - DB Advanced Setup | Mulai Rp2.499.000 | Dedicated service dengan discovery, akses, backup dan monitoring. |
| DBM-08 - DB Advanced Management | Mulai Rp499.000 / bulan | Review operasional + maksimal 2 jam bantuan/bulan; SLA khusus terpisah. |

### A.11. File & cloud storage setup

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| STO-01 - Setup R2 Bucket | Mulai Rp249.000 | 1 bucket, binding/credential terbatas dan kebijakan akses. |
| STO-02 - Private File Storage | Mulai Rp399.000 | 1 bucket private, auth/signed access; tidak terbuka untuk publik. |
| STO-03 - Upload Gambar Website | Mulai Rp499.000 | 1 alur upload, validasi tipe/ukuran; transformasi gambar berbayar terpisah. |
| STO-04 - File Manager Sederhana | Mulai Rp799.000 | 1 role, list/upload/delete dengan scope akses terbatas. |
| STO-05 - Protected Download | Mulai Rp499.000 | 1 alur download terautentikasi atau signed URL dengan masa berlaku. |
| STO-06 - Google Drive API | Mulai Rp499.000 | 1 workflow file dengan izin minimum; bukan folder publik tanpa kontrol. |
| STO-07 - Migrasi File | Mulai Rp499.000 | 1 sumber dan 1 tujuan, checksum/sampling; ukuran ditentukan quotation. |
| STO-08 - Otomasi Backup File | Mulai Rp399.000 | 1 sumber, 1 tujuan, retensi dan verifikasi pemulihan. |
| STO-09 - Storage API + Access Control | Mulai Rp999.000 | 1 namespace/tenant, operasi file dan otorisasi objek. |

### A.12. Managed storage subscriptions

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| MS-01 - Storage Mini | Rp19.000 / bulan | 1 GB, 1.000 operasi tulis dan 25.000 baca/bulan, maksimal 10 MB/file. |
| MS-02 - Storage Basic | Rp39.000 / bulan | 5 GB, 5.000 tulis dan 100.000 baca/bulan, maksimal 25 MB/file. |
| MS-03 - Storage Business | Rp99.000 / bulan | 20 GB, 20.000 tulis dan 500.000 baca/bulan, maksimal 50 MB/file. |
| MS-04 - Storage Pro | Rp199.000 / bulan | 50 GB, 50.000 tulis dan 1 juta baca/bulan, maksimal 100 MB/file. |
| MS-05 - Storage Enterprise | Quotation / bulan | Kapasitas, operasi, retensi, backup dan SLA berdasarkan kebutuhan. |

### A.13. Security, backup & maintenance

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| SEC-01 - Basic Security Check | Mulai Rp299.000 | 1 website, konfigurasi publik dan temuan dasar; bukan pentest menyeluruh. |
| SEC-02 - Dependency Scan | Mulai Rp399.000 | 1 repositori/stack, triase temuan dependency; remediasi terpisah. |
| SEC-03 - Security Configuration Review | Mulai Rp599.000 | 1 aplikasi/lingkungan, review auth/header/secrets yang disepakati. |
| SEC-04 - Web Security Audit | Mulai Rp1.499.000 | Scope dan otorisasi tertulis; deliverable laporan, bukan sertifikasi keamanan. |
| SEC-05 - Remediasi Kerentanan | Mulai Rp499.000 | 1 temuan terkonfirmasi, fix dan retest sesuai scope. |
| SEC-06 - Setup Backup Otomatis | Mulai Rp399.000 | Setara INF-11 untuk scope yang sama; tidak boleh ditagih dua kali. |
| SEC-07 - Disaster Recovery Drill | Mulai Rp999.000 | 1 skenario pemulihan non-production dengan hasil RPO/RTO terukur. |
| SEC-08 - Security Monitoring Basic | Mulai Rp199.000 / bulan | Alert otomatis + review terjadwal, maksimal 30 menit/bulan; bukan SOC 24/7. |
| SEC-09 - Website Maintenance | Mulai Rp149.000 / bulan | Maksimal 30 menit pekerjaan minor/bulan, 1 website, tanpa redesign. |
| SEC-10 - Web App Maintenance | Mulai Rp499.000 / bulan | Maksimal 2 jam/bulan, triase bug dan update kecil; fitur baru terpisah. |
| SEC-11 - Managed VPS | Mulai Rp399.000 / bulan | 1 VPS, patch/review terjadwal, maksimal 1 jam/bulan; compute terpisah. |
| SEC-12 - Managed Infrastructure | Mulai Rp1.499.000 / bulan | Scope multi-service, maksimal 4 jam/bulan awal; on-call terpisah. |
| SEC-13 - AI / ML Maintenance | Mulai Rp1.000.000 / bulan | Evaluasi/monitoring terjadwal, maksimal 3 jam/bulan; token/GPU/retraining terpisah. |

### A.14. Website & integration add-ons

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| ADD-01 - Setup Custom Domain | Rp150.000 | 1 domain klien ke website yang kompatibel; tidak ditambah bila sudah termasuk paket. |
| ADD-02 - Registrasi Domain | Biaya aktual / tahun | Biaya registrar aktual + setup jika belum tercakup; kepemilikan atas nama klien. |
| ADD-03 - Halaman Statis Tambahan | Rp150.000-Rp350.000 | 1 halaman berdasarkan komponen yang sudah tersedia. |
| ADD-04 - Landing Page Khusus | Rp500.000-Rp1.500.000 | 1 halaman kampanye tambahan; tidak sama dengan WEB-04 template. |
| ADD-05 - Desain UI Halaman Custom | Rp300.000-Rp750.000 | 1 desain halaman; implementasi kode terpisah kecuali dinyatakan. |
| ADD-06 - Form Email / Notifikasi | Rp250.000-Rp500.000 | 1 formulir/tujuan email; biaya pengiriman provider terpisah. |
| ADD-07 - Analytics & Search Console | Rp200.000-Rp400.000 | 1 website/properti, event dasar dan verifikasi; akses klien diperlukan. |
| ADD-08 - Technical SEO | Rp500.000-Rp1.500.000 | Audit/perbaikan teknis terukur; tidak menjamin peringkat Google. |
| ADD-09 - Blog / CMS Add-on | Rp1.500.000-Rp3.000.000 | Modul artikel untuk website yang sudah ada; bukan WEB-09 website baru. |
| ADD-10 - Dashboard Admin Sederhana | Mulai Rp1.500.000 | 1 resource/role admin; dashboard custom multi-modul mulai ADD-11. |
| ADD-11 - Dashboard Admin Custom | Mulai Rp3.000.000 | Scope khusus; autentikasi, role dan modul ditaksir terpisah. |
| ADD-12 - Bahasa Tambahan | Rp500.000-Rp1.500.000 | 1 bahasa, maksimal 5 halaman; klien menyediakan terjemahan, copywriting terpisah. |
| ADD-13 - Katalog Produk Add-on | Rp750.000-Rp2.000.000 | Tambahan katalog tanpa pembayaran pada website yang sudah ada. |
| ADD-14 - Integrasi API Eksternal | Mulai Rp1.000.000 | 1 provider/use case; sandbox, dokumentasi dan akses diperlukan. |
| ADD-15 - Integrasi Payment Gateway | Mulai Rp750.000 | 1 gateway pada checkout yang sudah tersedia, webhook/idempotency; biaya provider terpisah. |
| ADD-16 - Migrasi Hosting Web | Rp500.000-Rp2.000.000 | Website sederhana; aplikasi multi-service menggunakan DEP-14. |
| ADD-17 - Perubahan Konten Mini | Mulai Rp49.000 | 1 batch maksimal 5 perubahan teks/gambar, tanpa layout baru. |
| ADD-18 - Fitur Custom Tambahan | Quotation | Estimasi berdasarkan scope, integrasi dan acceptance criteria. |

### A.15. Ready-to-buy bundles

| Kode dan layanan | Harga | Cakupan awal |
|---|---|---|
| BND-01 - Tech Support Starter | Mulai Rp149.000 | 1 kendala sederhana, diagnosis + fix maksimal 1 jam jika feasible; tidak menjamin semua bug selesai. |
| BND-02 - Website Go Live | Mulai Rp399.000 | Frontend siap rilis, deploy + 1 domain existing + SSL + smoke test. |
| BND-03 - Website + Spreadsheet | Mulai Rp449.000 | WEB-01 + 1 form maksimal 10 field ke Sheets; diskon bundel, bukan menjumlah SKU mentah. |
| BND-04 - Backend Starter | Mulai Rp1.499.000 | 1 CRUD resource + DB + deployment ke environment siap; bukan APP-02 lengkap. |
| BND-05 - Production Ready | Mulai Rp2.999.000 | Fullstack siap rilis, Compose, proxy, TLS, backup dan monitor; aplikasi bukan dibuat dari nol. |

### A.16. Perpanjangan website mulai tahun kedua

| Paket | Per tahun | Termasuk / tidak termasuk |
|---|---|---|
| WEB-01 - Compro Mini | Rp99.000 | Subdomain + hosting template terkelola; tanpa perubahan konten. |
| WEB-02 - Mini Domain Sendiri | Rp199.000 | Hosting/pengelolaan; perpanjangan domain dibayar klien terpisah. |
| WEB-03 - Mini Domain Baru | Rp199.000 | Pengelolaan + biaya renewal domain aktual; Rp199.000 bukan total termasuk domain. |
| WEB-04 - Landing Page | Rp149.000 | Subdomain + hosting statis terkelola. |
| WEB-05 - Compro Starter | Rp299.000 | Subdomain + hosting statis terkelola. |
| WEB-06 - Compro Business | Rp599.000 | Termasuk anggaran renewal domain Rp249.000; selisih biaya aktual ditambahkan. |
| WEB-07 - Compro Professional | Rp1.499.000 | Termasuk anggaran renewal domain Rp249.000; selisih biaya aktual ditambahkan. |
| WEB-08 - Katalog Produk | Rp399.000 | Katalog statis, subdomain; perubahan produk tidak termasuk. |
| WEB-09 - Blog / CMS | Mulai Rp1.200.000 | Mulai; kapasitas DB/operasi dalam quotation, bukan resource tanpa batas. |
| WEB-10 - E-Commerce Basic | Mulai Rp1.800.000 | Mulai; resource aplikasi dalam quotation, biaya transaksi provider terpisah. |
| BND-03 - Website + Spreadsheet | Rp99.000 | Hosting website; dukungan integrasi Sheets SHT-14 opsional dan ditagih terpisah. |

# Lampiran B - Referensi Teknis Resmi

Dokumentasi diperiksa pada 27 Oktober 2026. Harga vendor, kuota, dukungan adapter dan versi runtime harus diperiksa kembali saat implementasi. Sumber ini mendukung fakta platform; harga jual pada Lampiran A merupakan keputusan komersial yang diusulkan, bukan harga vendor.

**[R01] Astro - Islands architecture**

`https://docs.astro.build/en/concepts/islands/`

**[R02] Astro - Cloudflare adapter**

`https://docs.astro.build/en/guides/integrations-guide/cloudflare/`

**[R03] SvelteKit - Cloudflare**

`https://svelte.dev/docs/kit/adapter-cloudflare`

**[R04] Cloudflare - Next.js / vinext**

`https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/`

**[R05] Cloudflare - OpenNext adapter**

`https://developers.cloudflare.com/workers/framework-guides/web-apps/opennext/`

**[R06] Cloudflare Workers - Pricing**

`https://developers.cloudflare.com/workers/platform/pricing/`

**[R07] Cloudflare Workers - Static Assets**

`https://developers.cloudflare.com/workers/static-assets/`

**[R08] Cloudflare Workers - Limits**

`https://developers.cloudflare.com/workers/platform/limits/`

**[R09] Cloudflare D1 - Limits**

`https://developers.cloudflare.com/d1/platform/limits/`

**[R10] Cloudflare R2 - Pricing**

`https://developers.cloudflare.com/r2/pricing/`

**[R11] Google Sheets API - Usage limits**

`https://developers.google.com/workspace/sheets/api/limits`

**[R12] Google Search Central - Localized versions**

`https://developers.google.com/search/docs/specialty/international/localized-versions`

**[R13] Google Search Central - Multilingual sites**

`https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites`

**[R14] web.dev - Core Web Vitals thresholds**

`https://web.dev/articles/defining-core-web-vitals-thresholds`

**[R15] W3C - WCAG 2.2 contrast minimum**

`https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html`

**[R16] Cloudflare Turnstile - Server-side validation**

`https://developers.cloudflare.com/turnstile/get-started/server-side-validation/`

**[R17] Cloudflare Workers - Custom Domains**

`https://developers.cloudflare.com/workers/configuration/routing/custom-domains/`

**[R18] Cloudflare Workers - Languages**

`https://developers.cloudflare.com/workers/languages/`

**[R19] Hono - Cloudflare Workers**

`https://hono.dev/docs/getting-started/cloudflare-workers`

**[R20] Laravel - Octane**

`https://laravel.com/framework/docs/13.x/octane.md`

**[R21] WordPress - Requirements**

`https://wordpress.org/about/requirements/`

**[R22] Cloudflare - Nuxt**

`https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/`

**[R23] Go - Documentation**

`https://go.dev/doc/`

**[R24] Axum - Official crate documentation**

`https://docs.rs/axum/latest/axum/`

**[R25] FastAPI - Deployment**

`https://fastapi.tiangolo.com/deployment/`

**[R26] Django - Documentation**

`https://docs.djangoproject.com/en/stable/`

**[R27] Microsoft - ASP.NET Core overview**

`https://learn.microsoft.com/en-us/aspnet/core/overview`

**[R28] Spring - Spring Boot**

`https://spring.io/projects/spring-boot/`

