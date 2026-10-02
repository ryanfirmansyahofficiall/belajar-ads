'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Badge } from '@/components/SectionHeading';
import { BusinessInquiryForm } from '@/components/BusinessInquiryForm';
import { 
  Building2, 
  Users, 
  Target, 
  Settings2, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck 
} from 'lucide-react';

export function ForBusinessClient({ sections }: { sections: Record<string, { id: Record<string, any>; en: Record<string, any> }> }) {
  const { locale } = useLanguage();

  const heroSec = sections['hero'];
  const localizedHero = heroSec ? (heroSec[locale] || heroSec.id || {}) : {};

  const services = [
    {
      title: locale === 'id' ? 'Company Training' : 'In-House Corporate Training',
      desc: locale === 'id'
        ? 'Training komprehensif untuk tim internal perusahaan yang ingin meningkatkan kapabilitas eksekusi media buying secara mandiri.'
        : 'Comprehensive curriculum tailored to your industry to build autonomous in-house media buying squads.',
      points: locale === 'id' 
        ? ['Kurikulum disesuaikan dengan vertikal bisnis', 'Studi kasus langsung di akun brand Anda', 'Evaluasi pasca-training & pendampingan SOP']
        : ['Curriculum customized to your product category', 'Direct case studies inside your active accounts', 'Post-training evaluation and SOP frameworks'],
    },
    {
      title: locale === 'id' ? 'In-House Workshop' : 'On-Site Intensive Workshops',
      desc: locale === 'id'
        ? 'Workshop intensif langsung di kantor perusahaan Anda, fokus pada hands-on testing materi iklan dan audit funnel konversi.'
        : 'Dedicated on-site workshops focused on aggressive creative testing and landing page conversion diagnostics.',
      points: locale === 'id'
        ? ['Praktik langsung bawa laptop kerja', 'Bedah titik kebocoran conversion funnel', 'Framework script video iklan UGC']
        : ['Hands-on laptop execution in real-time', 'Identify attribution and funnel leaks', 'High-converting UGC video scriptwriting templates'],
    },
    {
      title: locale === 'id' ? 'Team Mentoring & Retainer' : 'Advisory Retainers',
      desc: locale === 'id'
        ? 'Pendampingan mingguan berkelanjutan bersama tim performa marketing Anda untuk memantau metrik dan scaling budget.'
        : 'Ongoing weekly mentorship assisting your marketing team in metric diagnostics and scaling execution.',
      points: locale === 'id'
        ? ['Review performa mingguan / bulanan', 'Second opinion strategi scaling & alokasi budget', 'Akses konsultasi langsung via group chat']
        : ['Weekly/monthly performance reviews', 'Objective second opinions on budget scaling', 'Direct asynchronous advisory via dedicated channels'],
    },
    {
      title: locale === 'id' ? 'Custom Program' : 'Custom Enterprise Programs',
      desc: locale === 'id'
        ? 'Perancangan kurikulum dan format pelatihan khusus yang disesuaikan penuh dengan target KPI dan skala tim Anda.'
        : 'Bespoke learning architectures constructed around your corporate KPIs, agency workflows, or enterprise needs.',
      points: locale === 'id'
        ? ['Fleksibilitas jadwal & format hybrid', 'Perjanjian kerahasiaan data (NDA)', 'Sertifikasi kompetensi tim']
        : ['Flexible scheduling & hybrid delivery', 'Non-disclosure data protection agreements', 'Team competency certifications'],
    },
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <Badge variant="brand">{localizedHero.eyebrow || (locale === 'id' ? 'Solusi Korporasi & In-House Team' : 'Corporate & In-House Solutions')}</Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-tight">
            {localizedHero.heading || (locale === 'id' ? 'Tingkatkan Kemampuan Tim Iklan Internal Perusahaan Anda.' : 'Build a Stronger In-House Advertising Team.')}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            {localizedHero.subheading || (
              locale === 'id'
                ? 'Kami membantu perusahaan membangun tim advertising internal yang mandiri, disiplin membaca data, dan efisien mengelola anggaran iklan untuk menghasilkan pertumbuhan yang dapat dipertanggungjawabkan.'
                : 'We partner with growing companies to build self-sufficient in-house performance marketing teams that manage ad spend efficiently and scale profitably.'
            )}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-dark-card border border-dark-border space-y-4 hover:border-gray-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{srv.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{srv.desc}</p>
              </div>

              <div className="pt-4 border-t border-dark-border space-y-2">
                {srv.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2.5 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand flex-shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Grid */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-surface border border-dark-border space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {locale === 'id' ? 'Mengapa Perusahaan Memilih Belajar Ads?' : 'Why Enterprise Teams Choose Belajar Ads'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              {locale === 'id'
                ? 'Fokus pada dampak komersial nyata, bukan sekadar teori akademis.'
                : 'Built for measurable commercial impact, moving beyond abstract theories.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
              <span className="text-brand font-bold text-sm">
                {locale === 'id' ? '01. Praktis & Teruji di Lapangan' : '01. Practical & Field-Tested'}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Materi diajarkan langsung oleh praktisi aktif yang mengelola belanja iklan miliaran rupiah setiap bulan.'
                  : 'Delivered exclusively by active media buyers managing high-volume commercial ad spend.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
              <span className="text-brand font-bold text-sm">
                {locale === 'id' ? '02. Kerahasiaan Data (NDA)' : '02. Data Confidentiality'}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Seluruh data campaign dan metrik internal akun Anda dilindungi dengan Non-Disclosure Agreement (NDA).'
                  : 'Your account data, customer lists, and financial metrics are secured under strict NDA protocols.'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-dark-card border border-dark-border space-y-2">
              <span className="text-brand font-bold text-sm">
                {locale === 'id' ? '03. Kapabilitas Mandiri Berkelanjutan' : '03. Sustainable Capability'}
              </span>
              <p className="text-xs text-gray-400 leading-relaxed">
                {locale === 'id'
                  ? 'Membantu tim Anda mandiri sehingga tidak bergantung selamanya pada agensi pihak ketiga.'
                  : 'Equipping your in-house squad with repeatable SOPs to eliminate third-party dependencies.'}
              </p>
            </div>
          </div>
        </div>

        {/* Lead Inquiry Form */}
        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-dark-card border border-dark-border space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              {locale === 'id' ? 'Konsultasikan Kebutuhan Tim Anda' : 'Request Corporate Training Consultation'}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {locale === 'id'
                ? 'Isi formulir di bawah ini untuk mendiskusikan silabus, estimasi jadwal, dan format pelatihan yang paling tepat bagi perusahaan Anda.'
                : 'Complete the brief intake form below to discuss custom syllabus frameworks and corporate arrangements.'}
            </p>
          </div>

          <BusinessInquiryForm />
        </div>
      </div>
    </div>
  );
}
