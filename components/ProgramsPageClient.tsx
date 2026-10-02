'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { ROUTES } from '@/lib/routes';
import { useLanguage } from '@/context/LanguageContext';
import { SectionHeading, Badge } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';

interface ProgramsPageClientProps {
  programs: Program[];
}

export function ProgramsPageClient({ programs }: ProgramsPageClientProps) {
  const { locale } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredPrograms = selectedCategory === 'ALL'
    ? programs
    : programs.filter((p) => p.category === selectedCategory);

  const filterOptions = [
    { label: locale === 'id' ? 'Semua Format' : 'All Formats', value: 'ALL' },
    { label: 'E-Course', value: 'ECOURSE' },
    { label: 'Live Training', value: 'TRAINING' },
    { label: 'Workshop', value: 'WORKSHOP' },
    { label: 'Private Mentoring', value: 'PRIVATE_MENTORING' },
    { label: 'Corporate Training', value: 'COMPANY_TRAINING' },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <SectionHeading
            badge={locale === 'id' ? 'Jalur Belajar & Program' : 'Programs & Pathways'}
            title="Learn. Launch. Optimize."
            description={
              locale === 'id'
                ? 'Pilih program pembelajaran yang dirancang langsung oleh praktisi advertising untuk memberikan dampak nyata bagi campaign dan bisnis Anda.'
                : 'Choose actionable learning pathways designed by active practitioners to generate measurable results for your business.'
            }
          />
        </div>

        {/* Filter Badges without page reload */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-dark-border">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setSelectedCategory(opt.value)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === opt.value
                  ? 'bg-brand text-white glow-orange-sm'
                  : 'bg-dark-card text-gray-300 hover:text-white border border-dark-border hover:border-brand/40'
              }`}
            >
              {opt.label}
            </button>
          ))}

          <Link
            href={ROUTES.PROGRAMS_META_ADS}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-dark-card text-gray-300 hover:text-white border border-dark-border hover:border-brand/40 transition-colors ml-auto hidden sm:inline-block"
          >
            {locale === 'id' ? 'Kurikulum Meta Ads →' : 'Meta Ads Curriculum →'}
          </Link>
        </div>

        {/* Program Cards Grid */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3 bg-dark-card/30 rounded-3xl border border-dark-border">
            <p className="text-gray-400 text-sm">
              {locale === 'id'
                ? 'Belum ada program untuk kategori ini saat ini.'
                : 'No programs available in this category at this time.'}
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('ALL')}
              className="text-xs text-brand font-semibold hover:underline"
            >
              {locale === 'id' ? 'Lihat Semua Program' : 'View All Programs'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
