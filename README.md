# Belajar Ads (belajarads.com)

> **Brand Philosophy:** *Advertising is learned by doing.*  
> **Brand USP:** *Learn. Launch. Optimize.*  
> **Hero Statement:** *Learn Ads. Launch Campaigns. Grow.*

Belajar Ads adalah platform edukasi periklanan digital modern yang membantu individu dan bisnis membangun kemampuan menjalankan iklan secara terstruktur dan praktis melalui program Bootcamp, E-Course, Live Training, Workshop, Private Mentoring, dan Komunitas praktisi.

Website ini dibangun sebagai **custom web application** tanpa WordPress dengan arsitektur App Router Next.js, relational database Prisma ORM, CMS admin panel internal, dukungan bilingual (ID / EN), dan optimasi SEO foundation.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Black + White + Orange signature branding)
- **Icons**: Lucide React
- **Database & ORM**: Prisma ORM (SQLite untuk local dev zero-config, PostgreSQL untuk deployment production)
- **Authentication**: JWT Cookie session dengan bcryptjs hashing
- **Deployment**: Node.js-compatible hosting (WebNesia, cPanel Node.js Selector, VPS, Railway, Render, Docker)

---

## 📁 Struktur Routing Utama

### Public Routes
| Route | Deskripsi |
| :--- | :--- |
| `/[locale]` | Beranda utama dengan Dashboard preview & filosofi brand |
| `/[locale]/programs` | Katalog semua format program pembelajaran |
| `/[locale]/programs/meta-ads` | Halaman kurikulum spesialisasi Meta Ads |
| `/[locale]/programs/e-course` | Modul pembelajaran video mandiri (self-paced) |
| `/[locale]/programs/training` | Program kelas interaktif online & offline |
| `/[locale]/programs/workshop` | Sesi workshop intensif topik spesifik & hands-on |
| `/[locale]/programs/private-mentoring` | Pendampingan privat 1-on-1 bersama praktisi |
| `/[locale]/events` | Daftar upcoming events dan dokumentasi past events |
| `/[locale]/events/[slug]` | Detail event, pemateri, rundown agenda, & tiket |
| `/[locale]/community` | Ekosistem komunitas pembelajar & media buyer |
| `/[locale]/for-business` | Solusi Corporate & In-House Team Training + Form |
| `/[locale]/resources` | Content Hub (Articles, Tutorials, Case Studies, dll) |
| `/[locale]/resources/articles` | Daftar artikel terbitan dari database |
| `/[locale]/resources/articles/[slug]` | Halaman artikel editorial dinamis + SEO metadata |
| `/[locale]/resources/tutorials` | Tutorial teknis (Pixel, CAPI, Business Manager) |
| `/[locale]/resources/case-studies` | Pembahasan studi kasus kampanye & data riil |
| `/[locale]/resources/ads-breakdown` | Bedah hook video UGC dan materi kreatif |
| `/[locale]/resources/free-resources` | Unduhan template & checklist audit akun |
| `/[locale]/about` | Kisah, visi, misi, dan profil mentor praktisi |
| `/[locale]/contact` | Informasi kontak resmi & formulir kirim pesan |

### Admin & CMS Routes
| Route | Deskripsi |
| :--- | :--- |
| `/admin/login` | Halaman login administrator |
| `/admin` | Dashboard statistik (Artikel, Program, Event, Leads) |
| `/admin/articles` | Manajemen artikel (Create, Edit, Draft/Publish, Delete) |
| `/admin/programs` | Manajemen program belajar & status ketersediaan |
| `/admin/events` | Manajemen jadwal workshop & kuota pendaftaran |
| `/admin/resources` | Manajemen konten teknis & link unduhan materi |
| `/admin/mentors` | Manajemen data & foto profil mentor |
| `/admin/leads` | CRM pengelolaan kontak masuk & prospek corporate |
| `/admin/settings` | Pengaturan terpusat tautan WA, Community, LMS, Pixel |

---

## 🛠️ Panduan Menjalankan Secara Lokal (Local Development)

### 1. Prasyarat
- Node.js versi 18 atau lebih baru (Node 20+ direkomendasikan)
- npm / pnpm / yarn

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variable
Duplikasi file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Secara default untuk lokal, database menggunakan SQLite zero-config:
```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="belajar_ads_jwt_secret_dev_2026_super_secure_key_12345"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 4. Setup Database & Seeding
Jalankan sinkronisasi tabel dan pemuatan data awal:
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Buka browser di:
- **Website Publik**: [http://localhost:3000](http://localhost:3000) (otomatis redirect ke `/id`)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)

#### Kredensial Login Admin Default:
- **Email**: `admin@belajarads.com`
- **Password**: `AdminPassword123!`

---

## 🚢 Panduan Deployment ke Server / WebNesia / cPanel Node.js

### 1. Persiapan Database Production (PostgreSQL)
Jika Anda menggunakan PostgreSQL (Supabase, Neon, Railway, atau PostgreSQL WebNesia), ubah konfigurasi pada `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
Lalu isi `DATABASE_URL` di `.env` server:
```env
DATABASE_URL="postgresql://user:password@host:5432/belajarads_db?schema=public"
```

### 2. Build Production
Jalankan proses kompilasi:
```bash
npx prisma generate
npm run build
```

### 3. Jalankan Aplikasi
```bash
npm run start
```
Atau menggunakan process manager PM2 di VPS:
```bash
pm2 start npm --name "belajar-ads" -- start
```

---

## 🔒 Keamanan & Kebijakan Data
- Kata sandi admin di-hash menggunakan algoritma **bcryptjs** satu arah.
- Sesi login dilindungi dengan **HTTP-Only, SameSite cookie**.
- Halaman admin dilindungi oleh Next.js Server Middleware.
- Seluruh URL integrasi eksternal (WhatsApp, Community, LMS) dikelola dari satu konfigurasi terpusat dan memiliki fallback notifikasi bila URL belum diset.

---
© 2026 Belajar Ads (belajarads.com). All rights reserved.
