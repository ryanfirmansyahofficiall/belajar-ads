'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { ExternalButton } from '@/components/ExternalButton';
import { getStatusLabel, getCategoryLabel, getPriceLabel } from '@/lib/i18n';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  ChevronLeft, 
  Ticket
} from 'lucide-react';

export function EventDetailClient({ event }: { event: Event }) {
  const { locale } = useLanguage();

  const title = locale === 'en' ? (event.titleEn || event.titleId) : event.titleId;
  const description = locale === 'en' ? (event.descriptionEn || event.descriptionId) : event.descriptionId;
  const speakerRole = locale === 'en' ? (event.speakerRoleEn || event.speakerRoleId) : event.speakerRoleId;
  const whoShouldAttend = locale === 'en' ? (event.whoShouldAttendEn || event.whoShouldAttendId) : event.whoShouldAttendId;

  const rawAgenda = locale === 'en' ? (event.agendaEn || event.agendaId) : event.agendaId;
  let agendaItems: string[] = [];
  try {
    if (rawAgenda) agendaItems = JSON.parse(rawAgenda);
  } catch {
    agendaItems = rawAgenda ? [rawAgenda] : [];
  }

  const rawLearn = locale === 'en' ? (event.whatYouWillLearnEn || event.whatYouWillLearnId) : event.whatYouWillLearnId;
  let learnItems: string[] = [];
  try {
    if (rawLearn) learnItems = JSON.parse(rawLearn);
  } catch {
    learnItems = rawLearn ? [rawLearn] : [];
  }

  return (
    <div className="py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href={ROUTES.EVENTS}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{locale === 'id' ? 'Kembali ke Semua Event' : 'Back to All Events'}</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="brand">{getCategoryLabel(event.category, locale)}</Badge>
            <Badge variant={event.status === 'UPCOMING' || event.status === 'OPEN' ? 'success' : 'neutral'}>
              {getStatusLabel(event.status, locale)}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-[1.08]">
            {title}
          </h1>

          {/* Event Quick Info Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-2xl bg-dark-card border border-dark-border text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {locale === 'id' ? 'Tanggal & Waktu' : 'Date & Time'}
                </span>
                <span className="font-bold text-white text-sm">{event.date}</span>
                {event.time && <div className="text-xs text-gray-400">{event.time}</div>}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {locale === 'id' ? 'Lokasi Pelaksanaan' : 'Location'}
                </span>
                <span className="font-bold text-white text-sm">{event.location}</span>
                <div className="text-xs text-emerald-400 font-medium">
                  {event.isOnline
                    ? (locale === 'id' ? 'Sesi Online Langsung' : 'Live Virtual Session')
                    : (locale === 'id' ? 'Sesi Tatap Muka Langsung' : 'In-Person Event')}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">
                  {locale === 'id' ? 'Pembicara' : 'Speaker'}
                </span>
                <span className="font-bold text-white text-sm">{event.speaker}</span>
                {speakerRole && <div className="text-xs text-gray-400">{speakerRole}</div>}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Description */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">
                {locale === 'id' ? 'Tentang Sesi Ini' : 'About This Session'}
              </h2>
              <div className="text-gray-300 leading-relaxed space-y-4 text-base whitespace-pre-line">
                {description}
              </div>
            </div>

            {/* What You Will Learn */}
            {learnItems.length > 0 && (
              <div className="space-y-4 p-6 sm:p-8 rounded-2xl bg-dark-card border border-dark-border">
                <h3 className="text-lg font-bold text-white">
                  {locale === 'id' ? 'Poin yang Akan Dipelajari' : 'What You Will Learn'}
                </h3>
                <ul className="space-y-3">
                  {learnItems.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Agenda */}
            {agendaItems.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">
                  {locale === 'id' ? 'Agenda Acara' : 'Event Agenda'}
                </h3>
                <div className="space-y-3">
                  {agendaItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-dark-surface border border-dark-border flex items-center gap-3 text-sm"
                    >
                      <div className="w-6 h-6 rounded-md bg-brand/10 text-brand flex items-center justify-center font-bold text-xs flex-shrink-0">
                        {idx + 1}
                      </div>
                      <span className="text-gray-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Who Should Attend */}
            {whoShouldAttend && (
              <div className="p-6 rounded-2xl bg-dark-card border border-dark-border space-y-2">
                <h4 className="text-sm font-bold text-white">
                  {locale === 'id' ? 'Siapa yang Sebaiknya Hadir?' : 'Who Should Attend?'}
                </h4>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {whoShouldAttend}
                </p>
              </div>
            )}
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-2xl bg-dark-card border border-dark-border space-y-6">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  {locale === 'id' ? 'Investasi / Biaya' : 'Admission / Fee'}
                </span>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                  {getPriceLabel(event.price, locale)}
                </div>
              </div>

              <div className="space-y-3">
                <ExternalButton
                  href={event.registrationUrl}
                  variant="primary"
                  className="w-full justify-center py-3.5 text-sm font-bold glow-orange"
                >
                  <Ticket className="w-4 h-4 mr-1.5" />
                  <span>{locale === 'id' ? 'Daftar Sekarang' : 'Register Now'}</span>
                </ExternalButton>

                <p className="text-[11px] text-gray-500 text-center">
                  {event.capacity || (locale === 'id' ? 'Kuota kursi terbatas untuk menjaga kualitas diskusi.' : 'Seats are limited to maintain discussion quality.')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
