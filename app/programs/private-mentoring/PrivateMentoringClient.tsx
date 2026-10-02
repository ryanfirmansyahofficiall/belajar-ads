'use client';

import React from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';
import { UserCheck, ShieldCheck, ArrowRight, Target } from 'lucide-react';

export function PrivateMentoringClient({ programs }: { programs: Program[] }) {
  const { locale } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{locale === 'id' ? 'Bimbingan 1-on-1' : '1-on-1 Advisory'}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Private Performance Mentoring.' : '1-on-1 Performance Mentoring.'}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {locale === 'id'
              ? 'Pendampingan eksklusif 1-on-1 langsung di dashboard akun iklan Anda. Bersama senior media buyer, kami membedah bottleneck, menyusun roadmap testing, dan scaling secara aman.'
              : 'Direct 1-on-1 mentorship inside your active ad accounts. Diagnose performance friction, construct custom testing matrices, and scale budgets with senior oversight.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: UserCheck,
              title: locale === 'id' ? 'Dedicated Senior Mentor' : 'Dedicated Senior Media Buyer',
              desc: locale === 'id' ? 'Anda dibimbing langsung oleh praktisi berpengalaman mengelola budget milyaran rupiah.' : 'Partner directly with practitioners managing high-volume commercial ad spend.',
            },
            {
              icon: Target,
              title: locale === 'id' ? 'Roadmap Spesifik Bisnis Anda' : 'Tailored Growth Roadmap',
              desc: locale === 'id' ? 'Strategi tidak bersifat umum, melainkan disesuaikan dengan margin dan target spesifik Anda.' : 'Customized funnel architectures aligned with your unit economics and margins.',
            },
            {
              icon: ShieldCheck,
              title: locale === 'id' ? 'Kerahasiaan Data Terjamin' : 'Strict Data Confidentiality',
              desc: locale === 'id' ? 'Seluruh data campaign dan metrik internal akun Anda dilindungi dengan komitmen kerahasiaan penuh.' : 'Complete commercial privacy and data security guaranteed under non-disclosure terms.',
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Program Mentoring Tersedia' : 'Mentoring Offerings'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Pilih opsi pendampingan privat yang sesuai dengan skala bisnis Anda.'
                : 'Select the private advisory package matched to your growth stage.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-surface border border-dark-border flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Konsultasikan Kebutuhan Akun Iklan Anda' : 'Discuss Your Campaign Scale Goals'}
            </h3>
            <p className="text-sm text-gray-400">
              {locale === 'id'
                ? 'Hubungi kami untuk menjadwalkan sesi evaluasi awal bersama tim advisory kami.'
                : 'Connect with our team to arrange an initial diagnostics discussion.'}
            </p>
          </div>
          <Link
            href={ROUTES.CONTACT}
            className="px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold text-sm glow-orange-sm transition-all whitespace-nowrap"
          >
            {locale === 'id' ? 'Hubungi Tim Advisory' : 'Contact Advisory Team'}
          </Link>
        </div>
      </div>
    </div>
  );
}
