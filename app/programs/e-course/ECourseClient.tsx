'use client';

import React from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { Badge } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';
import { ExternalButton } from '@/components/ExternalButton';
import { Video, BookOpen, CheckSquare, Award, Clock, ArrowRight } from 'lucide-react';

export function ECourseClient({ ecourses }: { ecourses: Program[] }) {
  const { locale } = useLanguage();
  const settings = useSettings();
  const lmsUrl = settings.lmsUrl || siteConfig.links.lms;
  const hasAvailableCourse = ecourses.some((c) => c.registrationStatus === 'AVAILABLE');

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Section */}
        <div className="max-w-3xl space-y-4">
          <Badge variant={hasAvailableCourse ? 'success' : 'warning'}>
            {hasAvailableCourse ? (locale === 'id' ? 'Tersedia' : 'Available') : (locale === 'id' ? 'Segera Hadir' : 'Coming Soon')}
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Belajar Mandiri Sesuai Waktu Anda.' : 'Learn at Your Own Pace.'}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {locale === 'id'
              ? 'Program video edukasi on-demand yang terstruktur dan praktis, memungkinkan Anda belajar dan langsung mempraktekkan materi iklan kapan saja tanpa terikat jadwal kelas.'
              : 'Structured on-demand video learning designed to let you absorb, execute, and troubleshoot advertising campaigns at your own convenience.'}
          </p>

          <div className="pt-2 flex items-center gap-4">
            {hasAvailableCourse && lmsUrl ? (
              <ExternalButton href={lmsUrl} variant="primary">
                {locale === 'id' ? 'Mulai Belajar Sekarang' : 'Start Learning'}
              </ExternalButton>
            ) : (
              <Link
                href={ROUTES.CONTACT}
                className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all"
              >
                {locale === 'id' ? 'Dapatkan Informasi Terkini' : 'Get Notified'}
              </Link>
            )}
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Video,
              title: locale === 'id' ? 'Video Berkualitas Tinggi' : 'High-Definition Videos',
              desc: locale === 'id' ? 'Rekaman resolusi tinggi dengan demonstrasi klik-per-klik di Ads Manager.' : 'Full HD step-by-step screen recordings inside live Ads Manager accounts.',
            },
            {
              icon: BookOpen,
              title: locale === 'id' ? 'Worksheet & Template' : 'Worksheets & Templates',
              desc: locale === 'id' ? 'Lembar kerja riset avatar dan template copywriting siap pakai.' : 'Downloadable avatar research frameworks and battle-tested copy swipes.',
            },
            {
              icon: Clock,
              title: locale === 'id' ? 'Akses Fleksibel' : 'Lifetime Access',
              desc: locale === 'id' ? 'Tonton ulang kapan saja di desktop maupun mobile tanpa batas waktu.' : 'Rewatch anytime on mobile or desktop with continuous curriculum updates.',
            },
            {
              icon: CheckSquare,
              title: locale === 'id' ? 'Studi Kasus Nyata' : 'Real-World Cases',
              desc: locale === 'id' ? 'Analisis data dari campaign riil yang pernah dijalankan praktisi.' : 'Dissect actual campaign metrics and learnings executed by active practitioners.',
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

        {/* Courses List */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Pilihan Modul E-Course' : 'Available E-Courses'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Daftar e-course yang siap Anda akses untuk meningkatkan skill media buying.'
                : 'Select the self-paced course aligned with your current learning objectives.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ecourses.map((course) => (
              <ProgramCard key={course.id} program={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
