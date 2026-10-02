'use client';

import React from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';
import { Users, Calendar, MessageSquare, CheckCircle2 } from 'lucide-react';

export function TrainingClient({ programs }: { programs: Program[] }) {
  const { locale } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{locale === 'id' ? 'Kelas Intensif Cohort' : 'Live Cohort Classes'}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Live Training & Bootcamp Intensif.' : 'Live Interactive Cohort Training.'}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {locale === 'id'
              ? 'Belajar secara interaktif dalam kelompok terbatas bersama mentor praktisi. Disertai review akun iklan langsung, sesi tanya-jawab terbuka, dan lembar kerja mingguan.'
              : 'Interactive small-cohort learning coached directly by seasoned media buyers. Includes live campaign audits, open Q&A, and structured execution milestones.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Users,
              title: locale === 'id' ? 'Kelompok Belajar Terbatas' : 'Small Cohort Intimacy',
              desc: locale === 'id' ? 'Peserta dibatasi agar interaksi antara mentor dan peserta berlangsung mendalam dan personal.' : 'Capped student counts guarantee focused feedback and deep interaction with mentors.',
            },
            {
              icon: MessageSquare,
              title: locale === 'id' ? 'Bedah Akun Langsung' : 'Live Campaign Diagnostics',
              desc: locale === 'id' ? 'Akun iklan Anda diperiksa langsung untuk mendeteksi inefisiensi dan potensi pertumbuhan.' : 'Get your campaigns audited live during class to identify leaks and scaling angles.',
            },
            {
              icon: Calendar,
              title: locale === 'id' ? 'Jadwal Terjadwal Disiplin' : 'Structured Accountability',
              desc: locale === 'id' ? 'Sesi live mingguan via Zoom dengan rekaman lengkap dan grup diskusi eksklusif.' : 'Weekly live sessions via Zoom with complete replays and exclusive peer groups.',
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
              {locale === 'id' ? 'Batch Training Mendatang' : 'Upcoming Cohort Batches'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Daftar cohort training yang sedang membuka pendaftaran peserta.'
                : 'Active training programs currently accepting registrations.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((p) => (
              <ProgramCard key={p.id} program={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
