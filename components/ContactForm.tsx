'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { CheckCircle2, Send, Loader2 } from 'lucide-react';

interface ContactFormProps {
  locale?: string;
}

export function ContactForm({ locale: propLocale }: ContactFormProps) {
  const { locale } = useLanguage();
  const lang = propLocale || locale;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
          trainingNeeds: formData.subject,
          message: formData.message,
          source: 'CONTACT_FORM',
        }),
      });

      if (!res.ok) {
        throw new Error(
          lang === 'id'
            ? 'Gagal mengirim pesan. Silakan coba beberapa saat lagi.'
            : 'Failed to send message. Please try again later.'
        );
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : lang === 'id'
          ? 'Terjadi kesalahan sistem.'
          : 'A system error occurred.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-dark-card border border-brand/40 text-center space-y-4 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white">
          {lang === 'id' ? 'Pesan Berhasil Dikirim' : 'Message Sent Successfully'}
        </h3>
        <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          {lang === 'id'
            ? 'Terima kasih telah menghubungi Belajar Ads. Tim kami akan segera merespons pertanyaan Anda melalui WhatsApp atau Email.'
            : 'Thank you for reaching out to Belajar Ads. Our team will get back to you via WhatsApp or Email shortly.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-dark-card border border-dark-border space-y-5">
      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 tracking-tight">
        {lang === 'id' ? 'Kirim Pesan Langsung' : 'Send Direct Message'}
      </h3>

      {error && (
        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          {lang === 'id' ? 'Nama Lengkap *' : 'Full Name *'}
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder={lang === 'id' ? 'Nama Anda' : 'Your Name'}
          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-white text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {lang === 'id' ? 'Email *' : 'Email Address *'}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="nama@email.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-white text-sm focus:outline-none focus:border-brand transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5">
            {lang === 'id' ? 'Nomor WhatsApp *' : 'WhatsApp Number *'}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="0812xxxxxxxx"
            className="w-full px-3.5 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-white text-sm focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          {lang === 'id' ? 'Topik Pertanyaan / Subjek' : 'Subject / Inquiries'}
        </label>
        <input
          type="text"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder={
            lang === 'id'
              ? 'Pertanyaan seputar program bootcamp / konsultasi privat'
              : 'Questions regarding training programs / private coaching'
          }
          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-white text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1.5">
          {lang === 'id' ? 'Pesan / Pertanyaan Anda *' : 'Your Message *'}
        </label>
        <textarea
          rows={4}
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder={
            lang === 'id'
              ? 'Tuliskan pertanyaan atau kebutuhan Anda secara detail...'
              : 'Describe your questions, requirements, or goals in detail...'
          }
          className="w-full px-3.5 py-2.5 rounded-lg bg-dark-surface border border-dark-border text-white text-sm focus:outline-none focus:border-brand transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-bold glow-orange transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>{lang === 'id' ? 'Mengirim...' : 'Sending...'}</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            <span>{lang === 'id' ? 'Kirim Pesan' : 'Send Message'}</span>
          </>
        )}
      </button>
    </form>
  );
}
