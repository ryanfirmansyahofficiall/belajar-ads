'use client';

import React from 'react';
import { Program } from '@prisma/client';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';
import { Sparkles, Target, Zap } from 'lucide-react';

export function WorkshopClient({ workshops }: { workshops: Program[] }) {
  const { locale } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{locale === 'id' ? 'Praktek Hands-On' : 'Hands-On Practice'}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Workshop Praktek Langsung.' : 'Hands-On Intensive Workshops.'}
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed">
            {locale === 'id'
              ? 'Sesi fokus 1 hari untuk menyelesaikan tantangan spesifik: memproduksi 10 hook materi iklan, merancang funnel landing page, atau mengaudit akun iklan dari A sampai Z.'
              : 'One-day dedicated intensives tackling specific campaign challenges: producing 10+ creative angles, landing page funnels, or complete account audits.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: locale === 'id' ? 'Fokus Satu Masalah Spesifik' : 'Hyper-Focused Agenda',
              desc: locale === 'id' ? 'Setiap workshop didesain tuntas untuk menghasilkan satu output nyata di akhir sesi.' : 'Each workshop zero-in on solving one critical advertising bottleneck completely.',
            },
            {
              icon: Zap,
              title: locale === 'id' ? 'Praktek Saat Itu Juga' : 'Real-Time Implementation',
              desc: locale === 'id' ? 'Bukan sekadar mendengarkan materi, melainkan langsung mengeksekusi bersama bimbingan mentor.' : 'Step away from passive listening—draft copy, build hooks, and audit accounts live.',
            },
            {
              icon: Sparkles,
              title: locale === 'id' ? 'Review & Evaluasi Langsung' : 'Immediate Practitioner Feedback',
              desc: locale === 'id' ? 'Dapatkan feedback seketika untuk menyempurnakan materi sebelum diluncurkan ke pasar.' : 'Get instant, constructive critiques on your angles before deploying spend.',
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
              {locale === 'id' ? 'Jadwal Workshop Mendatang' : 'Upcoming Workshops'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Daftar sesi workshop yang sedang membuka kuota peserta.'
                : 'Select an upcoming workshop session and secure your seat.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {workshops.map((w) => (
              <ProgramCard key={w.id} program={w} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
