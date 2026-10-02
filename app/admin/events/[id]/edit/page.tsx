'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Save, Loader2 } from 'lucide-react';

interface EditEventPageProps {
  params: { id: string };
}

export default function EditEventPage({ params }: EditEventPageProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'WORKSHOP',
    date: '',
    time: '',
    location: '',
    isOnline: true,
    speaker: '',
    speakerRole: '',
    description: '',
    agenda: '',
    whatYouWillLearn: '',
    whoShouldAttend: '',
    price: '',
    registrationUrl: '',
    capacity: '',
    status: 'UPCOMING',
    eventImage: '',
    locale: 'id',
  });

  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/admin/events/${params.id}`);
        if (!res.ok) throw new Error('Event tidak ditemukan.');
        const data = await res.json();
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || 'WORKSHOP',
          date: data.date || '',
          time: data.time || '',
          location: data.location || '',
          isOnline: Boolean(data.isOnline),
          speaker: data.speaker || '',
          speakerRole: data.speakerRole || '',
          description: data.description || '',
          agenda: typeof data.agenda === 'string' ? data.agenda : JSON.stringify(data.agenda || []),
          whatYouWillLearn: typeof data.whatYouWillLearn === 'string' ? data.whatYouWillLearn : JSON.stringify(data.whatYouWillLearn || []),
          whoShouldAttend: data.whoShouldAttend || '',
          price: data.price || '',
          registrationUrl: data.registrationUrl || '',
          capacity: data.capacity || '',
          status: data.status || 'UPCOMING',
          eventImage: data.eventImage || '',
          locale: data.locale || 'id',
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Gagal memuat.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchEvent();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/admin/events/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal update.');

      router.push('/admin/events');
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
        <span>Memuat data event...</span>
      </div>
    );
  }

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
            <h1 className="text-xl font-bold text-white">Edit Event</h1>
            <p className="text-xs text-gray-400">Perbarui tanggal, pembicara, atau link registrasi.</p>
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
              Judul Event *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
              type="text"
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
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs leading-relaxed focus:outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Role Pembicara (Speaker Role)
            </label>
            <input
              type="text"
              value={formData.speakerRole}
              onChange={(e) => setFormData({ ...formData, speakerRole: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              URL Gambar Event (Poster / Banner)
            </label>
            <input
              type="url"
              value={formData.eventImage}
              onChange={(e) => setFormData({ ...formData, eventImage: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Biaya / Investasi
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
              Kapasitas Peserta
            </label>
            <input
              type="text"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              placeholder="e.g. 100 Peserta / Terbatas"
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

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            Siapa yang Sebaiknya Hadir (Target Audience)
          </label>
          <input
            type="text"
            value={formData.whoShouldAttend}
            onChange={(e) => setFormData({ ...formData, whoShouldAttend: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Agenda Event (JSON Array format)
            </label>
            <textarea
              rows={3}
              value={formData.agenda}
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              placeholder='["Sesi 1: Teardown", "Sesi 2: Q&A"]'
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Yang Akan Dipelajari (JSON Array format)
            </label>
            <textarea
              rows={3}
              value={formData.whatYouWillLearn}
              onChange={(e) => setFormData({ ...formData, whatYouWillLearn: e.target.value })}
              placeholder='["Poin 1", "Poin 2"]'
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
