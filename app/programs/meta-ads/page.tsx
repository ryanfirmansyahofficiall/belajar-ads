'use client';

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { PublicLayout } from '@/components/PublicLayout';
import { CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

export default function MetaAdsPage() {
  const { locale, dict } = useLanguage();

  const topics = [
    {
      title: locale === 'id' ? 'Fundamental Meta Ads & Logika Machine Learning' : 'Meta Ads Fundamentals & Machine Learning Logic',
      desc: locale === 'id' ? 'Memahami algoritma auction, pacing budget, dan learning phase.' : 'Understand auction mechanics, budget pacing, and learning phases.',
    },
    {
      title: locale === 'id' ? 'Riset Pasar & Penemuan Customer Avatar' : 'Market Research & Customer Avatar Discovery',
      desc: locale === 'id' ? 'Menemukan pain points riil calon pembeli sebelum beriklan.' : 'Identify acute customer pain points before writing copy.',
    },
    {
      title: locale === 'id' ? 'Struktur Campaign: Taktik ABO vs CBO' : 'Campaign Structure: ABO vs CBO Tactics',
      desc: locale === 'id' ? 'Arsitektur akun iklan untuk testing dan scaling yang rapi.' : 'Disciplined account architecture for creative testing and scaling.',
    },
    {
      title: locale === 'id' ? 'Copywriting Direct-Response & Sudut Pandang Hook' : 'Direct-Response Copywriting & Hook Angles',
      desc: locale === 'id' ? 'Formula copywriting yang menghentikan scroll dan memicu klik.' : 'Scroll-stopping direct response formulas engineered for clicks.',
    },
    {
      title: locale === 'id' ? 'Strategi Kreatif & Framework Video UGC' : 'Creative Strategy & Video UGC Framework',
      desc: locale === 'id' ? 'Membuat materi video autentik dengan tingkat retensi tinggi.' : 'Authentic video production frameworks with high retention.',
    },
    {
      title: locale === 'id' ? 'Setup Conversions API (CAPI) & Integrasi Pixel' : 'Conversions API (CAPI) & Pixel Setup',
      desc: locale === 'id' ? 'Integrasi data server-side via Google Tag Manager.' : 'Server-side data integration via Google Tag Manager.',
    },
    {
      title: locale === 'id' ? 'Diagnosa Metrik & Optimasi Conversion Funnel' : 'Metric Diagnostics & Funnel Optimization',
      desc: locale === 'id' ? 'Mendiagnosa CTR, CPC, drop-off rate, dan conversion rate.' : 'Diagnose CTR, CPC, drop-off rates, and funnel conversion rates.',
    },
    {
      title: locale === 'id' ? 'Playbook Scaling (Horizontal & Vertikal)' : 'Scaling Playbooks (Horizontal & Vertical)',
      desc: locale === 'id' ? 'Menaikkan budget campaign tanpa merusak stabilitas ROAS.' : 'Scaling ad spend safely without degrading target ROAS.',
    },
  ];

  return (
    <PublicLayout>
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header Hero */}
          <div className="max-w-3xl space-y-4">
            <Badge variant="brand">{locale === 'id' ? 'Spesialisasi Khusus' : 'Specialized Track'}</Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
              {locale === 'id' ? 'Kuasai Meta Ads Secara Mendalam.' : 'Master Meta Ads.'}
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
              {locale === 'id'
                ? 'Bangun kemampuan riset pasar, peluncuran campaign terstruktur, analisis data, dan optimasi performa di ekosistem Meta Ads.'
                : 'Build battle-tested capabilities to research, launch, analyze, and scale profitable Meta Ads campaigns.'}
            </p>
          </div>

          {/* Curriculum Topics Grid */}
          <div className="p-8 sm:p-12 rounded-3xl bg-dark-card border border-dark-border space-y-8">
            <div className="border-b border-dark-border pb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'id' ? 'Topik Pembelajaran Komprehensif' : 'Comprehensive Curriculum Topics'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {locale === 'id'
                  ? 'Struktur pembelajaran dari riset hingga scaling yang dirancang khusus untuk ekosistem Meta Ads terkini.'
                  : 'A comprehensive curriculum spanning research to machine learning scaling on modern Meta Ads.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topics.map((topic, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-dark-surface border border-dark-border hover:border-brand/40 transition-colors flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{topic.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{topic.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Callout Action to Programs */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-card to-dark-surface border border-dark-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'id' ? 'Ingin Mempelajari Topik Ini Secara Intensif?' : 'Ready to Master These Modules Hands-On?'}
              </h3>
              <p className="text-sm text-gray-300">
                {locale === 'id'
                  ? 'Pilih program bootcamp, workshop interaktif, atau e-course yang paling sesuai dengan ritme Anda.'
                  : 'Enroll in our structured bootcamps, practical workshops, or self-paced video modules.'}
              </p>
            </div>
            <Link
              href={ROUTES.PROGRAMS}
              className="px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold text-sm glow-orange-sm transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>{locale === 'id' ? 'Lihat Semua Program' : 'Explore Programs'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
