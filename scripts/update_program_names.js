const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updatePrograms() {
  const updates = [
    {
      id: 'prog-company-training',
      nameId: 'Training Perusahaan',
      nameEn: 'Corporate & In-House Team Training',
      descriptionId: 'Training komprehensif untuk tim internal perusahaan yang ingin meningkatkan kapabilitas eksekusi media buying secara mandiri, efisien, dan terukur.',
      descriptionEn: 'Standardized performance marketing training for in-house company teams wanting operational media buying self-sufficiency and improved ROAS efficiency.'
    },
    {
      id: 'prog-private-mentoring',
      nameId: 'Mentoring Privat',
      nameEn: '1-on-1 Performance Mentoring',
      descriptionId: 'Pendampingan privat eksklusif 1-on-1 langsung di akun iklan Anda bersama praktisi senior untuk membedah campaign dan menyusun roadmap scaling.',
      descriptionEn: 'Intensive private advisory directly inside your ad account with a senior media buyer. Diagnose attribution leaks, optimize your funnel, and scale with confidence.'
    },
    {
      id: 'prog-creative-workshop',
      nameId: 'Workshop',
      nameEn: 'High-Converting Ads Creative Workshop',
      descriptionId: 'Workshop praktis intensif merancang sudut pandang iklan (hooks), copywriting direct-response, dan storyboard video yang memicu konversi tinggi.',
      descriptionEn: 'Hands-on workshop to engineer persuasive hooks, direct-response copy angles, and video storyboards that stop the scroll and drive conversions.'
    },
    {
      id: 'prog-ecourse-fundamental',
      nameId: 'E-Course Meta Ads',
      nameEn: 'Meta Ads Fundamental E-Course',
      descriptionId: 'Belajar mandiri kapan saja dengan video on-demand terstruktur. Memandu Anda dari nol hingga memahami Ads Manager, navigasi dashboard, dan meluncurkan campaign.',
      descriptionEn: 'Self-paced structured video learning. Guides you from scratch through Ads Manager navigation, metric diagnostics, and launching your first winning campaign.'
    },
    {
      id: 'prog-meta-masterclass',
      nameId: 'Live Training',
      nameEn: 'Meta Ads Mastery Bootcamp',
      descriptionId: 'Program intensif 4 minggu interaktif mempelajari Meta Ads end-to-end: riset market, setup tracking CAPI, struktur campaign CBO/ABO, hingga scaling bertahap.',
      descriptionEn: 'A 4-week intensive bootcamp covering Meta Ads end-to-end: market research, CAPI tracking setup, CBO/ABO structuring, and repeatable scaling frameworks.'
    }
  ];

  for (const u of updates) {
    const res = await prisma.program.update({
      where: { id: u.id },
      data: {
        nameId: u.nameId,
        nameEn: u.nameEn,
        descriptionId: u.descriptionId,
        descriptionEn: u.descriptionEn
      }
    });
    console.log('✓ Successfully updated program:', res.id, '=>', res.nameId, '|', res.nameEn);
  }

  await prisma.$disconnect();
}

updatePrograms().catch(e => {
  console.error(e);
  process.exit(1);
});
