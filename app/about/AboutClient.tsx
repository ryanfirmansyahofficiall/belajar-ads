'use client';

import React from 'react';
import Image from 'next/image';
import { Mentor } from '@prisma/client';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { Target, Compass } from 'lucide-react';

interface AboutClientProps {
  sections: Record<string, { id: Record<string, any>; en: Record<string, any> }>;
  mentors: Mentor[];
}

export function AboutClient({ sections, mentors }: AboutClientProps) {
  const { locale } = useLanguage();

  const storySec = sections['story'];
  const localizedStory = storySec ? (storySec[locale] || storySec.id || {}) : {};

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{localizedStory.eyebrow || (locale === 'id' ? 'Cerita & Tujuan Kami' : 'Our Story & Purpose')}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {localizedStory.heading || (locale === 'id' ? 'Kami Percaya Advertising Dikuasai Lewat Praktek Nyata.' : 'We Believe Advertising is Learned by Doing.')}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {localizedStory.subheading || (
              locale === 'id'
                ? 'Belajar Ads didirikan dari satu keyakinan sederhana: kemampuan beriklan tidak dapat dikuasai hanya dengan membaca slide teori, melainkan dengan meriset, meluncurkan campaign, membaca data, dan mengevaluasi kesalahan secara berulang.'
                : 'Belajar Ads was born from a singular conviction: media buying cannot be mastered through lectures alone—it is developed through direct market feedback, active testing, and iterative optimization.'
            )}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
              <Target className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {localizedStory.missionHeading || (locale === 'id' ? 'Misi Kami' : 'Our Mission')}
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {localizedStory.missionText || (
                locale === 'id'
                  ? 'Membantu individu dan bisnis membangun kemampuan advertising yang praktis, relevan, dan dapat diterapkan secara langsung di dunia nyata untuk menciptakan dampak pertumbuhan bisnis yang terukur.'
                  : 'Empower individuals and businesses to build practical, battle-tested advertising capabilities that drive verifiable commercial growth.'
              )}
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-dark-card border border-dark-border space-y-4">
            <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
              <Compass className="w-5 h-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {localizedStory.visionHeading || (locale === 'id' ? 'Visi Kami' : 'Our Vision')}
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              {localizedStory.visionText || (
                locale === 'id'
                  ? 'Membangun ekosistem belajar advertising terdepan yang menghubungkan edukasi berkualitas, praktek langsung, kebutuhan dunia bisnis, dan komunitas praktisi yang saling menguatkan.'
                  : 'Build the premier advertising education ecosystem uniting actionable training, direct field execution, real industry demands, and a collaborative practitioner community.'
              )}
            </p>
          </div>
        </div>

        {/* Brand Philosophy: 3 Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="brand">{locale === 'id' ? 'Pilar Utama Kami' : 'Our Core Philosophy'}</Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Learn. Launch. Optimize.
            </h2>
            <p className="text-sm text-gray-400">
              {locale === 'id'
                ? 'Setiap program dan materi kami dibangun berdasarkan siklus pertumbuhan tiga langkah ini.'
                : 'Every curriculum module is anchored around this proven three-phase execution cycle.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border space-y-3">
              <span className="text-xs font-mono text-brand font-bold uppercase">Pillar 01</span>
              <h3 className="text-lg font-bold text-white">
                {locale === 'id' ? 'Edukasi Praktis' : 'Practical Education'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Kami menghindari teori abstrak. Setiap modul dilengkapi lembar kerja dan checklist yang langsung dapat dieksekusi di akun iklan.'
                  : 'Zero abstract lectures. Every module includes actionable worksheets, copy templates, and checklists directly deployable in Ads Manager.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border space-y-3">
              <span className="text-xs font-mono text-brand font-bold uppercase">Pillar 02</span>
              <h3 className="text-lg font-bold text-white">
                {locale === 'id' ? 'Eksekusi Berbasis Data' : 'Data-Driven Execution'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Keputusan iklan diambil berdasarkan data empiris: CTR, conversion rate, CPC, dan ROAS, bukan sekadar asumsi atau intuisi pribadi.'
                  : 'Campaign adjustments are governed by empirical signals: CTR, funnel drop-off, CPC, and ROAS rather than speculative guesswork.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-dark-surface border border-dark-border space-y-3">
              <span className="text-xs font-mono text-brand font-bold uppercase">Pillar 03</span>
              <h3 className="text-lg font-bold text-white">
                {locale === 'id' ? 'Komunitas Suportif' : 'Supportive Community'}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Belajar iklan tidak harus sendirian. Komunitas kami adalah tempat berdiskusi dan bertukar solusi secara suportif dan etis.'
                  : 'Advertising does not have to be an isolated struggle. Our peer ecosystem provides continuous, constructive troubleshooting.'}
              </p>
            </div>
          </div>
        </div>

        {/* Mentors & Practitioners from Database */}
        <div className="space-y-8 pt-8">
          <div className="border-b border-dark-border pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Tim Mentor & Praktisi' : 'Mentors & Practitioners'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Para praktisi aktif yang mengelola campaign setiap hari di industri nyata.'
                : 'Active practitioners managing real commercial ad spend and scaling live campaigns daily.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentors.map((mentor) => {
              const role = locale === 'en' ? (mentor.roleEn || mentor.roleId) : mentor.roleId;
              const bio = locale === 'en' ? (mentor.bioEn || mentor.bioId) : mentor.bioId;
              const expertise = locale === 'en' ? (mentor.expertiseEn || mentor.expertiseId) : mentor.expertiseId;

              return (
                <div
                  key={mentor.id}
                  className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-4 flex flex-col group hover:border-gray-700 transition-all"
                >
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-dark-surface">
                    {mentor.photo ? (
                      <Image
                        src={mentor.photo}
                        alt={mentor.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-bold">
                        {mentor.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors tracking-tight">
                      {mentor.name}
                    </h3>
                    <div className="text-xs text-brand font-medium mt-0.5">{role}</div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed flex-1">
                    {bio}
                  </p>

                  <div className="pt-3 border-t border-dark-border text-[11px] text-gray-500">
                    <strong className="text-gray-400 font-medium">{locale === 'id' ? 'Keahlian:' : 'Expertise:'}</strong> {expertise}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
