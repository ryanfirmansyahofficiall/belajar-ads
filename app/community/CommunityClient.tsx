'use client';

import React from 'react';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { Badge } from '@/components/SectionHeading';
import { ExternalButton } from '@/components/ExternalButton';
import { 
  Users, 
  MessageSquare, 
  Sparkles, 
  Target, 
  Coffee,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';

export function CommunityClient({ sections }: { sections: Record<string, { id: Record<string, any>; en: Record<string, any> }> }) {
  const { locale, dict } = useLanguage();
  const settings = useSettings();
  const communityUrl = settings.communityUrl || siteConfig.links.community;

  const heroSec = sections['hero'];
  const localizedHero = heroSec ? (heroSec[locale] || heroSec.id || {}) : {};

  const activities = [
    {
      title: locale === 'id' ? 'Diskusi Campaign Harian' : 'Daily Campaign Strategy',
      desc: locale === 'id' 
        ? 'Tempat bertanya dan berbagi solusi ketika menemui kendala di Ads Manager, pixel error, atau biaya iklan membengkak.'
        : 'Collaborative troubleshooting for ad account anomalies, pixel errors, or rising acquisition costs.',
      icon: MessageSquare,
    },
    {
      title: locale === 'id' ? 'Bedah Materi Iklan & Hook' : 'Creative & Hook Teardown',
      desc: locale === 'id'
        ? 'Bedah materi iklan video dan gambar dari sesama member untuk mendapatkan masukan sudut pandang objektif.'
        : 'Peer and practitioner feedback on ad hooks, video angles, and direct response copywriting.',
      icon: Target,
    },
    {
      title: locale === 'id' ? 'Live Community Meetup' : 'Live Community Meetups',
      desc: locale === 'id'
        ? 'Sesi ngobrol santai bulanan membahas tren algoritma terbaru, Advantage+, dan lanskap performance marketing.'
        : 'Monthly virtual and in-person meetups exploring machine learning updates and industry shifts.',
      icon: Coffee,
    },
    {
      title: locale === 'id' ? 'Studi Kasus & Tantangan Praktek' : 'Case Study & Sprints',
      desc: locale === 'id'
        ? 'Tantangan praktek berkala untuk mengasah skill riset avatar dan eksekusi materi iklan secara disiplin.'
        : 'Periodic sprints and tactical challenges to hone your research and media buying craft.',
      icon: Sparkles,
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{localizedHero.eyebrow || 'Komunitas Belajar Ads'}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {localizedHero.heading || (locale === 'id' ? 'Belajar Iklan Tidak Harus Sendirian.' : "You Don't Have to Learn Ads Alone.")}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {localizedHero.subheading || (
              locale === 'id'
                ? 'Bergabunglah bersama komunitas praktisi, business owner, dan media buyer yang saling mendukung, berbagi data, dan tumbuh bersama dalam ekosistem periklanan digital.'
                : 'Join a thriving network of practitioners, media buyers, and entrepreneurs sharing real campaign insights and growing together.'
            )}
          </p>

          <div className="pt-2">
            <ExternalButton
              href={communityUrl}
              variant="primary"
              className="px-8 py-3.5 text-sm font-bold glow-orange"
            >
              {localizedHero.ctaText || dict.brand.ctaCommunity}
            </ExternalButton>
          </div>
        </div>

        {/* Why Join Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{act.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{act.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Community Atmosphere Banner */}
        <div className="p-10 rounded-3xl bg-dark-surface border border-dark-border space-y-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Budaya Komunitas Kami' : 'Our Community Values'}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {locale === 'id'
                ? 'Komunitas Belajar Ads menjunjung tinggi etika saling menghargai, kejujuran data tanpa klaim palsu, dan semangat kolaborasi yang konstruktif. Tidak ada spam, tidak ada flexing tanpa substansi.'
                : 'Belajar Ads values mutual respect, data transparency without vanity claims, and supportive peer collaboration. Zero spam, zero noise.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-sm font-bold text-white block mb-1">
                {locale === 'id' ? 'Utamakan Praktek' : 'Practical First'}
              </span>
              <p className="text-xs text-gray-400">
                {locale === 'id' ? 'Fokus pada aksi nyata, eksekusi, dan evaluasi hasil berdasarkan data.' : 'Action-oriented execution and metric-driven evaluations.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-sm font-bold text-white block mb-1">
                {locale === 'id' ? 'Kritik Konstruktif' : 'Constructive Feedback'}
              </span>
              <p className="text-xs text-gray-400">
                {locale === 'id' ? 'Masukan objektif yang membangun untuk perbaikan materi iklan Anda.' : 'Objective diagnostic feedback to improve campaign performance.'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-dark-card border border-dark-border">
              <span className="text-sm font-bold text-white block mb-1">
                {locale === 'id' ? 'Tumbuh Berkelanjutan' : 'Continuous Growth'}
              </span>
              <p className="text-xs text-gray-400">
                {locale === 'id' ? 'Terus memperbarui wawasan seiring dinamika algoritma periklanan.' : 'Continuously adapting to algorithm updates and market dynamics.'}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <ExternalButton
              href={communityUrl}
              variant="primary"
              className="px-6 py-3 text-xs font-bold"
            >
              {localizedHero.ctaText || dict.brand.ctaCommunity}
            </ExternalButton>
          </div>
        </div>
      </div>
    </div>
  );
}
