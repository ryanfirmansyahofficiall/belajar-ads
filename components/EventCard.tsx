'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { ExternalButton } from './ExternalButton';
import { getStatusLabel, getCategoryLabel, getPriceLabel } from '@/lib/i18n';
import { Calendar, MapPin, User } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const { locale } = useLanguage();
  const isUpcoming = event.status === 'UPCOMING' || event.status === 'OPEN';

  const title = locale === 'en' ? (event.titleEn || event.titleId) : event.titleId;
  const description = locale === 'en' ? (event.descriptionEn || event.descriptionId) : event.descriptionId;
  const speakerRole = locale === 'en' ? (event.speakerRoleEn || event.speakerRoleId) : event.speakerRoleId;

  return (
    <div className="group relative flex flex-col bg-[#0D0F12] hover:bg-[#111418] border border-white/[0.08] hover:border-white/20 rounded-xl overflow-hidden transition-colors duration-200">
      <div className="p-7 pb-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-brand/10 border border-brand/20 text-brand">
            {getCategoryLabel(event.category, locale)}
          </span>
          <span className={`inline-flex items-center text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
            isUpcoming 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-white/5 text-gray-400 border-white/10'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isUpcoming ? 'bg-emerald-400' : 'bg-gray-400'}`} />
            {getStatusLabel(event.status, locale)}
          </span>
        </div>

        <Link href={ROUTES.EVENT_DETAIL(event.slug)} className="block">
          {/* Primary Entity Title - Visually Prominent & Dominant */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-brand transition-colors mb-3.5 leading-[1.15] line-clamp-2 tracking-[-0.025em]">
            {title}
          </h3>
        </Link>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-1 font-normal">
          {description}
        </p>

        {/* Schedule & Speaker Info */}
        <div className="space-y-2.5 pt-5 border-t border-white/[0.06] text-xs text-gray-400">
          <div className="flex items-center gap-2 text-gray-200 font-medium">
            <Calendar className="w-3.5 h-3.5 text-brand" />
            <span className="font-mono">{event.date || 'TBA'}</span>
            {event.time && <span className="text-gray-500 font-mono">• {event.time}</span>}
          </div>

          {event.location && (
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-gray-500" />
              <span>{event.location}</span>
            </div>
          )}

          {event.speaker && (
            <div className="flex items-center gap-2 text-gray-400">
              <User className="w-3.5 h-3.5 text-gray-500" />
              <span>{event.speaker} {speakerRole ? `(${speakerRole})` : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer with Price & Links */}
      <div className="p-7 pt-4 bg-[#090A0D] border-t border-white/[0.06] flex items-center justify-between gap-4">
        <div>
          <span className="block text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-0.5">
            {locale === 'id' ? 'Biaya' : 'Fee'}
          </span>
          <span className="text-base sm:text-lg font-bold font-mono text-white tracking-tight block">
            {getPriceLabel(event.price, locale)}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href={ROUTES.EVENT_DETAIL(event.slug)}
            className="px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/[0.04] transition-all"
          >
            {locale === 'id' ? 'Detail' : 'Details'}
          </Link>
          <ExternalButton
            href={event.registrationUrl}
            variant="primary"
            className="text-xs px-3.5 py-1.5 rounded-lg font-bold shadow-md shadow-brand/10 transition-all"
          >
            {locale === 'id' ? 'Daftar' : 'Register'}
          </ExternalButton>
        </div>
      </div>
    </div>
  );
}
