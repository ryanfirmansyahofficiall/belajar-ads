'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Mentor } from '@prisma/client';
import { Plus, Edit3, Trash2, Loader2, X, Users, Globe } from 'lucide-react';

export default function AdminMentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    roleId: '',
    roleEn: '',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bioId: '',
    bioEn: '',
    expertiseId: '',
    expertiseEn: '',
    socialUrl: '',
    order: 1,
  });

  const fetchMentors = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/mentors');
      const data = await res.json();
      if (Array.isArray(data)) setMentors(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      name: '',
      roleId: '',
      roleEn: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      bioId: '',
      bioEn: '',
      expertiseId: '',
      expertiseEn: '',
      socialUrl: '',
      order: mentors.length + 1,
    });
    setShowModal(true);
  };

  const openEditModal = (item: Mentor) => {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      roleId: item.roleId,
      roleEn: item.roleEn || '',
      photo: item.photo || '',
      bioId: item.bioId,
      bioEn: item.bioEn || '',
      expertiseId: item.expertiseId,
      expertiseEn: item.expertiseEn || '',
      socialUrl: item.socialUrl || '',
      order: item.order,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`/api/admin/mentors/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/admin/mentors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setShowModal(false);
      await fetchMentors();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus profil mentor ini?')) return;
    try {
      setActionLoading(id);
      await fetch(`/api/admin/mentors/${id}`, { method: 'DELETE' });
      await fetchMentors();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mentor & Practitioner Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola profil mentor, instruktur, dan praktisi industri Belajar Ads (Bilingual ID & EN).
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Mentor Baru</span>
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 py-16 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat data mentor...</span>
          </div>
        ) : mentors.length > 0 ? (
          mentors.map((m) => (
            <div
              key={m.id}
              className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] space-y-4 flex flex-col justify-between hover:border-gray-700 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-dark-surface border border-[#1F232B] flex-shrink-0">
                  {m.photo ? (
                    <Image src={m.photo} alt={m.name} fill unoptimized className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 font-bold text-xs">
                      {m.name.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{m.name}</h3>
                  <div className="text-xs text-brand font-medium">{m.roleId}</div>
                  {m.roleEn && m.roleEn !== m.roleId && (
                    <div className="text-[11px] text-gray-400 italic">EN: {m.roleEn}</div>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed flex-1">{m.bioId}</p>

              <div className="pt-3 border-t border-[#1F232B] flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-400 truncate max-w-[160px]">
                  {m.expertiseId}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(m)}
                    className="p-1.5 rounded-lg bg-[#181C22] text-brand hover:text-brand-hover hover:bg-white/10"
                    title="Edit Profil"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={actionLoading === m.id}
                    className="p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10"
                    title="Hapus Profil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 p-12 text-center rounded-2xl bg-[#101216] border border-[#1F232B] text-gray-500">
            Belum ada profil mentor yang ditambahkan.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#101216] border border-[#1F232B] rounded-2xl p-6 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1F232B] pb-3">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Profil Mentor (Bilingual)' : 'Tambah Profil Mentor (Bilingual)'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Peran (ID) *</label>
                  <input
                    type="text"
                    required
                    value={formData.roleId}
                    onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                    placeholder="Head of Performance Marketing"
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Role (EN)</label>
                  <input
                    type="text"
                    value={formData.roleEn}
                    onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                    placeholder="Head of Performance Marketing"
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Foto URL</label>
                <input
                  type="url"
                  value={formData.photo}
                  onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Bio Singkat (ID) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.bioId}
                  onChange={(e) => setFormData({ ...formData, bioId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Bio (EN)</label>
                <textarea
                  rows={2}
                  value={formData.bioEn}
                  onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Keahlian (ID)</label>
                  <input
                    type="text"
                    value={formData.expertiseId}
                    onChange={(e) => setFormData({ ...formData, expertiseId: e.target.value })}
                    placeholder="Meta Ads, Scaling"
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Expertise (EN)</label>
                  <input
                    type="text"
                    value={formData.expertiseEn}
                    onChange={(e) => setFormData({ ...formData, expertiseEn: e.target.value })}
                    placeholder="Meta Ads, Scaling"
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Urutan Tampilan</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="pt-3 border-t border-[#1F232B] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#16181D] hover:bg-[#20242D] border border-[#262B35] text-gray-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm"
                >
                  Simpan Profil
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
