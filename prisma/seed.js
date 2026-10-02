const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Belajar Ads database...');

  // 1. Admin User
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('AdminPassword123!', salt);

  await prisma.adminUser.upsert({
    where: { email: 'admin@belajarads.com' },
    update: {},
    create: {
      name: 'Belajar Ads Administrator',
      email: 'admin@belajarads.com',
      password: hashedPassword,
      role: 'SUPERADMIN',
    },
  });
  console.log('Admin user seeded: admin@belajarads.com / AdminPassword123!');

  // 2. Mentors
  const mentors = [
    {
      id: 'mentor-1',
      name: 'Rian Pratama',
      role: 'Senior Performance Marketer & Meta Ads Lead',
      bio: 'Praktisi media buyer dengan pengalaman lebih dari 7 tahun mengelola budget iklan lebih dari miliaran rupiah di berbagai industri direct-to-consumer dan lead generation.',
      expertise: 'Meta Ads, Campaign Structuring, Scaling, Creative Strategy',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      order: 1,
    },
    {
      id: 'mentor-2',
      name: 'Dimas Setiawan',
      role: 'Creative Strategist & Direct Response Specialist',
      bio: 'Fokus pada riset customer psychology, direct-response copywriting, dan framework video UGC yang dirancang untuk menghasilkan konversi tinggi.',
      expertise: 'Creative Testing, Copywriting, Video Ads, Funnel Architecture',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      order: 2,
    },
    {
      id: 'mentor-3',
      name: 'Alisa Maharani',
      role: 'Data & Tracking Specialist',
      bio: 'Membantu ratusan brand memastikan tracking attribution yang akurat melalui Meta Conversions API (CAPI), Google Tag Manager, dan data diagnostics.',
      expertise: 'Pixel, CAPI, Data Diagnostics, Attribution Modeling',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
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

  // 3. Programs
  const programs = [
    {
      id: 'prog-meta-masterclass',
      slug: 'meta-ads-mastery',
      name: 'Meta Ads Mastery Bootcamp',
      category: 'TRAINING',
      topic: 'Meta Ads',
      description: 'Program training intensif interaktif untuk menguasai riset, pembuatan campaign, optimasi, dan scaling Meta Ads secara sistematis.',
      overview: 'Kurikulum dirancang dari fundamental hingga advanced tactics yang diterapkan oleh praktisi.',
      level: 'All Levels',
      format: 'Online Live Classes',
      isOnline: true,
      duration: '4 Weeks (8 Sessions)',
      price: 'Mulai Belajar',
      instructor: 'Rian Pratama & Dimas Setiawan',
      startDate: 'Batch Terbaru Segera Dibuka',
      registrationStatus: 'AVAILABLE',
      isFeatured: true,
      locale: 'id',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-ecourse-fundamental',
      slug: 'e-course-meta-ads-fundamental',
      name: 'Meta Ads Fundamental E-Course',
      category: 'ECOURSE',
      topic: 'Meta Ads',
      description: 'Belajar mandiri dengan materi terstruktur dari nol hingga siap meluncurkan campaign pertama Anda.',
      overview: 'Akses materi video rekaman berkualitas tinggi dan lembar kerja praktis kapan saja.',
      level: 'Beginner',
      format: 'Self-paced',
      isOnline: true,
      duration: 'Self-paced Video Lessons',
      price: 'Coming Soon',
      instructor: 'Tim Belajar Ads',
      registrationStatus: 'COMING_SOON',
      isFeatured: true,
      locale: 'id',
      featuredImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-creative-workshop',
      slug: 'workshop-high-converting-creative',
      name: 'High-Converting Ads Creative Workshop',
      category: 'WORKSHOP',
      topic: 'Creative & Copy',
      description: 'Workshop intensif 2 hari membedah formula pembuatan visual, hook, dan copywriting iklan yang memicu aksi beli.',
      overview: 'Hands-on live assignment dengan feedback langsung dari mentor.',
      level: 'Intermediate',
      format: 'Online Workshop',
      isOnline: true,
      duration: '2 Days Intensive',
      price: 'Registrasi Dibuka',
      instructor: 'Dimas Setiawan',
      startDate: 'Weekend Edition',
      registrationStatus: 'AVAILABLE',
      isFeatured: true,
      locale: 'id',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-private-mentoring',
      slug: 'private-mentoring-1on1',
      name: '1-on-1 Performance Mentoring',
      category: 'PRIVATE_MENTORING',
      topic: 'Campaign Audit & Strategy',
      description: 'Pendampingan privat eksklusif untuk membedah campaign akun iklan Anda dan menyusun roadmap scaling terarah.',
      overview: 'Sesi privat 1-on-1 yang disesuaikan penuh dengan model bisnis dan problem iklan Anda.',
      level: 'Advanced',
      format: 'Private 1-on-1 Video Call',
      isOnline: true,
      duration: 'Custom Schedule',
      price: 'Konsultasi Privat',
      instructor: 'Senior Lead Mentor',
      registrationStatus: 'AVAILABLE',
      isFeatured: false,
      locale: 'id',
      featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'prog-company-training',
      slug: 'corporate-team-training',
      name: 'Corporate & In-House Team Training',
      category: 'COMPANY_TRAINING',
      topic: 'Enterprise Ads Capability',
      description: 'Program training in-house khusus untuk tim marketing perusahaan agar mandiri dalam eksekusi dan scaling kampanye digital.',
      overview: 'Kurikulum disesuaikan dengan target bisnis, KPI, dan industri perusahaan.',
      level: 'Customized',
      format: 'In-House / Hybrid',
      isOnline: false,
      duration: 'Tailored Program',
      price: 'Hubungi Kami',
      instructor: 'Belajar Ads Corporate Team',
      registrationStatus: 'AVAILABLE',
      isFeatured: false,
      locale: 'id',
      featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    },
  ];

  for (const p of programs) {
    await prisma.program.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }

  // 4. Events
  const events = [
    {
      id: 'ev-meta-scaling',
      slug: 'meta-ads-scaling-intensive',
      title: 'Meta Ads Scaling & Creative Testing Workshop',
      category: 'WORKSHOP',
      date: '2026-10-18',
      time: '19:30 - 21:30 WIB',
      location: 'Live Zoom Meeting',
      isOnline: true,
      speaker: 'Rian Pratama',
      speakerRole: 'Head of Performance Marketing',
      description: 'Pelajari metode testing kreatif dan struktur campaign yang tepat untuk meningkatkan budget tanpa merusak performa iklan.',
      agenda: JSON.stringify([
        'Penyebab umum iklan fatigue dan cara mengatasinya',
        'Struktur CBO vs ABO untuk fase scaling',
        'Framework evaluasi metrik 7 hari pertama',
        'Live Q&A dan bedah akun peserta terpilih'
      ]),
      whatYouWillLearn: JSON.stringify([
        'Framework testing 10+ variasi sudut kreatif secara efisien',
        'Cara membaca data breakdown audience and placement',
        'Strategi scaling horizontal vs vertical di Meta Ads'
      ]),
      whoShouldAttend: 'Advertiser, business owner, dan media buyer yang sudah pernah beriklan dan ingin meningkatkan performa.',
      price: 'Free Community Session',
      status: 'UPCOMING',
      eventImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      locale: 'id',
    },
    {
      id: 'ev-ads-clinic',
      slug: 'weekly-ads-clinic-session',
      title: 'Live Ads Clinic: Bedah Campaign & Tanya Jawab',
      category: 'ADS_CLINIC',
      date: '2026-10-25',
      time: '20:00 - 21:30 WIB',
      location: 'Online Community Room',
      isOnline: true,
      speaker: 'Dimas Setiawan',
      speakerRole: 'Creative Strategist',
      description: 'Sesi santai interaktif mengulas iklan-iklan yang sedang berjalan, menganalisis hook video, dan mendiskusikan solusi kendala iklan.',
      agenda: JSON.stringify([
        'Ulasan studi kasus iklan minggu ini',
        'Bedah copywriting & landing page peserta',
        'Sesi tanya jawab terbuka'
      ]),
      whatYouWillLearn: JSON.stringify([
        'Cara mengidentifikasi titik kebocoran funnel iklan',
        'Checklist optimasi landing page untuk konversi maksimal'
      ]),
      whoShouldAttend: 'Siapa saja yang sedang menjalankan iklan dan ingin mendapatkan second opinion dari praktisi.',
      price: 'Khusus Member Komunitas',
      status: 'UPCOMING',
      eventImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      locale: 'id',
    },
  ];

  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    });
  }

  // 5. Articles
  const articles = [
    {
      id: 'art-panduan-pemula',
      slug: 'panduan-lengkap-meta-ads-untuk-pemula',
      title: 'Panduan Lengkap Meta Ads untuk Pemula: Dari Nol sampai Launch Campaign',
      excerpt: 'Langkah demi langkah memahami ekosistem periklanan Meta, Business Manager, pixel tracking, hingga cara setup campaign pertama yang benar.',
      content: `## Memahami Ekosistem Meta Ads
Meta Ads adalah salah satu platform periklanan digital paling efektif di dunia karena memiliki data minat dan perilaku pengguna yang sangat mendalam di Facebook dan Instagram.

Bagi pemula, kunci keberhasilan beriklan bukan sekadar menekan tombol "Boost Post", melainkan memahami struktur periklanan profesional melalui **Meta Ads Manager**.

### Tiga Level Struktur Campaign
1. **Campaign Level:** Di level ini Anda menentukan objektif bisnis, misalnya *Leads*, *Sales*, atau *Traffic*.
2. **Ad Set Level:** Di level ini Anda mengatur audiens sasaran, penempatan iklan (Instagram Feeds, Stories, Reels), jadwal, dan budget.
3. **Ad Level:** Di level ini Anda memasukkan materi kreatif—seperti gambar, video carousel, judul (headline), teks iklan, dan link tujuan.

### Prinsip Utama: Advertising is Learned by Doing
Jangan takut untuk memulai dengan budget testing yang terukur. Buat hipotesis, jalankan materi iklan, perhatikan metrik penting seperti CTR (Click-Through Rate) dan CPC (Cost Per Click), lalu lakukan optimasi secara berkala.`,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      category: 'Meta Ads Fundamental',
      tags: 'Meta Ads, Pemula, Campaign Setup',
      author: 'Rian Pratama',
      readingTime: '6 min read',
      locale: 'id',
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: 'Panduan Lengkap Meta Ads untuk Pemula | Belajar Ads',
      metaDesc: 'Pelajari dasar-dasar Meta Ads secara terstruktur dari setting Business Manager hingga meluncurkan campaign pertama yang profitable.',
    },
    {
      id: 'art-riset-customer-avatar',
      slug: 'framework-riset-customer-avatar-sebelum-beriklan',
      title: 'Framework Riset Customer Avatar Sebelum Menjalankan Iklan',
      excerpt: 'Materi iklan terbaik akan sia-sia jika ditujukan kepada orang yang salah. Pelajari cara menggali pain points dan motivasi terdalam audiens.',
      content: `## Mengapa Customer Research adalah 80% Kunci Sukses?
Banyak pengiklan terburu-buru membuka Ads Manager tanpa memahami siapa sebenarnya calon pembeli mereka. Padahal, algoritma Meta bekerja optimal ketika materi kreatif kita relevan dengan audiens yang dituju.

### 4 Pertanyaan Kunci dalam Menentukan Avatar
1. **Masalah apa yang membuat mereka tidak bisa tidur di malam hari?** (Pain Point utama)
2. **Solusi apa yang sudah pernah mereka coba namun gagal?** (Objection handling)
3. **Bahasa atau istilah apa yang biasa mereka gunakan saat curhat di media sosial?** (Ad copy inspiration)
4. **Apa keraguan terbesar mereka sebelum mengeluarkan uang?** (Trust barrier)

Saat Anda memahami emosi audiens, menulis headline dan hook video iklan menjadi jauh lebih terarah dan memicu klik.`,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: 'Research & Strategy',
      tags: 'Research, Customer Avatar, Copywriting',
      author: 'Dimas Setiawan',
      readingTime: '5 min read',
      locale: 'id',
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: 'Framework Riset Customer Avatar Sebelum Beriklan | Belajar Ads',
      metaDesc: 'Cara praktis riset audiens dan customer avatar sebelum membakar budget iklan di Meta Ads.',
    },
    {
      id: 'art-en-structuring',
      slug: 'how-to-structure-meta-ads-campaigns-for-consistent-roas',
      title: 'How to Structure Meta Ads Campaigns for Consistent ROAS',
      excerpt: 'Learn the battle-tested campaign hierarchy used by top performance marketers to scale spend while keeping customer acquisition cost under control.',
      content: `## The Modern Meta Ads Structure
With the continuous evolution of Meta's machine learning, complex 50-ad-set configurations are no longer effective. The modern approach focuses on **account simplification** and **creative diversification**.

### The 3 Core Campaign Buckets
1. **Testing Campaign (ABO):** Dedicated to testing 5-10 new creative hooks every week with isolated budgets.
2. **Scaling Campaign (CBO / Advantage+):** Where validated winning creatives are graduated to capture broad audience volume.
3. **Retargeting & Retention:** Re-engaging past engagers, cart abandoners, and previous buyers with tailored incentives.

Focus on creative volume and clear product positioning. Let the algorithm do the heavy lifting while you focus on message-market match.`,
      featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      category: 'Campaign Architecture',
      tags: 'Meta Ads, Scaling, ROAS, Campaign Setup',
      author: 'Belajar Ads Team',
      readingTime: '5 min read',
      locale: 'en',
      isPublished: true,
      publishedAt: new Date(),
      metaTitle: 'How to Structure Meta Ads Campaigns for Consistent ROAS | Belajar Ads',
      metaDesc: 'A practical guide to structuring Meta Ads campaigns for scalable performance and positive return on ad spend.',
    },
  ];

  for (const a of articles) {
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: a,
      create: a,
    });
  }

  // 6. Resources
  const resources = [
    {
      id: 'res-tutorial-capi',
      slug: 'tutorial-setup-conversions-api-meta-ads',
      title: 'Tutorial: Setup Conversions API (CAPI) & Pixel Meta Ads',
      type: 'TUTORIAL',
      category: 'Tracking & Analytics',
      excerpt: 'Panduan teknis langkah demi langkah memasang Meta Pixel dan Conversions API agar data event pembelian tidak terhalang browser blocker.',
      content: 'Panduan lengkap konfigurasi server-side event tracking untuk Meta Ads.',
      downloadUrl: '',
      locale: 'id',
      isPublished: true,
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'res-case-study-scaling',
      slug: 'case-study-scaling-ecommerce-brand',
      title: 'Studi Kasus: Scaling Campaign E-Commerce Brand Lokal',
      type: 'CASE_STUDY',
      category: 'E-Commerce',
      excerpt: 'Bedah proses validasi sudut penawaran, perbaikan rasio konversi landing page, hingga scaling anggaran dengan ROAS tetap stabil.',
      content: 'Ulasan transparan mengenai metrik, creative angles, dan rintangan yang dihadapi selama fase scaling iklan.',
      downloadUrl: '',
      locale: 'id',
      isPublished: true,
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'res-breakdown-ugc',
      slug: 'ads-breakdown-formula-video-ugc-konversi-tinggi',
      title: 'Ads Breakdown: Formula 3 Detik Pertama Video UGC Konversi Tinggi',
      type: 'ADS_BREAKDOWN',
      category: 'Creative Analysis',
      excerpt: 'Analisis mendalam 5 iklan video UGC dengan rasio retensi tertinggi: struktur hook, transisi visual, dan CTA yang persuasif.',
      content: 'Bedah struktur detik demi detik video ads yang terbukti menghasilkan CTR di atas 3%.',
      downloadUrl: '',
      locale: 'id',
      isPublished: true,
      featuredImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'res-free-checklist',
      slug: 'checklist-audit-akun-meta-ads',
      title: 'Checklist & Template Audit Akun Meta Ads',
      type: 'FREE_RESOURCE',
      category: 'Templates & Guides',
      excerpt: 'Dokumen checklist praktis berisi 25 poin pemeriksaan sebelum menaikkan anggaran iklan Anda ke level berikutnya.',
      content: 'Template spreadsheet dan checklist PDF untuk mengaudit performa akun iklan.',
      downloadUrl: '#',
      locale: 'id',
      isPublished: true,
      featuredImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    },
  ];

  for (const r of resources) {
    await prisma.resource.upsert({
      where: { slug: r.slug },
      update: r,
      create: r,
    });
  }

  // 7. Initial Lead
  await prisma.lead.create({
    data: {
      name: 'Budi Santoso',
      email: 'budi.sample@example.com',
      phone: '081234567890',
      company: 'PT Retail Digital Pratama',
      participants: '10-20 orang',
      trainingNeeds: 'In-House Meta Ads Training untuk tim marketing agar dapat meriset creative dan memantau performa iklan secara mandiri.',
      preferredDate: 'Bulan Depan',
      isOnline: false,
      source: 'BUSINESS_INQUIRY',
      message: 'Mohon info proposal program in-house training dan silabus lengkapnya.',
      status: 'NEW',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
