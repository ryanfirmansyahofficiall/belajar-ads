'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Article } from '@prisma/client';
import { Plus, Search, Edit3, Trash2, Eye, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/articles');
      const data = await res.json();
      if (Array.isArray(data)) setArticles(data);
    } catch (e) {
      console.error('Fetch error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const togglePublish = async (article: Article) => {
    try {
      setActionLoading(article.id);
      await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !article.isPublished }),
      });
      await fetchArticles();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) return;
    try {
      setActionLoading(id);
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' });
      await fetchArticles();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = articles.filter((a) => {
    const titleMatch = (a.titleId || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.titleEn || '').toLowerCase().includes(search.toLowerCase());
    const slugMatch = a.slug.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter ? a.category === categoryFilter : true;
    return (titleMatch || slugMatch) && matchCategory;
  });

  const categories = Array.from(new Set(articles.map((a) => a.category))).filter(Boolean);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Article Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Tulis, sunting, jadwalkan draft, dan publikasikan artikel edukasi Belajar Ads.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Artikel Baru</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul artikel atau slug..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-56 px-3 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
        >
          <option value="">Semua Kategori</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] overflow-x-auto">
        {loading ? (
          <div className="py-12 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat data artikel...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-semibold">
                <th className="pb-3">Judul & Slug</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Bilingual</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Penulis</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {filtered.length > 0 ? (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4 max-w-sm">
                      <div className="font-bold text-white text-sm line-clamp-1">{item.titleId}</div>
                      {item.titleEn && item.titleEn !== item.titleId && (
                        <div className="text-xs text-gray-400 line-clamp-1 italic">
                          EN: {item.titleEn}
                        </div>
                      )}
                      <div className="text-[11px] text-gray-500 font-mono line-clamp-1 mt-0.5">
                        /resources/articles/{item.slug}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-[#181C22] border border-[#252A34] text-[10px] text-gray-300">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-brand/10 border border-brand/20 text-[10px] font-semibold text-brand">
                        ID + EN
                      </span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <button
                        onClick={() => togglePublish(item)}
                        disabled={actionLoading === item.id}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold transition-all ${
                          item.isPublished
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25'
                        }`}
                        title="Klik untuk ubah status publish"
                      >
                        {item.isPublished ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>PUBLISHED</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>DRAFT</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 pr-4 text-gray-400">{item.author}</td>
                    <td className="py-3.5 text-right whitespace-nowrap space-x-2">
                      <Link
                        href={`/resources/articles/${item.slug}`}
                        target="_blank"
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Lihat Halaman Publik"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/articles/${item.id}/edit`}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-brand hover:text-brand-hover hover:bg-white/10 transition-colors"
                        title="Edit Artikel"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={actionLoading === item.id}
                        className="inline-flex items-center p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10 transition-colors"
                        title="Hapus Artikel"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Tidak ada artikel yang sesuai pencarian.
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
