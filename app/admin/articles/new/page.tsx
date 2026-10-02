'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Globe, Loader2, Sparkles } from 'lucide-react';

export default function NewArticlePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    slug: '',
    excerptId: '',
    excerptEn: '',
    contentId: '',
    contentEn: '',
    category: 'Meta Ads Fundamental',
    tags: 'Meta Ads, Strategy, Media Buying',
    author: 'Belajar Ads Team',
    readingTime: '5 min read',
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    metaTitleId: '',
    metaTitleEn: '',
    metaDescId: '',
    metaDescEn: '',
  });

  const [activeLangTab, setActiveLangTab] = useState<'id' | 'en'>('id');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto generate slug from titleId
  const handleTitleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const titleId = e.target.value;
    const autoSlug = titleId
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      titleId,
      slug: prev.slug === '' || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
      metaTitleId: titleId ? `${titleId} | Belajar Ads` : '',
    }));
  };

  const handleSubmit = async (publishState: boolean) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isPublished: publishState,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gagal menyimpan artikel.');
      }

      router.push('/admin/articles');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kendala saat menyimpan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1F232B] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/articles"
            className="p-2 rounded-lg bg-[#101216] border border-[#1F232B] text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Buat Artikel Baru (Bilingual)</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Tulis konten dalam Bahasa Indonesia dan English untuk pengalaman pembaca global.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2 rounded-xl bg-[#16181D] hover:bg-[#20242D] border border-[#262B35] text-gray-300 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            Simpan Draft
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => handleSubmit(true)}
            className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Publikasikan</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {error}
        </div>
      )}

      {/* Language Switch Tabs for Content */}
      <div className="flex items-center justify-between border-b border-[#1F232B] pb-2">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Pilih Bahasa yang Diedit:
        </span>
        <div className="flex items-center bg-[#101216] border border-[#1F232B] rounded-xl p-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveLangTab('id')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
              activeLangTab === 'id' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🇮🇩 Indonesian (ID)
          </button>
          <button
            type="button"
            onClick={() => setActiveLangTab('en')}
            className={`px-4 py-1.5 rounded-lg font-bold transition-colors ${
              activeLangTab === 'en' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🇬🇧 English (EN)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Indonesian Content */}
        {activeLangTab === 'id' && (
          <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span>Konten Bahasa Indonesia (ID)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Judul Artikel (ID) *
              </label>
              <input
                type="text"
                required
                value={formData.titleId}
                onChange={handleTitleIdChange}
                placeholder="Contoh: Panduan Lengkap Meta Conversions API 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Ringkasan / Excerpt (ID) *
              </label>
              <textarea
                rows={2}
                required
                value={formData.excerptId}
                onChange={(e) => setFormData({ ...formData, excerptId: e.target.value })}
                placeholder="Ringkasan singkat artikel dalam 1-2 kalimat..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Isi Artikel Lengkap (ID) *
              </label>
              <textarea
                rows={10}
                required
                value={formData.contentId}
                onChange={(e) => setFormData({ ...formData, contentId: e.target.value })}
                placeholder="Tulis artikel lengkap di sini (mendukung Markdown: ## Heading, 1. List)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        )}

        {/* English Content */}
        {activeLangTab === 'en' && (
          <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-4 animate-fade-in">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>English Content (EN)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Article Title (EN) *
              </label>
              <input
                type="text"
                value={formData.titleEn}
                onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                placeholder="e.g. Complete Meta Conversions API Guide 2026"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Excerpt (EN) *
              </label>
              <textarea
                rows={2}
                value={formData.excerptEn}
                onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                placeholder="Concise summary of the article in 1-2 sentences..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Full Article Content (EN) *
              </label>
              <textarea
                rows={10}
                value={formData.contentEn}
                onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                placeholder="Full article content in English (Markdown supported: ## Heading, 1. List)..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        )}

        {/* Global Metadata (Slug, Category, Author, Featured Image) */}
        <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-4">
          <h3 className="text-sm font-bold text-white">Metadata & Konfigurasi</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Canonical URL Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="panduan-meta-conversions-api"
                className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
              <span className="text-[10px] text-gray-500 mt-1 block">
                Public URL: /resources/articles/{formData.slug || 'slug'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Kategori *
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="Meta Ads, Creative, Strategy"
                className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Penulis
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Reading Time
              </label>
              <input
                type="text"
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Tags (koma dipisah)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.featuredImage}
              onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
