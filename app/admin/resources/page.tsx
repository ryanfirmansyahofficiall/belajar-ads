'use client';

import React, { useState, useEffect } from 'react';
import { Resource } from '@prisma/client';
import { Plus, Edit3, Trash2, Loader2, X, Download } from 'lucide-react';

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    slug: '',
    type: 'TUTORIAL',
    category: 'Meta Ads',
    excerptId: '',
    excerptEn: '',
    contentId: '',
    contentEn: '',
    downloadUrl: '',
    isPublished: true,
  });

  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/resources');
      const data = await res.json();
      if (Array.isArray(data)) setResources(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({
      titleId: '',
      titleEn: '',
      slug: '',
      type: 'TUTORIAL',
      category: 'Meta Ads',
      excerptId: '',
      excerptEn: '',
      contentId: '',
      contentEn: '',
      downloadUrl: '',
      isPublished: true,
    });
    setShowModal(true);
  };

  const openEditModal = (item: Resource) => {
    setEditingId(item.id);
    setFormData({
      titleId: item.titleId,
      titleEn: item.titleEn || '',
      slug: item.slug,
      type: item.type,
      category: item.category || 'Meta Ads',
      excerptId: item.excerptId,
      excerptEn: item.excerptEn || '',
      contentId: item.contentId || '',
      contentEn: item.contentEn || '',
      downloadUrl: item.downloadUrl || '',
      isPublished: item.isPublished,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`/api/admin/resources/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await fetch('/api/admin/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
      setShowModal(false);
      await fetchResources();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus resource item ini?')) return;
    try {
      await fetch(`/api/admin/resources/${id}`, { method: 'DELETE' });
      await fetchResources();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resource Library Management
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Kelola template spreadsheet, panduan teknis, studi kasus, dan checklist advertising (Bilingual ID & EN).
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Resource Baru</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] overflow-x-auto">
        {loading ? (
          <div className="py-12 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat resources...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-semibold">
                <th className="pb-3">Judul Resource</th>
                <th className="pb-3">Tipe</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3">Download URL</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {resources.length > 0 ? (
                resources.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4 max-w-sm">
                      <div className="font-bold text-white text-sm line-clamp-1">{item.titleId}</div>
                      {item.titleEn && item.titleEn !== item.titleId && (
                        <div className="text-xs text-gray-400 italic line-clamp-1">EN: {item.titleEn}</div>
                      )}
                      <div className="text-[11px] text-gray-500 font-mono mt-0.5">/{item.slug}</div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-brand/15 text-brand text-[10px] font-bold">
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 text-gray-400">{item.category}</td>
                    <td className="py-3.5 pr-4 text-[11px] text-gray-500 truncate max-w-xs">
                      {item.downloadUrl || 'None'}
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-1.5 rounded-lg bg-[#181C22] text-brand hover:text-brand-hover hover:bg-white/10"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Belum ada resource data.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#101216] border border-[#1F232B] rounded-2xl p-6 space-y-5 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1F232B] pb-3">
              <h3 className="text-base font-bold text-white">
                {editingId ? 'Edit Resource' : 'Tambah Resource Baru'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Judul Resource (ID) *</label>
                  <input
                    type="text"
                    required
                    value={formData.titleId}
                    onChange={(e) => setFormData({ ...formData, titleId: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Title (EN)</label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Tipe Resource *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  >
                    <option value="TUTORIAL">TUTORIAL</option>
                    <option value="CASE_STUDY">CASE_STUDY</option>
                    <option value="ADS_BREAKDOWN">ADS_BREAKDOWN</option>
                    <option value="TEMPLATE">TEMPLATE</option>
                    <option value="SPREADSHEET">SPREADSHEET</option>
                    <option value="GUIDE">GUIDE</option>
                    <option value="CHECKLIST">CHECKLIST</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">Download / External URL</label>
                  <input
                    type="url"
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Ringkasan / Excerpt (ID) *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerptId}
                  onChange={(e) => setFormData({ ...formData, excerptId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Excerpt (EN)</label>
                <textarea
                  rows={2}
                  value={formData.excerptEn}
                  onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Konten Lengkap (ID) *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.contentId}
                  onChange={(e) => setFormData({ ...formData, contentId: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Content (EN)</label>
                <textarea
                  rows={4}
                  value={formData.contentEn}
                  onChange={(e) => setFormData({ ...formData, contentEn: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-[#161920] border border-[#252A34] text-white text-xs font-mono focus:outline-none focus:border-brand"
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
                  Simpan Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
