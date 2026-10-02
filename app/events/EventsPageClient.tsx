'use client';

import React from 'react';
import { Event } from '@prisma/client';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { EventCard } from '@/components/EventCard';

interface EventsPageClientProps {
  upcomingEvents: Event[];
  pastEvents: Event[];
}

export function EventsPageClient({ upcomingEvents, pastEvents }: EventsPageClientProps) {
  const { locale } = useLanguage();

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{locale === 'id' ? 'Event & Workshop' : 'Events & Workshops'}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {locale === 'id' ? 'Belajar & Berjejaring Bersama.' : 'Learn & Connect Together.'}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {locale === 'id'
              ? 'Temukan sesi webinar interaktif, workshop praktis, klinik iklan, dan meetup komunitas untuk mengasah kemampuan eksekusi campaign Anda.'
              : 'Discover live masterclasses, interactive teardown clinics, practical webinars, and community meetups.'}
          </p>
        </div>

        {/* Section 1: Upcoming Events */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-dark-border pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {locale === 'id' ? 'Event Mendatang' : 'Upcoming Events'}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                {locale === 'id'
                  ? 'Sesi yang sedang membuka pendaftaran untuk publik dan member.'
                  : 'Sessions currently accepting open registrations.'}
              </p>
            </div>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl bg-dark-card border border-dark-border text-gray-400">
              {locale === 'id' ? 'Belum ada jadwal event mendatang saat ini.' : 'No upcoming events scheduled at this moment.'}
            </div>
          )}
        </div>

        {/* Section 2: Past Events Archive */}
        {pastEvents.length > 0 && (
          <div className="space-y-8 pt-8">
            <div className="border-b border-dark-border pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-300 tracking-tight">
                {locale === 'id' ? 'Arsip Event Sebelumnya' : 'Past Events Archive'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {locale === 'id'
                  ? 'Dokumentasi sesi workshop dan meetup yang telah selesai diselenggarakan.'
                  : 'Completed masterclasses and community sessions.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
