'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Languages,
  Layers,
  Sparkles
} from 'lucide-react';

interface SectionData {
  id: Record<string, string>;
  en: Record<string, string>;
}

export default function AdminPageEditor() {
  const params = useParams();
  const router = useRouter();
  const pageKey = (params.key as string)?.toLowerCase() || '';

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<Record<string, SectionData>>({});
  const [activeTab, setActiveTab] = useState<'id' | 'en' | 'both'>('both');
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/admin/pages/${pageKey}`);
        if (!res.ok) throw new Error('Failed to load page content');
        const data = await res.json();
        setSections(data.sections || {});
      } catch (err: any) {
        setNotification({ message: err.message || 'Error loading page content', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    if (pageKey) loadData();
  }, [pageKey]);

  const handleFieldChange = (
    sectionKey: string,
    locale: 'id' | 'en',
    fieldKey: string,
    value: string
  ) => {
    setSections((prev) => ({
      ...prev,
      [sectionKey]: {
        ...prev[sectionKey],
        [locale]: {
          ...(prev[sectionKey]?.[locale] || {}),
          [fieldKey]: value,
        },
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch(`/api/admin/pages/${pageKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save changes');
      }

      setNotification({ message: 'All section contents saved successfully!', type: 'success' });
      setTimeout(() => setNotification(null), 4000);
    } catch (err: any) {
      setNotification({ message: err.message || 'Failed to save content', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const formatSectionTitle = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .toUpperCase();
  };

  const formatFieldLabel = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const isLongField = (fieldKey: string, val: string) => {
    return (
      fieldKey.toLowerCase().includes('desc') ||
      fieldKey.toLowerCase().includes('text') ||
      fieldKey.toLowerCase().includes('bio') ||
      fieldKey.toLowerCase().includes('content') ||
      fieldKey.toLowerCase().includes('mission') ||
      fieldKey.toLowerCase().includes('vision') ||
      (typeof val === 'string' && val.length > 70)
    );
  };

  const publicRoute = pageKey === 'homepage' ? '/' : `/${pageKey}`;

  return (
    <form onSubmit={handleSave} className="space-y-8 max-w-5xl mx-auto pb-20">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6 sticky top-0 bg-[#08090A]/95 backdrop-blur z-20 pt-2">
        <div className="space-y-1">
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Pages</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white capitalize">
              Edit Content: {pageKey.replace(/-/g, ' ')}
            </h1>
            <Link
              href={publicRoute}
              target="_blank"
              className="p-1.5 rounded-lg bg-[#16181D] hover:bg-[#1E2128] text-gray-400 hover:text-white transition-colors"
              title="View Public Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language View Selector */}
          <div className="flex items-center bg-[#16181D] border border-[#1F232B] rounded-xl p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'both' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Side-by-Side
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('id')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'id' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Indonesian Only
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'en' ? 'bg-brand text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              English Only
            </button>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold flex items-center gap-2 glow-orange-sm transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>{saving ? 'Saving...' : 'Save Content'}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {loading ? (
        <div className="p-20 text-center text-gray-500 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-brand" />
          <span>Loading section contents...</span>
        </div>
      ) : Object.keys(sections).length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-[#0F1115] border border-[#1F232B] text-gray-400 space-y-3">
          <p>No customizable content sections found for this page.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(sections).map(([sectionKey, sectionData]) => {
            const idFields = sectionData.id || {};
            const enFields = sectionData.en || {};
            const fieldKeys = Array.from(
              new Set([...Object.keys(idFields), ...Object.keys(enFields)])
            );

            return (
              <div
                key={sectionKey}
                className="bg-[#0F1115] border border-[#1F232B] rounded-2xl p-6 sm:p-8 space-y-6"
              >
                {/* Section Header */}
                <div className="flex items-center justify-between border-b border-[#1F232B] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-white tracking-wide">
                        SECTION: {formatSectionTitle(sectionKey)}
                      </h2>
                      <span className="text-[11px] font-mono text-gray-500">
                        key: {sectionKey} • {fieldKeys.length} fields
                      </span>
                    </div>
                  </div>
                </div>

                {/* Fields Container */}
                <div className="space-y-6">
                  {fieldKeys.map((fieldKey) => {
                    const idVal = idFields[fieldKey] || '';
                    const enVal = enFields[fieldKey] || '';
                    const isLong = isLongField(fieldKey, idVal || enVal);

                    return (
                      <div key={fieldKey} className="space-y-2">
                        <label className="block text-xs font-bold text-gray-300">
                          {formatFieldLabel(fieldKey)}
                          <span className="ml-2 font-mono text-[10px] text-gray-500 font-normal">
                            ({fieldKey})
                          </span>
                        </label>

                        <div
                          className={`grid gap-4 ${
                            activeTab === 'both'
                              ? 'grid-cols-1 md:grid-cols-2'
                              : 'grid-cols-1'
                          }`}
                        >
                          {/* Indonesian Field */}
                          {(activeTab === 'both' || activeTab === 'id') && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                                Indonesian (ID)
                              </span>
                              {isLong ? (
                                <textarea
                                  rows={4}
                                  value={idVal}
                                  onChange={(e) =>
                                    handleFieldChange(sectionKey, 'id', fieldKey, e.target.value)
                                  }
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand transition-colors leading-relaxed"
                                  placeholder="Konten Bahasa Indonesia..."
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={idVal}
                                  onChange={(e) =>
                                    handleFieldChange(sectionKey, 'id', fieldKey, e.target.value)
                                  }
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand transition-colors"
                                  placeholder="Teks Bahasa Indonesia..."
                                />
                              )}
                            </div>
                          )}

                          {/* English Field */}
                          {(activeTab === 'both' || activeTab === 'en') && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />
                                English (EN)
                              </span>
                              {isLong ? (
                                <textarea
                                  rows={4}
                                  value={enVal}
                                  onChange={(e) =>
                                    handleFieldChange(sectionKey, 'en', fieldKey, e.target.value)
                                  }
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand transition-colors leading-relaxed"
                                  placeholder="English content..."
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={enVal}
                                  onChange={(e) =>
                                    handleFieldChange(sectionKey, 'en', fieldKey, e.target.value)
                                  }
                                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#16181D] border border-[#262B35] text-white text-sm focus:outline-none focus:border-brand transition-colors"
                                  placeholder="English text..."
                                />
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Bottom Save Bar */}
          <div className="p-6 rounded-2xl bg-[#0F1115] border border-[#1F232B] flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Make sure to test both language switches on the public page after saving.
            </span>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-bold flex items-center gap-2 glow-orange transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
