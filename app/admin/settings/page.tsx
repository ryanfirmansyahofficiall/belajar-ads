'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Save, Loader2, CheckCircle2, ShieldCheck, Globe, Lock } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    COMMUNITY_URL: '',
    WHATSAPP_URL: '',
    INSTAGRAM_URL: '',
    FACEBOOK_URL: '',
    YOUTUBE_URL: '',
    LMS_URL: '',
    EMAIL_CONTACT: 'contact@belajarads.com',
    NEXT_PUBLIC_GA_ID: '',
    NEXT_PUBLIC_META_PIXEL_ID: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/admin/settings');
        const data = await res.json();
        setSettings((prev) => ({ ...prev, ...data }));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedNotice(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 4000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            System & Integration Settings
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Konfigurasi terpusat untuk external URLs, tracking analitik, dan saluran komunikasi resmi Belajar Ads.
          </p>
        </div>
        <Link
          href="/admin/settings/security"
          className="px-4 py-2 rounded-xl bg-[#16181D] hover:bg-[#20242D] border border-[#262B35] text-white text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
        >
          <Lock className="w-3.5 h-3.5 text-brand" />
          <span>Security & Password</span>
        </Link>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Pengaturan berhasil disimpan dan langsung aktif di seluruh sistem.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: External Platform Integrations */}
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-brand" />
              <span>External Platform & Community Links</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              URL yang digunakan oleh tombol CTA pada website publik (tanpa hardcode di source code).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Community URL (Discord / Telegram / Circle)
              </label>
              <input
                type="text"
                value={settings.COMMUNITY_URL}
                onChange={(e) => setSettings({ ...settings, COMMUNITY_URL: e.target.value })}
                placeholder="https://chat.whatsapp.com/... atau https://discord.gg/..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                WhatsApp Official URL
              </label>
              <input
                type="text"
                value={settings.WHATSAPP_URL}
                onChange={(e) => setSettings({ ...settings, WHATSAPP_URL: e.target.value })}
                placeholder="https://wa.me/6281234567890?text=Halo%20Belajar%20Ads"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                LMS / Course Player URL
              </label>
              <input
                type="text"
                value={settings.LMS_URL}
                onChange={(e) => setSettings({ ...settings, LMS_URL: e.target.value })}
                placeholder="https://course.belajarads.com/..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Email Kontak Resmi
              </label>
              <input
                type="email"
                value={settings.EMAIL_CONTACT}
                onChange={(e) => setSettings({ ...settings, EMAIL_CONTACT: e.target.value })}
                placeholder="contact@belajarads.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Media URLs */}
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-5">
          <div>
            <h2 className="text-base font-bold text-white">Social Media Channels</h2>
            <p className="text-xs text-gray-400 mt-0.5">Tautan akun media sosial yang ditampilkan di footer.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Instagram URL</label>
              <input
                type="text"
                value={settings.INSTAGRAM_URL}
                onChange={(e) => setSettings({ ...settings, INSTAGRAM_URL: e.target.value })}
                placeholder="https://instagram.com/belajarads"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Facebook URL</label>
              <input
                type="text"
                value={settings.FACEBOOK_URL}
                onChange={(e) => setSettings({ ...settings, FACEBOOK_URL: e.target.value })}
                placeholder="https://facebook.com/belajarads"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">YouTube URL</label>
              <input
                type="text"
                value={settings.YOUTUBE_URL}
                onChange={(e) => setSettings({ ...settings, YOUTUBE_URL: e.target.value })}
                placeholder="https://youtube.com/@belajarads"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Analytics & Pixel Tracking */}
        <div className="p-8 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-5">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand" />
              <span>Analytics & Pixel Tracking</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Jika dikosongkan, script pelacak tidak akan dieksekusi di browser pengunjung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Google Analytics Measurement ID (G-XXXXX)
              </label>
              <input
                type="text"
                value={settings.NEXT_PUBLIC_GA_ID}
                onChange={(e) => setSettings({ ...settings, NEXT_PUBLIC_GA_ID: e.target.value })}
                placeholder="G-ABC123XYZ"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Meta Pixel ID (15-16 digit angka)
              </label>
              <input
                type="text"
                value={settings.NEXT_PUBLIC_META_PIXEL_ID}
                onChange={(e) => setSettings({ ...settings, NEXT_PUBLIC_META_PIXEL_ID: e.target.value })}
                placeholder="123456789012345"
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Simpan Semua Pengaturan</span>
          </button>
        </div>
      </form>
    </div>
  );
}
