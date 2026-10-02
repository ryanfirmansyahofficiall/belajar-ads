'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';

export function BusinessInquiryForm() {
  const { locale } = useLanguage();
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    participants: '',
    trainingNeeds: '',
    preferredDate: '',
    isOnline: 'true',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          participants: formData.participants,
          trainingNeeds: formData.trainingNeeds,
          preferredDate: formData.preferredDate,
          isOnline: formData.isOnline === 'true',
          message: formData.message,
          source: 'BUSINESS_INQUIRY',
        }),
      });

      if (!res.ok) {
        throw new Error(
          locale === 'id'
            ? 'Gagal mengirimkan formulir. Silakan coba beberapa saat lagi.'
            : 'Failed to submit inquiry. Please try again shortly.'
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : locale === 'id'
          ? 'Terjadi kendala sistem.'
          : 'A system issue occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">
            {locale === 'id' ? 'Permintaan Terkirim' : 'Inquiry Submitted'}
          </h3>
          <p className="text-xs text-gray-300 max-w-sm mx-auto">
            {locale === 'id'
              ? 'Terima kasih telah menghubungi Belajar Ads. Tim corporate training kami akan menghubungi Anda dalam waktu 1x24 jam kerja.'
              : 'Thank you for reaching out. Our enterprise advisory team will respond within 24 business hours.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Nama Perusahaan / Brand *' : 'Company / Brand Name *'}
          </label>
          <input
            type="text"
            required
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            placeholder="PT Maju Retail Nusantara"
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Nama Kontak Person *' : 'Contact Person Name *'}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ahmad Fauzi"
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Email Kantor / Bisnis *' : 'Corporate Email Address *'}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="ahmad@perusahaan.co.id"
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Nomor WhatsApp Aktif *' : 'WhatsApp Number *'}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="081234567890"
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Estimasi Jumlah Peserta' : 'Estimated Participants'}
          </label>
          <select
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs focus:outline-none focus:border-brand transition-colors"
          >
            <option value="">{locale === 'id' ? 'Pilih kisaran' : 'Select range'}</option>
            <option value="1-5">{locale === 'id' ? '1 - 5 orang' : '1 - 5 participants'}</option>
            <option value="6-15">{locale === 'id' ? '6 - 15 orang' : '6 - 15 participants'}</option>
            <option value="16-30">{locale === 'id' ? '16 - 30 orang' : '16 - 30 participants'}</option>
            <option value=">30">{locale === 'id' ? '> 30 orang' : '> 30 participants'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {locale === 'id' ? 'Format Pelatihan Pilihan' : 'Preferred Format'}
          </label>
          <select
            value={formData.isOnline}
            onChange={(e) => setFormData({ ...formData, isOnline: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs focus:outline-none focus:border-brand transition-colors"
          >
            <option value="true">{locale === 'id' ? 'Online via Zoom' : 'Virtual via Zoom'}</option>
            <option value="false">{locale === 'id' ? 'In-House / Di Kantor Perusahaan' : 'On-Site / At Client Office'}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          {locale === 'id' ? 'Kebutuhan / Target Pelatihan Tim *' : 'Team Training Objectives *'}
        </label>
        <textarea
          rows={3}
          required
          value={formData.trainingNeeds}
          onChange={(e) => setFormData({ ...formData, trainingNeeds: e.target.value })}
          placeholder={
            locale === 'id'
              ? 'Contoh: Meningkatkan skill media buying tim in-house, audit akun iklan produk baru, standarisasi SOP creative testing.'
              : 'E.g., Upskill in-house media buyers, audit ad spend on new product lines, build creative testing SOPs.'
          }
          className="w-full px-3.5 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-white text-xs placeholder-gray-500 focus:outline-none focus:border-brand transition-colors leading-relaxed"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white font-bold text-xs glow-orange-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{locale === 'id' ? 'Kirimkan Permintaan Proposal' : 'Submit Training Inquiry'}</span>
          </>
        )}
      </button>
    </form>
  );
}
