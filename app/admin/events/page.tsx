'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Event } from '@prisma/client';
import { Plus, Search, Edit3, Trash2, Calendar, MapPin, Loader2, Eye } from 'lucide-react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/events');
      const data = await res.json();
      if (Array.isArray(data)) setEvents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus event ini?')) return;
    try {
      setActionLoading(id);
      await fetch(`/api/admin/events/${id}`, { method: 'DELETE' });
      await fetchEvents();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = events.filter((e) => {
    const titleMatch = (e.titleId || (e as any).title || '').toLowerCase().includes(search.toLowerCase()) ||
      (e.titleEn || '').toLowerCase().includes(search.toLowerCase());
    const slugMatch = e.slug.toLowerCase().includes(search.toLowerCase());
    const speakerMatch = e.speaker.toLowerCase().includes(search.toLowerCase());
    return titleMatch || slugMatch || speakerMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Event Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola jadwal workshop, meetup komunitas, webinar, dan klinik iklan langsung.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Event Baru</span>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari judul event, pembicara, atau kategori..."
          className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
        />
      </div>

      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] overflow-x-auto">
        {loading ? (
          <div className="py-12 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat data event...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-semibold">
                <th className="pb-3">Judul Event & Slug</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Tanggal & Waktu</th>
                <th className="pb-3">Lokasi / Speaker</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4 max-w-xs">
                      <div className="font-bold text-white text-sm line-clamp-1">{item.titleId || (item as any).title}</div>
                      {item.titleEn && item.titleEn !== item.titleId && (
                        <div className="text-xs text-gray-400 italic line-clamp-1">EN: {item.titleEn}</div>
                      )}
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">/events/{item.slug}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-brand/15 text-brand text-[10px] font-bold">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="text-white font-medium">{item.date}</div>
                      <div className="text-[11px] text-gray-400">{item.time || '19:30 WIB'}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="text-gray-200">{item.speaker}</div>
                      <div className="text-[11px] text-gray-400">{item.location}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-[#181C22] border border-[#252A34] text-[10px] text-gray-300">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/events/${item.slug}`}
                        target="_blank"
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/events/${item.id}/edit`}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-brand hover:text-brand-hover hover:bg-white/10 transition-colors"
                        title="Edit Event"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={actionLoading === item.id}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
                        title="Hapus Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Tidak ada event yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
