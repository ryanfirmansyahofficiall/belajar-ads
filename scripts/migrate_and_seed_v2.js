const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('--- STARTING V2 DATABASE MIGRATION & SEED ---');

  // 1. Ensure Admin User
  const passwordHash = await bcrypt.hash('AdminPassword123!', 10);
  await prisma.adminUser.upsert({
    where: { email: 'admin@belajarads.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@belajarads.com',
      password: passwordHash,
      role: 'SUPERADMIN',
    },
  });
  console.log('✓ Admin User verified');

  // 2. Page Visibility Defaults
  const pageVisibilities = [
    { pageKey: 'programs', name: 'Programs', route: '/programs', isVisible: true },
    { pageKey: 'events', name: 'Events', route: '/events', isVisible: true },
    { pageKey: 'community', name: 'Community', route: '/community', isVisible: true },
    { pageKey: 'for_business', name: 'For Business', route: '/for-business', isVisible: true },
    { pageKey: 'resources', name: 'Resources', route: '/resources', isVisible: true },
    { pageKey: 'about', name: 'About Us', route: '/about', isVisible: true },
    { pageKey: 'contact', name: 'Contact', route: '/contact', isVisible: true },
    { pageKey: 'articles', name: 'Articles', route: '/resources/articles', isVisible: true },
    { pageKey: 'tutorials', name: 'Tutorials', route: '/resources/tutorials', isVisible: true },
    { pageKey: 'case_studies', name: 'Case Studies', route: '/resources/case-studies', isVisible: true },
    { pageKey: 'ads_breakdown', name: 'Ads Breakdown', route: '/resources/ads-breakdown', isVisible: true },
    { pageKey: 'free_resources', name: 'Free Resources', route: '/resources/free-resources', isVisible: true },
  ];

  for (const pv of pageVisibilities) {
    await prisma.pageVisibility.upsert({
      where: { pageKey: pv.pageKey },
      update: { name: pv.name, route: pv.route },
      create: pv,
    });
  }
  console.log('✓ Page Visibility records initialized');

  // 3. Mentors (Bilingual)
  const mentors = [
    {
      id: 'mentor-1',
      name: 'Ryan Firmansyah',
      roleId: 'Senior Performance Marketer & Meta Ads Lead',
      roleEn: 'Senior Performance Marketer & Meta Ads Lead',
      photo: 'https://ryanfirmansyah.my.id/wp-content/uploads/2026/01/Ryan-Pro.png',
      bioId: 'Praktisi media buyer dengan pengalaman lebih dari 7 tahun mengelola budget iklan miliaran rupiah di berbagai industri direct-to-consumer dan lead generation.',
      bioEn: 'Seasoned performance marketer with 7+ years managing multi-billion rupiah ad budgets across direct-to-consumer and high-ticket lead generation funnels.',
      expertiseId: 'Meta Ads, Campaign Structuring, Scaling, Creative Strategy',
      expertiseEn: 'Meta Ads, Campaign Structuring, Scaling, Creative Strategy',
      socialUrl: '',
      order: 1,
    },
    {
      id: 'mentor-2',
      name: 'Rian Pratama',
      roleId: 'Creative Strategist & Direct Response Specialist',
      roleEn: 'Creative Strategist & Direct Response Specialist',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      bioId: 'Fokus pada riset customer psychology, direct-response copywriting, dan framework video UGC yang dirancang untuk menghasilkan konversi tinggi.',
      bioEn: 'Focused on customer behavioral psychology, direct response copywriting, and high-converting UGC video frameworks.',
      expertiseId: 'Creative Testing, Copywriting, Video Ads, Funnel Architecture',
      expertiseEn: 'Creative Testing, Copywriting, Video Ads, Funnel Architecture',
      socialUrl: '',
      order: 2,
    },
    {
      id: 'mentor-3',
      name: 'Sarah Wijaya',
      roleId: 'Data & Tracking Specialist',
      roleEn: 'Data & Tracking Specialist',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
      bioId: 'Membantu ratusan brand memastikan tracking attribution yang akurat melalui Meta Conversions API (CAPI), Google Tag Manager, dan data diagnostics.',
      bioEn: 'Helped hundreds of brands secure airtight attribution through Meta Conversions API (CAPI), Google Tag Manager, and server-side diagnostics.',
      expertiseId: 'Pixel, CAPI, Data Diagnostics, Attribution Modeling',
      expertiseEn: 'Pixel, CAPI, Data Diagnostics, Attribution Modeling',
      socialUrl: '',
      order: 3,
    },
  ];

  for (const m of mentors) {
    await prisma.mentor.upsert({
      where: { id: m.id },
      update: m,
      create: m,
    });
  }
  console.log('✓ Mentors seeded (bilingual)');

  // 4. Programs (Bilingual)
  const programs = [
    {
      id: 'prog-meta-masterclass',
      slug: 'meta-ads-mastery-bootcamp',
      nameId: 'Meta Ads Mastery Bootcamp',
      nameEn: 'Meta Ads Mastery Bootcamp',
      category: 'TRAINING',
      topic: 'Meta Ads',
      descriptionId: 'Program intensif 4 minggu mempelajari Meta Ads end-to-end: mulai dari riset market, setup tracking CAPI, struktur campaign CBO/ABO, hingga scaling bertahap.',
      descriptionEn: 'A 4-week intensive bootcamp covering Meta Ads end-to-end: market research, CAPI tracking setup, CBO/ABO structuring, and repeatable scaling frameworks.',
      overviewId: 'Bootcamp interaktif yang menggabungkan live session mingguan, review materi iklan langsung dari praktisi, dan lembar kerja campaign nyata.',
      overviewEn: 'Live weekly interactive sessions, direct campaign teardowns by practitioners, and hands-on execution worksheets.',
      level: 'All Levels',
      format: 'Live Online Cohort',
      isOnline: true,
      duration: '4 Minggu (8 Sesi Live)',
      price: 'Rp 2.499.000',
      instructor: 'Ryan Firmansyah & Tim Praktisi',
      startDate: 'Batch Berikutnya: 15 November 2026',
      registrationStatus: 'AVAILABLE',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      ctaTextId: 'Daftar Batch Terbaru',
      ctaTextEn: 'Join Next Cohort',
      registrationUrl: '',
      isFeatured: true,
    },
    {
      id: 'prog-ecourse-fundamental',
      slug: 'meta-ads-fundamental-ecourse',
      nameId: 'Meta Ads Fundamental E-Course',
      nameEn: 'Meta Ads Fundamental E-Course',
      category: 'ECOURSE',
      topic: 'Meta Ads',
      descriptionId: 'Belajar mandiri kapan saja dengan video on-demand terstruktur. Memandu Anda dari nol hingga memahami Ads Manager, navigasi dashboard, dan meluncurkan campaign pertama.',
      descriptionEn: 'Self-paced structured video learning. Guides you from scratch through Ads Manager navigation, metric diagnostics, and launching your first winning campaign.',
      overviewId: 'Akses seumur hidup ke 35+ modul video terstruktur, template riset audiens, dan update berkala.',
      overviewEn: 'Lifetime access to 35+ structured video modules, customer avatar worksheets, and continuous updates.',
      level: 'Pemula (Beginner)',
      format: 'Self-Paced Video',
      isOnline: true,
      duration: '35+ Video Modules',
      price: 'Rp 699.000',
      instructor: 'Tim Belajar Ads',
      startDate: 'Akses Instan Kapan Saja',
      registrationStatus: 'AVAILABLE',
      featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      ctaTextId: 'Mulai Belajar Sekarang',
      ctaTextEn: 'Start Learning Now',
      registrationUrl: '',
      isFeatured: true,
    },
    {
      id: 'prog-creative-workshop',
      slug: 'high-converting-creative-workshop',
      nameId: 'High-Converting Ads Creative Workshop',
      nameEn: 'High-Converting Ads Creative Workshop',
      category: 'WORKSHOP',
      topic: 'Creative & Copywriting',
      descriptionId: 'Workshop praktis merancang sudut pandang iklan (angles), copywriting direct-response, dan storyboard video yang menghentikan scroll dan mendorong konversi.',
      descriptionEn: 'Hands-on workshop to engineer persuasive hooks, direct-response copy angles, and video storyboards that stop the scroll and drive conversions.',
      overviewId: 'Praktek langsung membuat 10 variasi hook kreatif dalam satu sesi dibimbing oleh Creative Strategist.',
      overviewEn: 'Live interactive build of 10 creative hooks and briefs coached directly by Creative Strategists.',
      level: 'Intermediate',
      format: 'Workshop Praktek',
      isOnline: true,
      duration: '1 Hari Full (6 Jam)',
      price: 'Rp 1.250.000',
      instructor: 'Rian Pratama',
      startDate: '28 November 2026',
      registrationStatus: 'AVAILABLE',
      featuredImage: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80',
      ctaTextId: 'Amankan Kursi Workshop',
      ctaTextEn: 'Reserve Your Seat',
      registrationUrl: '',
      isFeatured: true,
    },
    {
      id: 'prog-private-mentoring',
      slug: '1-on-1-performance-mentoring',
      nameId: '1-on-1 Performance Mentoring',
      nameEn: '1-on-1 Performance Mentoring',
      category: 'PRIVATE_MENTORING',
      topic: 'Account Audit & Scaling',
      descriptionId: 'Bimbingan intensif privat langsung di akun iklan Anda bersama senior media buyer. Bedah problem attribution, evaluasi funnel, dan strategi scaling spesifik bisnis Anda.',
      descriptionEn: 'Intensive private advisory directly inside your ad account with a senior media buyer. Diagnose attribution leaks, optimize your funnel, and scale with confidence.',
      overviewId: '4 sesi privat online via Zoom @ 90 menit dengan review dashboard iklan personal dan support berkala.',
      overviewEn: 'Four 90-minute private Zoom sessions with customized campaign roadmap and asynchronous review support.',
      level: 'Intermediate to Advanced',
      format: '1-on-1 Private Sessions',
      isOnline: true,
      duration: '4 Sesi @ 90 Menit',
      price: 'Hubungi Kami',
      instructor: 'Senior Media Buyer',
      startDate: 'Jadwal Fleksibel',
      registrationStatus: 'AVAILABLE',
      featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
      ctaTextId: 'Konsultasi Kebutuhan',
      ctaTextEn: 'Consult With Us',
      registrationUrl: '',
      isFeatured: false,
    },
    {
      id: 'prog-company-training',
      slug: 'corporate-in-house-training',
      nameId: 'Corporate & In-House Team Training',
      nameEn: 'Corporate & In-House Team Training',
      category: 'COMPANY_TRAINING',
      topic: 'In-House Ads Team',
      descriptionId: 'Program pelatihan advertising terstandarisasi untuk tim internal perusahaan atau brand yang ingin meningkatkan kemandirian media buying dan efisiensi belanja iklan.',
      descriptionEn: 'Standardized performance marketing training for in-house company teams wanting operational media buying self-sufficiency and improved ROAS efficiency.',
      overviewId: 'Kurikulum disesuaikan dengan produk, target market, dan business model spesifik perusahaan Anda.',
      overviewEn: 'Custom curriculum tailored to your specific industry, product lines, and business model.',
      level: 'Customized for Team',
      format: 'Offline / In-House / Hybrid',
      isOnline: false,
      duration: '2 - 3 Hari Workshop',
      price: 'Custom Proposal',
      instructor: 'Belajar Ads Corporate Team',
      startDate: 'Berdasarkan Kesepakatan',
      registrationStatus: 'AVAILABLE',
      featuredImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      ctaTextId: 'Ajukan Training Tim',
      ctaTextEn: 'Request Team Proposal',
      registrationUrl: '',
      isFeatured: false,
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log('✓ Programs seeded (bilingual)');

  // 5. Events (Bilingual)
  const events = [
    {
      id: 'ev-meta-scaling',
      slug: 'meta-ads-scaling-intensive',
      titleId: 'Meta Ads Scaling & Creative Testing Workshop',
      titleEn: 'Meta Ads Scaling & Creative Testing Workshop',
      category: 'WORKSHOP',
      date: '2026-10-18',
      time: '19:30 - 21:30 WIB',
      location: 'Live Zoom Meeting',
      isOnline: true,
      speaker: 'Ryan Firmansyah',
      speakerRoleId: 'Head of Performance Marketing',
      speakerRoleEn: 'Head of Performance Marketing',
      descriptionId: 'Pelajari metode testing kreatif dan struktur campaign yang tepat untuk meningkatkan budget tanpa merusak performa iklan.',
      descriptionEn: 'Master creative testing methodologies and campaign architectures to scale budgets efficiently without degrading ROAS.',
      agendaId: '["Penyebab umum fatigue materi iklan dan cara mengatasinya","Struktur CBO vs ABO untuk fase scale up","Framework evaluasi metrik 7 hari pertama","Live Q&A dan bedah akun peserta terpilih"]',
      agendaEn: '["Common causes of ad fatigue and how to counter it","CBO vs ABO structuring for scaling phases","7-day KPI evaluation framework","Live Q&A and ad account teardowns"]',
      whatYouWillLearnId: '["Framework testing 10+ variasi sudut kreatif secara efisien","Cara membaca breakdown data audiens dan placement","Strategi scaling horizontal vs vertical di Meta Ads"]',
      whatYouWillLearnEn: '["Testing 10+ creative angles systematically","Interpreting audience and placement breakdown data","Horizontal vs vertical scaling strategies on Meta"]',
      whoShouldAttendId: 'Advertiser, business owner, dan media buyer yang sudah pernah beriklan dan ingin meningkatkan performa.',
      whoShouldAttendEn: 'Advertisers, brand founders, and media buyers who currently run campaigns and want to scale efficiently.',
      price: 'Free Community Session',
      registrationUrl: '',
      status: 'UPCOMING',
      eventImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'ev-ads-clinic',
      slug: 'weekly-ads-clinic-session',
      titleId: 'Live Ads Clinic: Bedah Campaign & Tanya Jawab',
      titleEn: 'Live Ads Clinic: Campaign Teardown & Interactive Q&A',
      category: 'ADS_CLINIC',
      date: '2026-10-25',
      time: '20:00 - 21:30 WIB',
      location: 'Online Community Room',
      isOnline: true,
      speaker: 'Ryan Firmansyah',
      speakerRoleId: 'Creative Strategist',
      speakerRoleEn: 'Creative Strategist',
      descriptionId: 'Sesi santai interaktif mengulas iklan-iklan yang sedang berjalan, menganalisis hook video, dan mendiskusikan solusi kendala iklan.',
      descriptionEn: 'An interactive session reviewing live member campaigns, evaluating video hooks, and solving campaign bottlenecks collaboratively.',
      agendaId: '["Ulasan studi kasus iklan minggu ini","Bedah copywriting & landing page peserta","Sesi tanya jawab terbuka"]',
      agendaEn: '["Review of this week member case studies","Live copywriting & landing page diagnostics","Open community Q&A"]',
      whatYouWillLearnId: '["Cara mengidentifikasi titik kebocoran funnel iklan","Checklist optimasi landing page untuk konversi maksimal"]',
      whatYouWillLearnEn: '["Identifying funnel drop-off points in your analytics","Landing page optimization checklist for conversions"]',
      whoShouldAttendId: 'Siapa saja yang sedang menjalankan iklan dan ingin mendapatkan second opinion dari praktisi.',
      whoShouldAttendEn: 'Anyone managing active campaigns seeking objective, practical feedback from seasoned practitioners.',
      price: 'Khusus Member Komunitas',
      registrationUrl: '',
      status: 'UPCOMING',
      eventImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    },
  ];

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    });
  }
  console.log('✓ Events seeded (bilingual)');

  // 6. Articles (Bilingual)
  const articles = [
    {
      id: 'art-panduan-pemula',
      slug: 'panduan-lengkap-meta-ads-untuk-pemula',
      titleId: 'Panduan Lengkap Meta Ads untuk Pemula: Dari Nol sampai Launch Campaign',
      titleEn: 'Complete Meta Ads Beginner Guide: From Scratch to Launching Campaigns',
      excerptId: 'Pelajari dasar-dasar Meta Ads secara terstruktur: memahami Ads Manager, menyusun struktur campaign yang benar, dan meluncurkan iklan pertama dengan percaya diri.',
      excerptEn: 'Learn Meta Ads fundamentals systematically: Ads Manager navigation, sound campaign structure, and launching your first campaign with confidence.',
      contentId: `## Mengapa Meta Ads Masih Menjadi Kanal Iklan Utama?

Di tengah berbagai kanal pemasaran digital, Meta Ads (Facebook dan Instagram) tetap menjadi platform dengan penetrasi tertinggi dan machine learning yang sangat matang untuk menemukan audiens pembeli.

Bagi pemula, beriklan di Meta sering kali terasa membingungkan karena begitu banyak opsi tombol dan metrik. Namun, jika Anda memahami logikanya, proses beriklan sebenarnya sederhana dan sistematis.

## 3 Pilar Fundamental Sebelum Membuka Ads Manager

Sebelum Anda mengeluarkan biaya iklan sepeser pun, pastikan 3 hal ini sudah siap:

1. **Pemahaman Customer Avatar**: Siapa orang yang benar-benar membutuhkan produk Anda? Apa masalah terbesar mereka?
2. **Penawaran yang Kuat (Offer)**: Apakah harga, paket, dan garansi Anda menarik dibanding kompetitor?
3. **Landing Page / Channel Konversi**: Ke mana audiens akan diarahkan setelah mengklik iklan?

## Struktur Campaign Meta Ads yang Direkomendasikan

Dalam Meta Ads Manager, struktur iklan terdiri dari 3 level:

- **Campaign Level**: Tempat Anda menentukan objektif iklan (Sales/Penjualan, Leads/Prospek, Traffic, atau Awareness).
- **Ad Set Level**: Tempat Anda menentukan target audiens, anggaran (budget), jadwal, dan penempatan iklan (placement).
- **Ad Level**: Tempat materi kreatif Anda berada: video, gambar, judul (headline), teks iklan (copy), dan link tujuan.

## Checklist Evaluasi Setelah 48 Jam

Jangan terburu-buru mematikan iklan dalam 24 jam pertama. Biarkan machine learning mempelajari data impresi. Setelah 48 jam, evaluasi metrik berikut:

- **CTR (Link Click-Through Rate)**: Indikator apakah materi iklan Anda menarik perhatian. Target: > 1%.
- **CPC (Cost Per Link Click)**: Biaya per klik tautan.
- **Conversion Rate**: Persentase pengunjung yang melakukan tindakan pembelian atau pengisian form.

Dengan pemahaman dasar ini, Anda siap meluncurkan campaign pertama secara terukur.`,
      contentEn: `## Why Meta Ads Remains a Premier Acquisition Channel

Among digital marketing channels, Meta Ads (Facebook and Instagram) continues to deliver unmatched reach and mature algorithmic machine learning to discover high-intent buyers.

For beginners, advertising on Meta can seem daunting with dozens of buttons and analytics columns. However, when you understand the underlying mechanics, the workflow becomes straightforward and systematic.

## 3 Core Pillars Before Opening Ads Manager

Before allocating your first advertising dollar, ensure three fundamentals are established:

1. **Customer Avatar Clarity**: Who specifically needs your product? What painful friction points are you resolving?
2. **Irresistible Value Proposition**: Are your pricing, guarantee, and offer structure genuinely compelling against alternatives?
3. **Optimized Conversion Pathway**: Where do prospects land post-click? Is the checkout or lead intake frictionless?

## Recommended Meta Campaign Architecture

Meta Ads Manager operates across three hierarchical levels:

- **Campaign Level**: Where you declare your primary objective (Sales, Leads, Traffic, or Awareness).
- **Ad Set Level**: Where you configure audience targeting, budget allocation, delivery schedule, and placements.
- **Ad Level**: Where the creative assets live: video hooks, static images, primary copy, headlines, and call-to-actions.

## The 48-Hour Diagnostic Checklist

Avoid prematurely toggling off campaigns during the first 24 hours. Allow the machine learning algorithm to gather impression data. After 48 hours, diagnose these key signals:

- **CTR (Link Click-Through Rate)**: Evaluates creative resonance. Benchmark: > 1.0%.
- **CPC (Cost Per Link Click)**: Cost incurred per visit.
- **Conversion Rate**: Proportion of visitors executing your target conversion action.

Armed with these fundamentals, you are positioned to launch your first structured campaigns with confidence.`,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      category: 'Fundamental',
      tags: 'Meta Ads, Pemula, Campaign Structure, Tutorial',
      author: 'Ryan Firmansyah',
      readingTime: '6 min read',
      isPublished: true,
      publishedAt: new Date('2026-09-15'),
      metaTitleId: 'Panduan Lengkap Meta Ads untuk Pemula | Belajar Ads',
      metaTitleEn: 'Complete Meta Ads Beginner Guide | Belajar Ads',
      metaDescId: 'Panduan langkah demi langkah beriklan di Meta Ads dari nol sampai live campaign.',
      metaDescEn: 'A step-by-step beginner guide to launching profitable Meta Ads campaigns from scratch.',
    },
    {
      id: 'art-riset-customer-avatar',
      slug: 'framework-riset-customer-avatar-sebelum-beriklan',
      titleId: 'Framework Riset Customer Avatar Sebelum Menjalankan Iklan',
      titleEn: 'Customer Avatar Research Framework Before Launching Ads',
      excerptId: 'Materi iklan yang sukses tidak berawal dari tombol setting di Ads Manager, melainkan dari kedalaman riset memahami masalah dan motivasi beli pelanggan.',
      excerptEn: 'High-performing ad creatives do not originate from technical toggles in Ads Manager—they stem from deep empathy for customer friction points and purchase drivers.',
      contentId: `## Kenapa Iklan Sering Boncos?

Penyebab nomor satu iklan tidak menghasilkan penjualan bukan karena salah memilih tombol di dashboard, melainkan karena **pesan iklan tidak menyentuh masalah nyata pembeli**.

Ketika materi iklan berbicara kepada semua orang, pada kenyataannya iklan tersebut tidak berbicara kepada siapa pun.

## 4 Dimensi Customer Avatar

Dalam framework Belajar Ads, kami membedah customer avatar ke dalam 4 dimensi:

1. **Pain Points (Ketakutan & Beban)**: Apa yang membuat mereka cemas atau frustrasi saat ini?
2. **Desired Transformation (Tujuan yang Diinginkan)**: Seperti apa kondisi ideal yang ingin mereka capai?
3. **Current Alternatives (Solusi yang Pernah Dicoba)**: Cara apa yang sudah pernah mereka coba dan mengapa hasilnya belum memuaskan?
4. **Objections (Alasan Ragu Membeli)**: Apa alasan utama mereka menunda keputusan? Harga? Keraguan kualitas?

## Tempat Praktis Melakukan Riset Avatar

Anda tidak perlu menyewa agensi riset mahal. Gunakan sumber data nyata yang tersedia:

- Ulasan bintang 1 sampai 3 produk kompetitor di marketplace (baca keluhan pelanggan).
- Komentar dan pertanyaan di postingan edukasi Instagram / TikTok kompetitor.
- Sesi interview langsung dengan 3 pelanggan yang sudah pernah membeli dari Anda.

Jadikan kata-kata asli pelanggan tersebut sebagai bahan baku hook dan headline iklan Anda.`,
      contentEn: `## The Root Cause of Campaign Inefficiency

The single greatest driver of unprofitable ad spend is not choosing the wrong technical setting in your dashboard—it is delivering a generic message that fails to address customer pain points.

When creative copy speaks to everybody, in reality it resonates with nobody.

## The 4 Dimensions of Customer Avatar Profiling

In the Belajar Ads framework, we deconstruct buyer profiles across four core dimensions:

1. **Pain Points & Frustrations**: What acute problems are keeping your audience up at night?
2. **Desired Transformation**: What does their ideal post-solution state look like?
3. **Current Inadequate Alternatives**: What solutions have they attempted previously, and why did they fall short?
4. **Purchase Objections**: What specific hesitations prevent immediate action? Price friction? Trust deficits?

## Practical Research Channels

You do not need expensive research firms to extract high-intent qualitative insights. Tap into organic voice-of-customer channels:

- 1-to-3 star competitor reviews on marketplaces (uncovering unmet user expectations).
- Comments and recurring questions under competitor educational videos on social platforms.
- 15-minute diagnostic conversations with three recent paying customers.

Incorporate the exact vocabulary and phrasing of your customers into your ad hooks and headlines.`,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: 'Creative Strategy',
      tags: 'Riset, Customer Avatar, Copywriting, Creative Strategy',
      author: 'Rian Pratama',
      readingTime: '5 min read',
      isPublished: true,
      publishedAt: new Date('2026-09-20'),
      metaTitleId: 'Framework Riset Customer Avatar Sebelum Beriklan | Belajar Ads',
      metaTitleEn: 'Customer Avatar Research Framework Before Launching Ads | Belajar Ads',
      metaDescId: 'Cara meriset masalah pelanggan untuk membuat materi iklan yang menghasilkan konversi.',
      metaDescEn: 'A proven qualitative framework to research customer psychology for higher converting ads.',
    },
    {
      id: 'art-en-structuring',
      slug: 'how-to-structure-meta-ads-campaigns-for-consistent-roas',
      titleId: 'Cara Menyusun Struktur Campaign Meta Ads untuk ROAS yang Konsisten',
      titleEn: 'How to Structure Meta Ads Campaigns for Consistent ROAS',
      excerptId: 'Struktur akun yang sederhana dan disiplin mempermudah algoritma machine learning Meta bekerja optimal dan menghasilkan biaya akuisisi yang stabil.',
      excerptEn: 'A streamlined, disciplined account architecture enables Meta machine learning algorithms to exit learning phase rapidly and deliver stable acquisition costs.',
      contentId: `## Bahaya Menumpuk Terlalu Banyak Ad Set

Banyak pengiklan membagi anggaran kecil ke dalam 10 atau 20 ad set berbeda. Praktik ini memecah data konversi dan membuat campaign terjebak dalam status *Learning Limited*.

Pendekatan modern di Meta Ads menekankan konsolidasi akun (*Account Simplification*).

## Struktur 2 Campaign yang Terbukti Efektif

Untuk skala budget UKM hingga menengah, Anda cukup menggunakan 2 campaign utama:

1. **Campaign 1: Testing Creative (ABO / Ad Set Budget Optimization)**:
   - Digunakan khusus untuk menguji sudut kreatif, video hook baru, dan variasi headline.
   - Budget dialokasikan merata per ad set agar setiap materi mendapat kesempatan impresi yang adil.

2. **Campaign 2: Scaling Winners (CBO / Advantage Campaign Budget)**:
   - Tempat memasukkan materi kreatif yang sudah terbukti menghasilkan penjualan dengan ROAS memuaskan dari campaign testing.
   - Di sini Anda dapat menaikkan budget harian secara bertahap (15-20% per 3 hari).

Dengan arsitektur ini, budget Anda terlindungi dari pemborosan pada materi kreatif yang belum teruji.`,
      contentEn: `## The Pitfall of Excessive Ad Set Fragmentation

A frequent error among media buyers is fragmenting modest budgets across dozens of ad sets. This dilutes conversion data and traps ad sets in perpetual *Learning Limited* states.

Modern Meta best practices prioritize **Account Simplification** to maximize algorithmic signal density.

## The Proven Two-Tier Campaign Architecture

For standard growth stages, a clean two-campaign model delivers consistency and clarity:

1. **Tier 1: Creative Testing (ABO / Ad Set Budget Optimization)**:
   - Dedicated exclusively to isolating new hooks, messaging angles, and visual creatives.
   - Fixed budget per ad set guarantees balanced distribution of impressions across test variables.

2. **Tier 2: Scaling Winners (CBO / Advantage Campaign Budget)**:
   - Houses only validated winning creatives graduated from the testing sandbox.
   - Ideal environment for systematic vertical budget increases (15-20% increments every 72 hours).

This dual-tier framework preserves capital while systematically discovering high-intent customer segments.`,
      featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      category: 'Scaling',
      tags: 'Campaign Structure, CBO, Scaling, ROAS, Optimization',
      author: 'Ryan Firmansyah',
      readingTime: '7 min read',
      isPublished: true,
      publishedAt: new Date('2026-09-24'),
      metaTitleId: 'Cara Menyusun Struktur Campaign Meta Ads untuk ROAS Konsisten | Belajar Ads',
      metaTitleEn: 'How to Structure Meta Ads Campaigns for Consistent ROAS | Belajar Ads',
      metaDescId: 'Panduan struktur campaign testing dan scaling untuk menjaga kestabilan performa iklan.',
      metaDescEn: 'Proven account architecture strategies to maintain consistent ROAS on Meta Ads.',
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }
  console.log('✓ Articles seeded (bilingual)');

  // 7. Static Resources (Bilingual)
  const resources = [
    {
      id: 'res-tutorial-capi',
      slug: 'setup-meta-conversions-api-capi-gtm',
      titleId: 'Panduan Setup Meta Conversions API (CAPI) dengan Google Tag Manager',
      titleEn: 'Step-by-Step Meta Conversions API (CAPI) Setup via Google Tag Manager',
      type: 'TUTORIAL',
      category: 'Tracking & Analytics',
      excerptId: 'Langkah demi langkah menghubungkan event server-side untuk memastikan akurasi data tracking Meta di era iOS privacy.',
      excerptEn: 'A comprehensive technical walkthrough to implement server-side tracking and safeguard attribution accuracy.',
      contentId: 'Langkah teknis setup server container di GTM dan menghubungkan token CAPI Meta Ads.',
      contentEn: 'Step-by-step technical implementation of GTM server container and Meta Conversions API gateway.',
      downloadUrl: '',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
    },
    {
      id: 'res-case-study-fmcg',
      slug: 'studi-kasus-scaling-brand-skincare-3x-roas',
      titleId: 'Studi Kasus: Scaling Brand Skincare Lokal Mencapai 3.4x ROAS',
      titleEn: 'Case Study: Scaling a Local D2C Brand to 3.4x ROAS with Creative Funnels',
      type: 'CASE_STUDY',
      category: 'Case Studies',
      excerptId: 'Bedah strategi kreatif UGC dan perombakan struktur campaign yang menghasilkan peningkatan omset bulanan tanpa membengkakkan CAC.',
      excerptEn: 'How restructuring creative testing angles and landing page copy scaled monthly acquisition without increasing CAC.',
      contentId: 'Analisis mendalam data sebelum dan sesudah optimasi kreatif video.',
      contentEn: 'In-depth analysis of creative teardowns, retention rates, and scaling economics.',
      downloadUrl: '',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
    },
    {
      id: 'res-ads-breakdown-hooks',
      slug: 'bedah-10-hook-video-iklan-viral',
      titleId: 'Bedah 10 Hook Video Iklan dengan Retensi 3 Detik Tertinggi',
      titleEn: '10 Video Ad Hooks Teardown with Top 3-Second Retention Rates',
      type: 'ADS_BREAKDOWN',
      category: 'Creative Teardown',
      excerptId: 'Analisis frame-by-frame 10 video iklan dengan thumbstop rate di atas 35% dan alasan psikologis di baliknya.',
      excerptEn: 'Frame-by-frame breakdowns of top 10 video ads achieving >35% thumbstop rates with psychological drivers explained.',
      contentId: 'Koleksi hook visual dan audio yang terbukti menghentikan scroll.',
      contentEn: 'Curated collection of visual pattern interrupts and high-converting direct response hooks.',
      downloadUrl: '',
      featuredImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
    },
    {
      id: 'res-free-checklist',
      slug: 'checklist-audit-akun-meta-ads',
      titleId: 'Checklist Audit Akun Meta Ads (Format Spreadsheet & PDF)',
      titleEn: 'Meta Ads Account Audit Checklist (Spreadsheet & PDF Format)',
      type: 'FREE_RESOURCE',
      category: 'Tools & Checklists',
      excerptId: 'Dokumen kerja 25 poin pemeriksaan akun iklan untuk mendeteksi pemborosan budget dan peluang optimasi.',
      excerptEn: 'A 25-point actionable inspection template to audit ad accounts, stop budget waste, and uncover quick wins.',
      contentId: 'Template audit siap pakai untuk advertiser mandiri dan agensi.',
      contentEn: 'Ready-to-use audit framework for media buyers and performance marketing teams.',
      downloadUrl: 'https://belajarads.com/resources',
      featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      isPublished: true,
    },
  ];

  for (const r of resources) {
    await prisma.resource.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }
  console.log('✓ Resources seeded (bilingual)');

  // 8. Static Page CMS Content (PageContent)
  const defaultPageContents = [
    // HOMEPAGE SECTIONS
    {
      pageKey: 'home',
      sectionKey: 'hero',
      contentId: JSON.stringify({
        eyebrow: 'Platform Belajar Advertising Praktis',
        heading: 'Learn Ads.\nLaunch Campaigns.\nGrow.',
        subheading: 'Kuasai kemampuan beriklan secara terstruktur dari fundamental, riset market, hingga menjalankan dan mengoptimalkan campaign secara nyata.',
        primaryCtaText: 'Lihat Semua Program',
        primaryCtaUrl: '/programs',
        secondaryCtaText: 'Gabung Komunitas',
        secondaryCtaUrl: '/community',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Practical Advertising Education Platform',
        heading: 'Learn Ads.\nLaunch Campaigns.\nGrow.',
        subheading: 'Master performance advertising from core market research fundamentals to launching, analyzing, and scaling live campaigns.',
        primaryCtaText: 'Explore Programs',
        primaryCtaUrl: '/programs',
        secondaryCtaText: 'Join Community',
        secondaryCtaUrl: '/community',
      }),
    },
    {
      pageKey: 'home',
      sectionKey: 'pillars',
      contentId: JSON.stringify({
        eyebrow: 'Filosofi Belajar Kami',
        heading: 'Advertising is Learned by Doing.',
        subheading: 'Kemampuan beriklan tidak dikuasai lewat teori abstrak, melainkan lewat siklus tiga langkah yang terbukti.',
        pillar1Title: 'Learn (Pelajari)',
        pillar1Desc: 'Pahami logika algoritma, riset avatar pelanggan, positioning produk, dan penawaran yang menarik.',
        pillar2Title: 'Launch (Luncurkan)',
        pillar2Desc: 'Ubah strategi menjadi campaign nyata dengan struktur CBO/ABO yang disiplin dan materi kreatif berkualitas.',
        pillar3Title: 'Optimize (Optimalkan)',
        pillar3Desc: 'Baca metrik analitik, evaluasi titik kebocoran funnel, dan scaling campaign secara bertahap dan terukur.',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Our Core Philosophy',
        heading: 'Advertising is Learned by Doing.',
        subheading: 'Media buying expertise is not forged through lectures alone, but through an iterative three-pillar execution cycle.',
        pillar1Title: 'Learn',
        pillar1Desc: 'Master algorithmic mechanics, customer avatar psychology, positioning, and compelling offer design.',
        pillar2Title: 'Launch',
        pillar2Desc: 'Translate strategy into live campaigns with disciplined CBO/ABO architecture and persuasive creatives.',
        pillar3Title: 'Optimize',
        pillar3Desc: 'Diagnose performance data, resolve funnel friction points, and scale campaigns methodically.',
      }),
    },
    {
      pageKey: 'home',
      sectionKey: 'meta_ads',
      contentId: JSON.stringify({
        eyebrow: 'Fokus Utama Saat Ini',
        heading: 'Mulai dari Meta Ads.',
        subheading: 'Bangun pondasi yang kokoh di platform periklanan digital terbesar sebelum berekspansi ke kanal advertising lainnya.',
        ctaText: 'Pelajari Program Meta Ads',
        ctaUrl: '/programs',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Initial Core Focus',
        heading: 'Start with Meta Ads.',
        subheading: 'Build rock-solid fundamentals on the most mature advertising machine learning ecosystem before expanding.',
        ctaText: 'Explore Meta Ads Programs',
        ctaUrl: '/programs',
      }),
    },
    {
      pageKey: 'home',
      sectionKey: 'community',
      contentId: JSON.stringify({
        eyebrow: 'Dukungan Ekosistem',
        heading: 'Belajar Iklan Tidak Harus Sendirian.',
        subheading: 'Bergabunglah bersama komunitas praktisi, business owner, dan media buyer yang saling bertukar data, berdiskusi santai, dan membedah kendala iklan harian.',
        ctaText: 'Gabung Komunitas Sekarang',
        ctaUrl: '/community',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Supportive Ecosystem',
        heading: "You Don't Have to Learn Ads Alone.",
        subheading: 'Join an active network of media buyers, founders, and practitioners sharing real campaign data and troubleshooting challenges together.',
        ctaText: 'Join the Community',
        ctaUrl: '/community',
      }),
    },
    {
      pageKey: 'home',
      sectionKey: 'business',
      contentId: JSON.stringify({
        eyebrow: 'Solusi Korporasi & Bisnis',
        heading: 'Tingkatkan Kemampuan Tim In-House Anda.',
        subheading: 'Kami membantu perusahaan membangun tim advertising internal yang mandiri, disiplin membaca data, dan efisien mengelola anggaran iklan.',
        ctaText: 'Pelajari Solusi Bisnis',
        ctaUrl: '/for-business',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Corporate & Business Solutions',
        heading: 'Build a Stronger In-House Ads Team.',
        subheading: 'We partner with growing brands to train in-house teams to achieve self-sufficiency, metric discipline, and sustainable ROAS.',
        ctaText: 'Explore Solutions for Business',
        ctaUrl: '/for-business',
      }),
    },
    {
      pageKey: 'home',
      sectionKey: 'final_cta',
      contentId: JSON.stringify({
        heading: 'Siap Memulai Perjalanan Advertising Anda?',
        subheading: 'Pilih program yang sesuai dengan tahap bisnis Anda dan mulailah meluncurkan campaign yang menghasilkan hasil nyata.',
        primaryCtaText: 'Pilih Program Belajar',
        primaryCtaUrl: '/programs',
        secondaryCtaText: 'Konsultasi Tim Kami',
        secondaryCtaUrl: '/contact',
      }),
      contentEn: JSON.stringify({
        heading: 'Ready to Master Modern Advertising?',
        subheading: 'Select the learning pathway aligned with your growth goals and start executing structured, profitable campaigns today.',
        primaryCtaText: 'Explore All Programs',
        primaryCtaUrl: '/programs',
        secondaryCtaText: 'Talk to Our Team',
        secondaryCtaUrl: '/contact',
      }),
    },

    // ABOUT PAGE
    {
      pageKey: 'about',
      sectionKey: 'story',
      contentId: JSON.stringify({
        eyebrow: 'Cerita & Tujuan Kami',
        heading: 'Kami Percaya Advertising Dikuasai Lewat Praktek Nyata.',
        subheading: 'Belajar Ads didirikan dari satu keyakinan sederhana: kemampuan beriklan tidak dapat dikuasai hanya dengan membaca slide teori, melainkan dengan meriset, meluncurkan campaign, membaca data, dan mengevaluasi kesalahan secara berulang.',
        missionHeading: 'Misi Kami',
        missionText: 'Membantu individu dan bisnis membangun kemampuan advertising yang praktis, relevan, dan dapat diterapkan secara langsung di dunia nyata untuk menciptakan dampak pertumbuhan bisnis yang terukur.',
        visionHeading: 'Visi Kami',
        visionText: 'Membangun ekosistem belajar advertising terdepan yang menghubungkan edukasi berkualitas, praktek langsung, kebutuhan dunia bisnis, dan komunitas praktisi yang saling menguatkan.',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Our Story & Purpose',
        heading: 'We Believe Advertising is Learned by Doing.',
        subheading: 'Belajar Ads was built on a singular conviction: media buying mastery cannot be gained through theoretical slide decks alone—it is forged through real market research, launching campaigns, diagnosing data, and continuous iteration.',
        missionHeading: 'Our Mission',
        missionText: 'Empower individuals and businesses to build practical, structured, and battle-tested advertising capabilities that drive verifiable commercial growth.',
        visionHeading: 'Our Vision',
        visionText: 'Build the premier advertising education ecosystem uniting actionable training, direct field execution, real industry demands, and a collaborative practitioner community.',
      }),
    },

    // COMMUNITY PAGE
    {
      pageKey: 'community',
      sectionKey: 'hero',
      contentId: JSON.stringify({
        eyebrow: 'Komunitas Belajar Ads',
        heading: 'Belajar Iklan Tidak Harus Sendirian.',
        subheading: 'Bergabunglah bersama komunitas praktisi, business owner, dan media buyer yang saling mendukung, berbagi data, dan tumbuh bersama dalam ekosistem periklanan digital yang suportif.',
        ctaText: 'Gabung Grup Komunitas',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Belajar Ads Community',
        heading: "You Don't Have to Learn Ads Alone.",
        subheading: 'Join a thriving network of practitioners, media buyers, and entrepreneurs sharing real campaign insights, troubleshooting bottlenecks, and growing together.',
        ctaText: 'Join the Community Group',
      }),
    },

    // FOR BUSINESS PAGE
    {
      pageKey: 'for_business',
      sectionKey: 'hero',
      contentId: JSON.stringify({
        eyebrow: 'Solusi Korporasi & In-House Team',
        heading: 'Tingkatkan Kemampuan Tim Iklan Internal Perusahaan Anda.',
        subheading: 'Program training dan pendampingan terstruktur untuk perusahaan yang ingin membangun kapabilitas media buying internal yang mandiri, terukur, dan akuntabel.',
        ctaText: 'Jadwalkan Konsultasi Bisnis',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Corporate & In-House Team Solutions',
        heading: 'Elevate Your In-House Advertising Team Capabilities.',
        subheading: 'Structured training and hands-on advisory designed for companies seeking operational media buying independence, metric discipline, and sustainable ROAS.',
        ctaText: 'Schedule a Business Consultation',
      }),
    },

    // CONTACT PAGE
    {
      pageKey: 'contact',
      sectionKey: 'hero',
      contentId: JSON.stringify({
        eyebrow: 'Hubungi Kami',
        heading: 'Mari Berdiskusi Kebutuhan Belajar Anda.',
        subheading: 'Punya pertanyaan seputar program, training in-house, atau kolaborasi? Tim kami siap membantu memberikan solusi terbaik.',
      }),
      contentEn: JSON.stringify({
        eyebrow: 'Get in Touch',
        heading: "Let's Discuss Your Advertising Goals.",
        subheading: 'Have questions regarding our programs, corporate workshops, or partnerships? Our advisory team is here to assist.',
      }),
    },
  ];

  for (const pc of defaultPageContents) {
    await prisma.pageContent.upsert({
      where: {
        pageKey_sectionKey: {
          pageKey: pc.pageKey,
          sectionKey: pc.sectionKey,
        },
      },
      update: pc,
      create: pc,
    });
  }
  console.log('✓ PageContent records seeded (bilingual)');

  console.log('--- V2 DATABASE MIGRATION & SEED COMPLETED SUCCESSFULLY ---');
}

main()
  .catch((e) => {
    console.error('Migration error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
