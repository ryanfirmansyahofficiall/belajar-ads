'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'WORKSHOP',
    date: '2026-11-10',
    time: '19:30 - 21:30 WIB',
    location: 'Live Zoom Meeting',
    isOnline: true,
    speaker: 'Rian Pratama',
    speakerRole: 'Head of Performance Marketing',
    description: '',
    agenda: '[\"Penyebab umum fatigue iklan\", \"Struktur CBO vs ABO\", \"Live Q&A\"]',
    whatYouWillLearn: '[\"Framework testing 10+ variasi hook\", \"Breakdown audience & placement\"]',
    whoShouldAttend: 'Advertiser, business owner, dan media buyer.',
    price: 'Free / Community',
    registrationUrl: '',
    capacity: '100 Peserta',
    status: 'UPCOMING',
    locale: 'id',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === '' || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan event.');

      router.push('/admin/events');
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kendala.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex items-center justify-between border-b border-[#1F232B] pb-5">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/events"
            className="p-2 rounded-lg bg-[#101216] border border-[#1F232B] text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white">Create New Event</h1>
            <p className="text-xs text-gray-400">Jadwalkan sesi workshop, clinic, atau meetup baru.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-xs font-bold text-white glow-orange-sm transition-all flex items-center gap-1.5 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>Simpan Event</span>
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
              Judul Event *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Contoh: Meta Ads Creative & Hook Teardown Workshop"
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
              placeholder="creative-hook-teardown-workshop"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Kategori Event
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            >
              <option value="WORKSHOP">Workshop</option>
              <option value="ADS_CLINIC">Ads Clinic</option>
              <option value="MEETUP">Community Meetup</option>
              <option value="WEBINAR">Webinar</option>
              <option value="TRAINING">Special Training</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Tanggal Event *
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Waktu / Jam
            </label>
            <input
              type="text"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              placeholder="19:30 - 21:30 WIB"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Lokasi / Platform
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Online via Zoom / Jakarta"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Pembicara (Speaker)
            </label>
            <input
              type="text"
              value={formData.speaker}
              onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
              placeholder="Dimas Setiawan"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Status Event
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            >
              <option value="UPCOMING">UPCOMING</option>
              <option value="OPEN">OPEN (Registrasi Buka)</option>
              <option value="SOLD_OUT">SOLD_OUT</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Deskripsi Event *
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Jelaskan topik yang akan dibedah pada event ini..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs leading-relaxed focus:outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Biaya / Investasi
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Free / Community atau Rp 150.000"
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
              placeholder="https://event-registration.com/..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
