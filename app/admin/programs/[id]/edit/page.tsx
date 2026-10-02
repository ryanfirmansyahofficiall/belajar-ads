'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';

interface EditProgramPageProps {
  params: { id: string };
}

export default function EditProgramPage({ params }: EditProgramPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: '',
    topic: '',
    description: '',
    level: '',
    format: '',
    duration: '',
    price: '',
    instructor: '',
    startDate: '',
    registrationStatus: 'AVAILABLE',
    featuredImage: '',
    ctaText: '',
    registrationUrl: '',
    isFeatured: false,
    locale: 'id',
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await fetch(`/api/admin/programs/${params.id}`);
        if (!res.ok) throw new Error('Program tidak ditemukan.');
        const data = await res.json();
        setFormData({
          name: data.name || '',
          slug: data.slug || '',
          category: data.category || 'TRAINING',
          topic: data.topic || 'Meta Ads',
          description: data.description || '',
          level: data.level || 'All Levels',
          format: data.format || 'Online',
          duration: data.duration || '',
          price: data.price || '',
          instructor: data.instructor || '',
          startDate: data.startDate || '',
          registrationStatus: data.registrationStatus || 'AVAILABLE',
          featuredImage: data.featuredImage || '',
          ctaText: data.ctaText || 'Register Now',
          registrationUrl: data.registrationUrl || '',
          isFeatured: Boolean(data.isFeatured),
          locale: data.locale || 'id',
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Gagal memuat.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProgram();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/programs/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal update.');

      router.push('/admin/programs');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kendala.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="py-20 flex items-center justify-center text-xs text-gray-400 gap-2">
        <Loader2 className="w-4 h-4 animate-spin text-brand" />
        <span>Memuat data program...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center justify-between border-b border-[#1F232B] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/programs"
            className="p-2 rounded-lg bg-[#101216] border border-[#1F232B] text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Edit Program</h1>
            <p className="text-xs text-gray-400">Sunting detail kurikulum, harga, atau status pendaftaran.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-xs font-bold text-white glow-orange-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Simpan Perubahan</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Nama Program *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-sm focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Kategori Program
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            >
              <option value="TRAINING">Live Training</option>
              <option value="ECOURSE">E-Course</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="PRIVATE_MENTORING">Private Mentoring</option>
              <option value="COMPANY_TRAINING">Company Training</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Topik Pembelajaran
            </label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Status Registrasi
            </label>
            <select
              value={formData.registrationStatus}
              onChange={(e) => setFormData({ ...formData, registrationStatus: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            >
              <option value="AVAILABLE">AVAILABLE (Tersedia)</option>
              <option value="COMING_SOON">COMING_SOON</option>
              <option value="SOLD_OUT">SOLD_OUT</option>
              <option value="CLOSED">CLOSED</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Level Target
            </label>
            <input
              type="text"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Format Belajar
            </label>
            <input
              type="text"
              value={formData.format}
              onChange={(e) => setFormData({ ...formData, format: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Durasi Program
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Harga / Investasi Display
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Instructor / Mentor
            </label>
            <input
              type="text"
              value={formData.instructor}
              onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Jadwal / Batch
            </label>
            <input
              type="text"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Deskripsi Program *
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs leading-relaxed focus:outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Teks Tombol CTA
            </label>
            <input
              type="text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              External Registration URL (Opsional)
            </label>
            <input
              type="url"
              value={formData.registrationUrl}
              onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="rounded bg-[#161920] border-gray-700 text-brand focus:ring-0"
            />
            <span>Tampilkan sebagai Featured Program di Beranda</span>
          </label>
        </div>
      </form>
    </div>
  );
}
