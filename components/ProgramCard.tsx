'use client';

import React from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalButton } from './ExternalButton';
import { getStatusLabel, getLevelLabel, getCategoryLabel, getFormatLabel } from '@/lib/i18n';
import { Clock, Monitor, User, ArrowRight } from 'lucide-react';

interface ProgramCardProps {
  program: Program;
}

export function ProgramCard({ program }: ProgramCardProps) {
  const { locale } = useLanguage();
  const isAvailable = program.registrationStatus === 'AVAILABLE';
  const isComingSoon = program.registrationStatus === 'COMING_SOON';

  const rawTitle = locale === 'en' ? program.nameEn : program.nameId;
  const fallbackTitle = locale === 'en' ? program.nameId : program.nameEn;
  const title = (rawTitle && rawTitle.trim()) || (fallbackTitle && fallbackTitle.trim()) || getCategoryLabel(program.category, locale);

  const rawDesc = locale === 'en' ? program.descriptionEn : program.descriptionId;
  const fallbackDesc = locale === 'en' ? program.descriptionId : program.descriptionEn;
  const description = (rawDesc && rawDesc.trim()) || (fallbackDesc && fallbackDesc.trim()) || '';
  const ctaText = locale === 'en' ? (program.ctaTextEn || 'Register Now') : (program.ctaTextId || 'Daftar Sekarang');

  return (
    <div className="group relative flex flex-col bg-[#0D0F12] hover:bg-[#111418] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-all duration-200">
      {/* Card Header & Content */}
      <div className="p-6 sm:p-7 pb-5 flex-1 flex flex-col">
        {/* Eyebrow Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-1 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-brand/10 border border-brand/20 text-brand">
            {getCategoryLabel(program.category, locale)}
          </span>
          <span className={`inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
            isAvailable 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : isComingSoon 
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' 
              : 'bg-white/5 text-gray-400 border-white/10'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isAvailable ? 'bg-emerald-400' : isComingSoon ? 'bg-amber-400' : 'bg-gray-400'}`} />
            {getStatusLabel(program.registrationStatus, locale)}
          </span>
        </div>

        {/* Primary Entity Title - Dominant & Commanding Heading */}
        <h3 className="text-2xl sm:text-[26px] font-black text-white group-hover:text-brand transition-colors mb-2 tracking-[-0.02em] leading-tight">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-2 font-normal">
            {description}
          </p>
        )}

        {/* Program Attributes - Anchored to bottom of body */}
        <div className="mt-auto space-y-2.5 pt-5 border-t border-white/[0.06] text-xs text-gray-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-300">
              <Monitor className="w-3.5 h-3.5 text-brand" />
              <span>{getFormatLabel(program.format, locale)}</span>
            </span>
            <span className="font-mono text-xs text-gray-400 font-medium px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
              {getLevelLabel(program.level, locale)}
            </span>
          </div>

          {program.duration && (
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-gray-500" />
              <span>{program.duration}</span>
            </div>
          )}

          {program.instructor && (
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>{program.instructor}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer with Price & CTA */}
      <div className="p-6 sm:p-7 pt-4 bg-[#090A0D] border-t border-white/[0.06] flex items-center justify-between gap-4">
        <div>
          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">
            {locale === 'id' ? 'Status / Investasi' : 'Tuition / Status'}
          </span>
          <span className="text-lg sm:text-xl font-bold font-mono text-white tracking-tight block">
            {program.price || (locale === 'id' ? 'Pendaftaran Dibuka' : 'Registration Open')}
          </span>
        </div>

        {program.registrationUrl ? (
          <ExternalButton
            href={program.registrationUrl}
            variant="primary"
            className="text-xs px-4 py-2.5 rounded-lg font-bold shadow-md shadow-brand/10 transition-all"
          >
            <span>{ctaText}</span>
          </ExternalButton>
        ) : (
          <Link
            href={ROUTES.CONTACT}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-bold shadow-md shadow-brand/10 transition-all group/btn"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
