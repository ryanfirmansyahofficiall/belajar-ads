'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Program } from '@prisma/client';
import { Plus, Search, Edit3, Trash2, Eye, Loader2 } from 'lucide-react';

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/programs');
      const data = await res.json();
      if (Array.isArray(data)) setPrograms(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus program ini?')) return;
    try {
      setActionLoading(id);
      await fetch(`/api/admin/programs/${id}`, { method: 'DELETE' });
      await fetchPrograms();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = programs.filter((p) => {
    const nameMatch = (p.nameId || (p as any).name || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.nameEn || '').toLowerCase().includes(search.toLowerCase());
    const slugMatch = p.slug.toLowerCase().includes(search.toLowerCase());
    const catMatch = p.category.toLowerCase().includes(search.toLowerCase());
    return nameMatch || slugMatch || catMatch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Program Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola katalog program belajar: E-Course, Live Training, Workshop, Private Mentoring, dan Corporate.
          </p>
        </div>

        <Link
          href="/admin/programs/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Program Baru</span>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama program, kategori, atau topik..."
          className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
        />
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] overflow-x-auto">
        {loading ? (
          <div className="py-12 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat data program...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-semibold">
                <th className="pb-3">Program Name & Slug</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Format</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Harga / Info</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4 max-w-xs">
                      <div className="font-bold text-white text-sm line-clamp-1">{item.nameId || (item as any).name}</div>
                      {item.nameEn && item.nameEn !== item.nameId && (
                        <div className="text-xs text-gray-400 italic line-clamp-1">EN: {item.nameEn}</div>
                      )}
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">/{item.slug}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-brand/15 text-brand text-[10px] font-bold">
                        {item.category.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-gray-400">
                      {item.format} ({item.level})
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-[#181C22] border border-[#252A34] text-[10px] text-gray-300">
                        {item.registrationStatus}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-semibold text-white">
                      {item.price || 'Info Detail'}
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/admin/programs/${item.id}/edit`}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-brand hover:text-brand-hover hover:bg-white/10 transition-colors"
                        title="Edit Program"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={actionLoading === item.id}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
                        title="Hapus Program"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Tidak ada program yang sesuai.
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
