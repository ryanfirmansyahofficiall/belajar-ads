const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const events = await prisma.event.findMany();
  console.log('=== ALL EVENTS IN DB ===');
  console.dir(events, { depth: null });

  const articles = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' }
  });
  console.log('=== LATEST ARTICLES ===');
  console.dir(articles.map(a => ({
    id: a.id,
    slug: a.slug,
    title: a.title,
    author: a.author,
    locale: a.locale,
    isPublished: a.isPublished,
    updatedAt: a.updatedAt
  })), { depth: null });
}

check().finally(() => prisma.$disconnect());
