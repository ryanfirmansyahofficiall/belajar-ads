'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Program, Event, Article } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { useSettings } from '@/context/SettingsContext';
import { ExternalButton } from './ExternalButton';
import { getStatusLabel, getPriceLabel, getCategoryLabel, getLevelLabel, getFormatLabel } from '@/lib/i18n';
import { 
  ArrowRight, 
  Compass, 
  Rocket, 
  BarChart3, 
  Zap,
  Calendar,
  Clock,
  MapPin,
  User,
  Monitor
} from 'lucide-react';

interface HomePageClientProps {
  pageSections: Record<string, { id: Record<string, any>; en: Record<string, any> }>;
  programs: Program[];
  events: Event[];
  articles: Article[];
  visibilities: Record<string, boolean>;
}

export function HomePageClient({
  pageSections,
  programs,
  events,
  articles,
  visibilities,
}: HomePageClientProps) {
  const { locale, dict } = useLanguage();
  const settings = useSettings();

  // Helper to extract section content for current locale with fallback
  const getSection = (key: string) => {
    const sec = pageSections[key];
    if (!sec) return {};
    const localized = sec[locale] || {};
    const fallback = sec.id || {};
    return { ...fallback, ...localized };
  };

  const hero = getSection('hero');
  const pillars = getSection('pillars');
  const metaAds = getSection('meta_ads');
  const community = getSection('community');
  const business = getSection('business');
  const finalCta = getSection('final_cta');

  const isVis = (key: string) => visibilities[key] !== false;

  return (
    <div className="flex flex-col bg-[#08090A] text-gray-100 overflow-hidden">
      
      {/* ========================================================
          1. HERO SECTION (Editorial Opening Statement + Open Telemetry Ledger)
          ======================================================== */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-28 lg:pb-32 border-b border-white/[0.06]">
        {/* Subtle radial ambient warmth */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(255,85,0,0.08),transparent_70%)] pointer-events-none" />
        
        {/* Architectural hairline grid lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Headline, Actions & Typographic Metrics */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Eyebrow Label */}
              <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-white/[0.03] border border-white/10 text-brand text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span>{hero.eyebrow || (locale === 'id' ? 'Platform Belajar Advertising Praktis' : 'Practical Advertising Learning Platform')}</span>
              </div>

              {/* Massive Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[78px] font-black text-white tracking-[-0.035em] leading-[0.96] whitespace-pre-line">
                {hero.heading || 'Learn Ads.\nLaunch Campaigns.\nGrow.'}
              </h1>

              {/* Subheading */}
              <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl font-normal">
                {hero.subheading || dict.brand.heroSub}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href={hero.primaryCtaUrl || ROUTES.PROGRAMS}
                  className="px-7 py-3.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-bold text-sm tracking-wide shadow-lg shadow-brand/20 hover:shadow-brand/30 transition-all duration-200 active:scale-[0.98] flex items-center gap-2.5 group"
                >
                  <span>{hero.primaryCtaText || dict.brand.ctaExplore}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={hero.secondaryCtaUrl || settings.communityUrl || ROUTES.COMMUNITY}
                  className="px-7 py-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/15 hover:border-white/30 font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
                >
                  {hero.secondaryCtaText || dict.brand.ctaCommunity}
                </Link>
              </div>

              {/* Editorial Typographic Data Strip (Clean hairline dividers, zero cards) */}
              <div className="pt-10 border-t border-white/[0.08] grid grid-cols-3 divide-x divide-white/[0.08]">
                <div className="pr-4 sm:pr-6 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand block font-semibold">[01] FOCUS</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">Meta Ads</div>
                  <div className="text-xs text-gray-400 font-medium">{locale === 'id' ? 'Fokus Utama' : 'Initial Core'}</div>
                </div>
                <div className="px-4 sm:px-6 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand block font-semibold">[02] METHOD</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">100%</div>
                  <div className="text-xs text-gray-400 font-medium">{locale === 'id' ? 'Praktek Nyata' : 'Field Applied'}</div>
                </div>
                <div className="pl-4 sm:pl-6 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-brand block font-semibold">[03] NETWORK</span>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">Community</div>
                  <div className="text-xs text-gray-400 font-medium">{locale === 'id' ? 'Saling Berbagi' : 'Collaborative'}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Performance Telemetry Ledger (Content-First Composition, Zero Nested Cards) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Architectural frame: clean minimal geometry with hairline separators */}
                <div className="rounded-lg bg-[#0A0C10] border border-white/10 p-6 sm:p-8 space-y-6">
                  
                  {/* Telemetry Header */}
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand" />
                      <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                        {locale === 'id' ? 'SYS.01 // TELEMETRI PERFORMA' : 'SYS.01 // PERFORMANCE TELEMETRY'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono text-gray-400 tracking-wider">
                        {locale === 'id' ? 'REKAMAN AKTIF' : 'LIVE RECORD'}
                      </span>
                    </div>
                  </div>

                  {/* Typographic Data Core: ROAS & CAC — Pure Typographic Scale, Zero Nested Cards */}
                  <div className="grid grid-cols-2 divide-x divide-white/[0.08] py-2">
                    <div className="pr-5 sm:pr-6 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-medium">
                        {locale === 'id' ? 'Pengembalian Belanja Iklan' : 'Return on Ad Spend'}
                      </span>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand font-mono tracking-tight leading-none">3.4x</div>
                      <span className="text-xs font-mono text-gray-400 block">
                        {locale === 'id' ? 'Tolok Ukur ROAS' : 'ROAS Benchmark'}
                      </span>
                    </div>
                    <div className="pl-5 sm:pr-6 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block font-medium">
                        {locale === 'id' ? 'Biaya Per Akuisisi' : 'Cost Per Acquisition'}
                      </span>
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-mono tracking-tight leading-none">-28.4%</div>
                      <span className="text-xs font-mono text-gray-400 block">
                        {locale === 'id' ? 'Penurunan CAC' : 'CAC Reduction'}
                      </span>
                    </div>
                  </div>

                  {/* Campaign Structure — Open Row */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500 block">
                        {locale === 'id' ? 'Struktur Campaign' : 'Campaign Structure'}
                      </span>
                      <div className="text-sm font-bold text-white tracking-tight">Advantage+ & ABO Testing</div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {locale === 'id' ? 'Teroptimasi' : 'Optimized'}
                    </span>
                  </div>

                  {/* 3-Step Execution Framework — Open Horizontal Progression */}
                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-300 font-medium font-mono uppercase tracking-wider text-[11px]">
                        {locale === 'id' ? 'Framework 3 Langkah' : '3-Step Execution Framework'}
                      </span>
                      <span className="font-mono text-brand font-bold text-xs">
                        {locale === 'id' ? '100% LENGKAP' : '100% COMPLETE'}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/[0.08] overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-r from-orange-600 via-brand to-brand-hover" />
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-0.5">
                      <span className="text-white font-semibold">{locale === 'id' ? '01 PELAJARI' : '01 LEARN'}</span>
                      <span className="text-white font-semibold">{locale === 'id' ? '02 LUNCURKAN' : '02 LAUNCH'}</span>
                      <span className="text-brand font-bold">{locale === 'id' ? '03 OPTIMALKAN' : '03 OPTIMIZE'}</span>
                    </div>
                  </div>

                  {/* Editorial Footnote */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-gray-400">
                    <span className="italic font-serif">&quot;Advertising is learned by doing.&quot;</span>
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
                      {locale === 'id' ? 'Doktrin Belajar Ads' : 'Belajar Ads Doctrine'}
                    </span>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. PHILOSOPHY / PILLARS (Open 3-Column Architectural Ledger, Zero Cards)
          ======================================================== */}
      <section className="py-24 lg:py-32 bg-[#0A0C0F] border-b border-white/[0.06] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Asymmetric Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                <span>{pillars.eyebrow || dict.home.introTag}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.025em] leading-[1.02]">
                {pillars.heading || dict.home.introTitle}
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                {pillars.subheading || dict.home.introDesc}
              </p>
            </div>
          </div>

          {/* Open 3-Column Pillar Ledger (Pure Typography & Hairlines, Zero Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.08] border-t border-b border-white/[0.08]">
            
            {/* Pillar 01 */}
            <div className="py-10 md:py-14 md:pr-10 space-y-5 group">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-mono text-white/[0.07] group-hover:text-brand/20 transition-colors block select-none leading-none -mb-6 tracking-tighter">
                01
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">
                  {locale === 'id' ? 'PILAR 01 // FONDASI' : 'PILLAR 01 // FOUNDATION'}
                </span>
                <Compass className="w-4 h-4 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {pillars.pillar1Title || dict.home.pillars.learn.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                {pillars.pillar1Desc || dict.home.pillars.learn.desc}
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="py-10 md:py-14 md:px-10 space-y-5 group">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-mono text-white/[0.07] group-hover:text-brand/20 transition-colors block select-none leading-none -mb-6 tracking-tighter">
                02
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">
                  {locale === 'id' ? 'PILAR 02 // EKSEKUSI' : 'PILLAR 02 // EXECUTION'}
                </span>
                <Rocket className="w-4 h-4 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {pillars.pillar2Title || dict.home.pillars.launch.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                {pillars.pillar2Desc || dict.home.pillars.launch.desc}
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="py-10 md:py-14 md:pl-10 space-y-5 group">
              <span className="text-7xl sm:text-8xl lg:text-9xl font-black font-mono text-white/[0.07] group-hover:text-brand/20 transition-colors block select-none leading-none -mb-6 tracking-tighter">
                03
              </span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-brand uppercase">
                  {locale === 'id' ? 'PILAR 03 // SKALASI' : 'PILLAR 03 // SCALING'}
                </span>
                <BarChart3 className="w-4 h-4 text-gray-500" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {pillars.pillar3Title || dict.home.pillars.optimize.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                {pillars.pillar3Desc || dict.home.pillars.optimize.desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. FEATURED PROGRAMS (Curated Catalogue, Not Generic LMS Cards)
          ======================================================== */}
      {isVis('programs') && programs.length > 0 && (
        <section className="py-24 lg:py-32 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Split Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-white/[0.08]">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{locale === 'id' ? 'Jalur Belajar' : 'Learning Pathways'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.025em] leading-tight">
                  {locale === 'id' ? 'Format Belajar Fleksibel Sesuai Kebutuhan.' : 'Learn Your Way.'}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
                  {locale === 'id' ? 'Pilih format belajar yang paling sesuai dengan ritme, kebutuhan, dan target bisnis Anda.' : 'Choose the pathway tailored to your experience level, schedule, and growth targets.'}
                </p>
              </div>

              <Link
                href={ROUTES.PROGRAMS}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors whitespace-nowrap self-start md:self-auto group"
              >
                <span>{locale === 'id' ? 'Lihat Semua Program' : 'View All Programs'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Curated Editorial Program Catalogue (Hairline Separators, Structured Metadata) */}
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {programs.map((program, idx) => {
                const isAvailable = program.registrationStatus === 'AVAILABLE';
                const isComingSoon = program.registrationStatus === 'COMING_SOON';
                const rawTitle = locale === 'en' ? program.nameEn : program.nameId;
                const fallbackTitle = locale === 'en' ? program.nameId : program.nameEn;
                const title = (rawTitle && rawTitle.trim()) || (fallbackTitle && fallbackTitle.trim()) || getCategoryLabel(program.category, locale);

                const rawDesc = locale === 'en' ? program.descriptionEn : program.descriptionId;
                const fallbackDesc = locale === 'en' ? program.descriptionId : program.descriptionEn;
                const description = (rawDesc && rawDesc.trim()) || (fallbackDesc && fallbackDesc.trim()) || '';

                const ctaText = locale === 'en' ? (program.ctaTextEn || 'Register Now') : (program.ctaTextId || 'Daftar Sekarang');
                const indexNumber = String(idx + 1).padStart(2, '0');

                return (
                  <div 
                    key={program.id}
                    className="py-10 sm:py-12 transition-colors hover:bg-white/[0.015] group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                      
                      {/* Col 1: Graphic Index & Taxonomy */}
                      <div className="lg:col-span-2 space-y-2">
                        <span className="text-3xl sm:text-4xl font-black font-mono text-white/30 group-hover:text-brand transition-colors block">
                          {indexNumber}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 bg-brand/10 text-brand border border-brand/20">
                            {getCategoryLabel(program.category, locale)}
                          </span>
                          <span className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 border ${
                            isAvailable 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : isComingSoon 
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
                              : 'bg-white/5 text-gray-400 border-white/10'
                          }`}>
                            {getStatusLabel(program.registrationStatus, locale)}
                          </span>
                        </div>
                      </div>

                      {/* Col 2: Program Identity & Curriculum Scope - Prominent Title */}
                      <div className="lg:col-span-6 space-y-3">
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-brand transition-colors tracking-[-0.03em] leading-tight">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                            {description}
                          </p>
                        )}
                        {/* Metadata strip */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-gray-400 font-mono">
                          <span className="flex items-center gap-1.5 text-gray-300">
                            <Monitor className="w-3.5 h-3.5 text-brand" />
                            <span>{getFormatLabel(program.format, locale)}</span>
                          </span>
                          <span className="text-gray-400">
                            Level: <span className="text-white">{getLevelLabel(program.level, locale)}</span>
                          </span>
                          {program.duration && (
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <Clock className="w-3.5 h-3.5 text-gray-500" />
                              <span>{program.duration}</span>
                            </span>
                          )}
                          {program.instructor && (
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <User className="w-3.5 h-3.5 text-gray-500" />
                              <span>{program.instructor}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Col 3: Tuition & Direct Action */}
                      <div className="lg:col-span-4 flex flex-col lg:items-end justify-between space-y-4 pt-2 lg:pt-0">
                        <div>
                          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                            {locale === 'id' ? 'Status / Investasi' : 'Tuition / Status'}
                          </span>
                          <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight block">
                            {program.price || (locale === 'id' ? 'Pendaftaran Dibuka' : 'Registration Open')}
                          </span>
                        </div>

                        <div>
                          {program.registrationUrl ? (
                            <ExternalButton
                              href={program.registrationUrl}
                              variant="primary"
                              className="px-6 py-2.5 rounded-lg text-xs font-bold tracking-wide shadow-md shadow-brand/10 transition-all"
                            >
                              <span>{ctaText}</span>
                            </ExternalButton>
                          ) : (
                            <Link
                              href={ROUTES.CONTACT}
                              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-bold tracking-wide shadow-md shadow-brand/10 transition-all active:scale-[0.98]"
                            >
                              <span>{ctaText}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          4. META ADS SECTION (Editorial Curriculum Matrix)
          ======================================================== */}
      <section className="py-24 lg:py-32 bg-[#0A0C0F] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
            
            {/* Left Column: Context & Editorial Checklist */}
            <div className="lg:col-span-6 space-y-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                <span>{metaAds.eyebrow || (locale === 'id' ? 'Fokus Utama Saat Ini' : 'Current Core Focus')}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.025em] leading-tight">
                {metaAds.heading || dict.home.metaAdsTitle}
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                {metaAds.subheading || dict.home.metaAdsDesc}
              </p>

              {/* Numbered Editorial Rows (Clean lines, zero pill containers) */}
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {[
                  locale === 'id' ? 'Logika Algoritma & Machine Learning Meta Terkini' : 'Modern Meta Machine Learning & Delivery Mechanics',
                  locale === 'id' ? 'Riset Customer Avatar & Sudut Pandang Kreatif' : 'Customer Avatar Research & Messaging Strategy',
                  locale === 'id' ? 'Struktur Campaign ABO vs CBO yang Disiplin' : 'Disciplined ABO vs CBO Campaign Architecture',
                  locale === 'id' ? 'Tracking Conversions API (CAPI) & Integrasi Pixel' : 'Conversions API (CAPI) & Pixel Setup',
                  locale === 'id' ? 'Diagnosa Metrik & Strategi Scaling Bertahap' : 'Metric Diagnostics & Progressive Scaling Frameworks',
                ].map((item, idx) => (
                  <div key={idx} className="py-3.5 flex items-start gap-4 text-sm text-gray-200">
                    <span className="font-mono text-xs font-bold text-brand mt-0.5 flex-shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href={metaAds.ctaUrl || ROUTES.PROGRAMS_META_ADS}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-bold text-sm shadow-md shadow-brand/20 transition-all duration-200 group"
                >
                  <span>{metaAds.ctaText || dict.home.metaAdsCta}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Curriculum Matrix (Disciplined Geometry, No Nested Cards) */}
            <div className="lg:col-span-6">
              <div className="rounded-lg border border-white/10 bg-[#090B0E] p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5 text-white font-mono text-xs font-bold tracking-wider uppercase">
                    <Zap className="w-4 h-4 text-brand" />
                    <span>{locale === 'id' ? 'Modul & Kurikulum Praktis' : 'Practical Curriculum Matrix'}</span>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">
                    {locale === 'id' ? '6 Tahap Utama' : '6 Core Stages'}
                  </span>
                </div>

                {/* Hairline Grid Matrix: Content-First, Zero Nested Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08] border border-white/[0.08] overflow-hidden">
                  {[
                    { stage: locale === 'id' ? 'TAHAP 01' : 'STAGE 01', label: locale === 'id' ? 'Fondasi' : 'Fundamental', desc: locale === 'id' ? 'Alur kerja Ads Manager' : 'Ads Manager workflow' },
                    { stage: locale === 'id' ? 'TAHAP 02' : 'STAGE 02', label: locale === 'id' ? 'Riset' : 'Research', desc: locale === 'id' ? 'Avatar & analisa kompetitor' : 'Avatar & competitor teardown' },
                    { stage: locale === 'id' ? 'TAHAP 03' : 'STAGE 03', label: locale === 'id' ? 'Kreatif' : 'Creative', desc: locale === 'id' ? 'Direct-response copywriting' : 'Direct-response copywriting' },
                    { stage: locale === 'id' ? 'TAHAP 04' : 'STAGE 04', label: locale === 'id' ? 'Setup & Pelacakan' : 'Setup & Tracking', desc: locale === 'id' ? 'Pixel, GTM, CAPI' : 'Pixel, GTM, CAPI' },
                    { stage: locale === 'id' ? 'TAHAP 05' : 'STAGE 05', label: locale === 'id' ? 'Optimasi' : 'Optimization', desc: locale === 'id' ? 'Diagnosa titik kebocoran' : 'Funnel leak diagnosis' },
                    { stage: locale === 'id' ? 'TAHAP 06' : 'STAGE 06', label: locale === 'id' ? 'Skalasi' : 'Scaling', desc: locale === 'id' ? 'Skalasi horizontal & vertikal' : 'Horizontal & vertical scale' },
                  ].map((cur, i) => (
                    <div key={i} className="p-4 sm:p-5 bg-[#0A0C10] space-y-1.5">
                      <span className="text-[10px] font-mono font-bold text-brand tracking-widest block">{cur.stage}</span>
                      <div className="text-sm font-bold text-white tracking-tight">{cur.label}</div>
                      <div className="text-xs text-gray-400 leading-relaxed">{cur.desc}</div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. COMMUNITY BANNER (Architectural Panoramic Band, Zero Floating Box)
          ======================================================== */}
      {isVis('community') && (
        <section className="py-24 lg:py-32 border-b border-white/[0.06] relative overflow-hidden bg-[#07080A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{community.eyebrow || (locale === 'id' ? 'Dukungan Ekosistem' : 'Ecosystem Support')}</span>
                </div>

                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.025em] leading-[1.05]">
                  {community.heading || dict.home.communityTitle}
                </h2>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                  {community.subheading || dict.home.communityDesc}
                </p>

                <div className="pt-2">
                  {community.ctaUrl || settings.communityUrl ? (
                    <ExternalButton
                      href={community.ctaUrl || settings.communityUrl}
                      variant="primary"
                      className="px-8 py-3.5 text-sm font-bold glow-orange"
                    >
                      <span>{community.ctaText || (locale === 'id' ? 'Gabung Komunitas Sekarang' : 'Join Community Now')}</span>
                    </ExternalButton>
                  ) : (
                    <Link
                      href={ROUTES.COMMUNITY}
                      className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-bold text-sm shadow-md shadow-brand/20 transition-all duration-200 group"
                    >
                      <span>{community.ctaText || (locale === 'id' ? 'Gabung Komunitas Sekarang' : 'Join Community Now')}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>

              {/* Typographic Ecosystem Architecture */}
              <div className="lg:col-span-5">
                <div className="border border-white/10 bg-[#090B0E] p-6 sm:p-7 space-y-5 rounded-lg">
                  <div className="text-xs font-mono font-bold tracking-widest text-brand uppercase border-b border-white/[0.08] pb-3">
                    {locale === 'id' ? 'MANIFESTO EKOSISTEM' : 'ECOSYSTEM MANIFESTO'}
                  </div>
                  <div className="divide-y divide-white/[0.08] space-y-4">
                    <div className="pt-3 first:pt-0 space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                        {locale === 'id' ? '01 // JARINGAN SEJAWAT' : '01 // NETWORK'}
                      </span>
                      <div className="text-sm font-bold text-white">
                        {locale === 'id' ? 'Komunitas Praktisi Sejawat' : 'Practitioner Peer Group'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {locale === 'id' ? 'Diskusi terbuka antar media buyer & brand founder.' : 'Open discussions among media buyers and brand founders.'}
                      </div>
                    </div>
                    <div className="pt-4 space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                        {locale === 'id' ? '02 // PEMECAHAN MASALAH' : '02 // PROBLEM SOLVING'}
                      </span>
                      <div className="text-sm font-bold text-white">
                        {locale === 'id' ? 'Troubleshooting Kampanye Harian' : 'Daily Campaign Troubleshooting'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {locale === 'id' ? 'Bedah kendala performa akun dan perubahan algoritma.' : 'Troubleshoot ad account bottlenecks and algorithm shifts.'}
                      </div>
                    </div>
                    <div className="pt-4 space-y-1">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                        {locale === 'id' ? '03 // PERTUMBUHAN BERSAMA' : '03 // SHARED GROWTH'}
                      </span>
                      <div className="text-sm font-bold text-white">
                        {locale === 'id' ? 'Pembelajaran Empiris Nyata' : 'Empirical Learnings'}
                      </div>
                      <div className="text-xs text-gray-400">
                        {locale === 'id' ? 'Pertukaran hipotesis pengujian kreatif tanpa klaim fiktif.' : 'Exchange verified creative hypotheses without vanity claims.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          6. UPCOMING EVENTS (Editorial Schedule Ledger, Zero Box Clutter)
          ======================================================== */}
      {isVis('events') && events.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0A0C0F] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Split Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-white/[0.08]">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{locale === 'id' ? 'Sesi Interaktif' : 'Live Interactive'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.025em] leading-tight">
                  {locale === 'id' ? 'Jadwal Event & Workshop Mendatang' : 'Upcoming Events & Workshops'}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
                  {locale === 'id' ? 'Sesi belajar intensif, webinar gratis, dan clinic interaktif untuk mengasah skill campaign Anda.' : 'Intensive masterclasses, free webinars, and interactive clinics to sharpen your execution.'}
                </p>
              </div>

              <Link
                href={ROUTES.EVENTS}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors whitespace-nowrap self-start md:self-auto group"
              >
                <span>{locale === 'id' ? 'Lihat Semua Event' : 'View All Events'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Editorial Schedule Ledger */}
            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {events.map((event) => {
                const isUpcoming = event.status === 'UPCOMING' || event.status === 'OPEN';
                const title = locale === 'en' ? (event.titleEn || event.titleId) : event.titleId;
                const description = locale === 'en' ? (event.descriptionEn || event.descriptionId) : event.descriptionId;
                const speakerRole = locale === 'en' ? (event.speakerRoleEn || event.speakerRoleId) : event.speakerRoleId;

                return (
                  <div 
                    key={event.id}
                    className="py-10 sm:py-12 transition-colors hover:bg-white/[0.015] group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                      
                      {/* Col 1: Date & Time Telemetry Block */}
                      <div className="lg:col-span-3 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center text-[10px] font-mono font-semibold tracking-wider uppercase px-2 py-0.5 bg-brand/10 text-brand border border-brand/20">
                            {getCategoryLabel(event.category || 'EVENT', locale)}
                          </span>
                          <span className={`inline-flex items-center text-[10px] font-mono px-2 py-0.5 border ${
                            isUpcoming 
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                              : 'bg-white/5 text-gray-400 border-white/10'
                          }`}>
                            {getStatusLabel(event.status || 'UPCOMING', locale)}
                          </span>
                        </div>
                        <div className="pt-2">
                          <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                            {event.date || 'TBA'}
                          </div>
                          {event.time && (
                            <div className="text-xs font-mono text-gray-400 mt-0.5">
                              {event.time}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Col 2: Event Details & Speaker Info */}
                      <div className="lg:col-span-6 space-y-3">
                        <Link href={ROUTES.EVENT_DETAIL(event.slug)} className="block">
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-brand transition-colors tracking-[-0.025em] leading-tight">
                            {title}
                          </h3>
                        </Link>
                        <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-normal">
                          {description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs text-gray-400 font-mono">
                          {event.location && (
                            <span className="flex items-center gap-1.5 text-gray-300">
                              <MapPin className="w-3.5 h-3.5 text-brand" />
                              <span>{event.location}</span>
                            </span>
                          )}
                          {event.speaker && (
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <User className="w-3.5 h-3.5 text-gray-500" />
                              <span>{event.speaker} {speakerRole ? `(${speakerRole})` : ''}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Col 3: Fee & Action */}
                      <div className="lg:col-span-3 flex flex-col lg:items-end justify-between space-y-4 pt-2 lg:pt-0">
                        <div>
                          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">
                            {locale === 'id' ? 'Biaya' : 'Fee'}
                          </span>
                          <span className="text-lg sm:text-xl font-bold text-white font-mono tracking-tight block">
                            {getPriceLabel(event.price, locale)}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <Link
                            href={ROUTES.EVENT_DETAIL(event.slug)}
                            className="px-4 py-2 text-xs font-semibold text-gray-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all"
                          >
                            {locale === 'id' ? 'Detail' : 'Details'}
                          </Link>
                          <ExternalButton
                            href={event.registrationUrl}
                            variant="primary"
                            className="px-5 py-2 rounded-lg text-xs font-bold tracking-wide shadow-md shadow-brand/10 transition-all"
                          >
                            {locale === 'id' ? 'Daftar' : 'Register'}
                          </ExternalButton>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          7. FOR BUSINESS (Corporate Split, Clean Typographic Authority)
          ======================================================== */}
      {isVis('for_business') && (
        <section className="py-24 lg:py-28 border-b border-white/[0.06] bg-[#08090A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{business.eyebrow || (locale === 'id' ? 'Solusi Korporasi & Bisnis' : 'Corporate & Business Solutions')}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-[-0.025em] leading-tight">
                  {business.heading || (locale === 'id' ? 'Tingkatkan Kemampuan Tim In-House Anda.' : 'Scale Your In-House Team Capabilities.')}
                </h2>
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
                  {business.subheading || (locale === 'id' ? 'Kami membantu perusahaan membangun tim advertising internal yang mandiri, disiplin membaca data, dan efisien mengelola anggaran iklan.' : 'We help enterprises build self-sufficient internal advertising teams, data-driven discipline, and efficient ad budget allocation.')}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-2">
                    <span className="text-brand font-bold">01</span> {locale === 'id' ? 'Pelatihan In-House' : 'In-House Training'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-brand font-bold">02</span> {locale === 'id' ? 'Audit Akun & Alur Kerja' : 'Account & Workflow Audit'}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-brand font-bold">03</span> {locale === 'id' ? 'Playbook Eksekusi Khusus' : 'Custom Execution Playbook'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end items-center">
                <Link
                  href={business.ctaUrl || ROUTES.FOR_BUSINESS}
                  className="px-8 py-4 rounded-lg bg-brand hover:bg-brand-hover text-white font-bold text-sm tracking-wide shadow-lg shadow-brand/20 transition-all duration-200 whitespace-nowrap active:scale-[0.98] inline-flex items-center gap-2.5 group"
                >
                  <span>{business.ctaText || (locale === 'id' ? 'Pelajari Solusi Bisnis' : 'Explore Business Solutions')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          8. LATEST ARTICLES (Editorial Publication Spread)
          ======================================================== */}
      {isVis('resources') && isVis('articles') && articles.length > 0 && (
        <section className="py-24 lg:py-32 bg-[#0A0C0F] border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            
            {/* Split Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-6 border-b border-white/[0.08]">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/10 border border-brand/20 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
                  <span>{locale === 'id' ? 'Wawasan & Analisis' : 'Insights & Analysis'}</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-[-0.025em] leading-tight">
                  {locale === 'id' ? 'Artikel Edukasi & Studi Kasus Terbaru' : 'Latest Articles & Practical Guides'}
                </h2>
                <p className="text-gray-400 text-base sm:text-lg leading-relaxed font-normal">
                  {locale === 'id' ? 'Panduan teknis, bedah materi iklan, dan pembelajaran empiris untuk akselerasi campaign Anda.' : 'Technical playbooks, teardowns, and empirical insights to improve your media buying.'}
                </p>
              </div>

              <Link
                href={ROUTES.ARTICLES}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-hover transition-colors whitespace-nowrap self-start md:self-auto group"
              >
                <span>{locale === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Publication Spread: Lead Feature + Secondary Stack */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              
              {/* Lead Feature (First Article) */}
              {articles[0] && (() => {
                const lead = articles[0];
                const leadTitle = locale === 'en' ? (lead.titleEn || lead.titleId) : lead.titleId;
                const leadExcerpt = locale === 'en' ? (lead.excerptEn || lead.excerptId) : lead.excerptId;
                const leadDate = lead.publishedAt
                  ? new Date(lead.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : '';

                return (
                  <article className={`space-y-6 ${articles.length > 1 ? 'lg:col-span-7' : 'lg:col-span-12'} group`}>
                    <Link
                      href={ROUTES.ARTICLE_DETAIL(lead.slug)}
                      className="block relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#111418] border border-white/10"
                    >
                      {lead.featuredImage ? (
                        <Image
                          src={lead.featuredImage}
                          alt={leadTitle}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 60vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#0D0F12] text-gray-500 text-xs font-mono font-bold tracking-wider">
                          BELAJAR ADS EDITORIAL
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase bg-black/80 border border-white/15 text-white">
                          {lead.category}
                        </span>
                      </div>
                    </Link>

                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
                        {leadDate && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-gray-500" />
                            <span>{leadDate}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-gray-500" />
                          <span>{lead.readingTime}</span>
                        </span>
                      </div>

                      <Link href={ROUTES.ARTICLE_DETAIL(lead.slug)} className="block">
                        <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-brand transition-colors tracking-tight leading-snug">
                          {leadTitle}
                        </h3>
                      </Link>

                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal">
                        {leadExcerpt}
                      </p>

                      <div className="pt-3 flex items-center justify-between border-t border-white/[0.06]">
                        <span className="text-xs text-gray-500 font-medium">
                          {locale === 'id' ? 'Oleh' : 'By'} {lead.author}
                        </span>
                        <Link
                          href={ROUTES.ARTICLE_DETAIL(lead.slug)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:text-brand-hover transition-colors group/link"
                        >
                          <span>{locale === 'id' ? 'Baca Selengkapnya' : 'Read Article'}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })()}

              {/* Secondary Stack (Articles 2 & 3) */}
              {articles.length > 1 && (
                <div className="lg:col-span-5 divide-y divide-white/[0.08] border-t lg:border-t-0 border-white/[0.08]">
                  {articles.slice(1, 3).map((article, idx) => {
                    const artTitle = locale === 'en' ? (article.titleEn || article.titleId) : article.titleId;
                    const artExcerpt = locale === 'en' ? (article.excerptEn || article.excerptId) : article.excerptId;
                    const artDate = article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '';
                    const artIndex = String(idx + 2).padStart(2, '0');

                    return (
                      <article key={article.id} className="py-8 first:pt-0 last:pb-0 space-y-3 group">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-brand tracking-wider uppercase">
                            [{artIndex}] {article.category}
                          </span>
                          <span className="text-[11px] font-mono text-gray-500">
                            {article.readingTime}
                          </span>
                        </div>

                        <Link href={ROUTES.ARTICLE_DETAIL(article.slug)} className="block">
                          <h4 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand transition-colors tracking-tight leading-snug line-clamp-2">
                            {artTitle}
                          </h4>
                        </Link>

                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 font-normal">
                          {artExcerpt}
                        </p>

                        <div className="pt-2 flex items-center justify-between text-xs text-gray-500 font-mono">
                          <span>{artDate}</span>
                          <Link
                            href={ROUTES.ARTICLE_DETAIL(article.slug)}
                            className="text-brand hover:text-brand-hover font-semibold inline-flex items-center gap-1 group/link"
                          >
                            <span>{locale === 'id' ? 'Baca' : 'Read'}</span>
                            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}

            </div>

          </div>
        </section>
      )}

      {/* ========================================================
          9. FINAL CLOSING CTA (Open Editorial Anchor, Zero Card Box)
          ======================================================== */}
      <section className="py-28 lg:py-36 relative overflow-hidden bg-[#08090A]">
        {/* Subtle center ambient warmth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-brand/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/[0.03] border border-white/10 text-brand text-xs font-mono font-semibold uppercase tracking-wider">
            <span>Learn. Launch. Optimize.</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-[-0.035em] leading-[0.98]">
            {finalCta.heading || (locale === 'id' ? 'Siap Memulai Perjalanan Advertising Anda?' : 'Ready to Elevate Your Advertising?')}
          </h2>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            {finalCta.subheading || (locale === 'id' ? 'Pilih program yang sesuai dengan tahap bisnis Anda dan mulailah meluncurkan campaign yang menghasilkan hasil nyata.' : 'Choose the program that fits your business stage and start launching campaigns that deliver measurable growth.')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={finalCta.primaryCtaUrl || ROUTES.PROGRAMS}
              className="px-8 py-3.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-bold text-sm tracking-wide shadow-lg shadow-brand/20 transition-all duration-200 active:scale-[0.98] flex items-center gap-2.5 group"
            >
              <span>{finalCta.primaryCtaText || (locale === 'id' ? 'Pilih Program Belajar' : 'Explore Programs')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href={finalCta.secondaryCtaUrl || ROUTES.CONTACT}
              className="px-8 py-3.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] text-white border border-white/15 hover:border-white/30 font-semibold text-sm transition-all duration-200 active:scale-[0.98]"
            >
              {finalCta.secondaryCtaText || (locale === 'id' ? 'Konsultasi Tim Kami' : 'Consult Our Team')}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
