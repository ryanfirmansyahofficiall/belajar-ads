import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';
import { 
  FileText, 
  Layers, 
  Calendar, 
  Inbox, 
  Users, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  const [
    totalArticles,
    publishedArticles,
    draftArticles,
    totalPrograms,
    upcomingEvents,
    newLeads,
    recentLeads,
  ] = await Promise.all([
    prisma.article.count(),
    prisma.article.count({ where: { isPublished: true } }),
    prisma.article.count({ where: { isPublished: false } }),
    prisma.program.count(),
    prisma.event.count({ where: { status: 'UPCOMING' } }),
    prisma.lead.count({ where: { status: 'NEW' } }),
    prisma.lead.findMany({ take: 5, orderBy: { createdAt: 'desc' } }),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Dashboard Top Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Status sistem Belajar Ads, konten publikasi, dan lead prospek terbaru.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white text-xs font-semibold glow-orange-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Article</span>
          </Link>

          <Link
            href="/admin/programs/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181C22] hover:bg-[#20252D] text-gray-200 border border-[#262C38] text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Program</span>
          </Link>

          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#181C22] hover:bg-[#20252D] text-gray-200 border border-[#262C38] text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Event</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Articles</span>
            <FileText className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-white">{totalArticles}</div>
          <div className="text-[11px] text-gray-400 flex items-center gap-2">
            <span className="text-emerald-400">{publishedArticles} Published</span>
            <span>•</span>
            <span className="text-amber-400">{draftArticles} Draft</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Programs</span>
            <Layers className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-white">{totalPrograms}</div>
          <div className="text-[11px] text-gray-400">
            Cohort, E-Course & Workshop
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>Upcoming Events</span>
            <Calendar className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-white">{upcomingEvents}</div>
          <div className="text-[11px] text-emerald-400">
            Siap pendaftaran peserta
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <span>New Leads & Inquiries</span>
            <Inbox className="w-4 h-4 text-brand" />
          </div>
          <div className="text-3xl font-black text-white">{newLeads}</div>
          <div className="text-[11px] text-brand">
            Perlu tindak lanjut tim
          </div>
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Lead & Inquiry Terbaru</h2>
            <p className="text-xs text-gray-400">Pesan dari Contact Form dan permintaan Corporate Training</p>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-brand hover:text-brand-hover inline-flex items-center gap-1"
          >
            <span>Kelola Semua Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-medium">
                <th className="pb-3">Nama</th>
                <th className="pb-3">Kontak</th>
                <th className="pb-3">Sumber</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">
                      {lead.name}
                      {lead.company && <span className="block text-[10px] text-gray-400">{lead.company}</span>}
                    </td>
                    <td className="py-3">
                      <div>{lead.email}</div>
                      <div className="text-gray-500 font-mono text-[11px]">{lead.phone}</div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-[#181C22] border border-[#252A34] text-[10px]">
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded bg-brand/15 text-brand font-semibold text-[10px]">
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3 text-right text-gray-500 font-mono">
                      {new Date(lead.createdAt).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Belum ada lead baru yang masuk.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
