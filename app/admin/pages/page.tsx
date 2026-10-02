'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutTemplate, 
  Eye, 
  EyeOff, 
  Edit3, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  FileText
} from 'lucide-react';

interface PageItem {
  key: string;
  name: string;
  route: string;
  description: string;
  isVisible: boolean;
  sectionsCount: number;
}

interface ResourceCategoryItem {
  key: string;
  name: string;
  route: string;
  isVisible: boolean;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [categories, setCategories] = useState<ResourceCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingKey, setUpdatingKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      if (!res.ok) throw new Error('Failed to fetch pages data');
      const data = await res.json();
      setPages(data.pages || []);
      setCategories(data.resourceCategories || []);
    } catch (err: any) {
      setNotification({ message: err.message || 'Error fetching pages', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleToggleVisibility = async (key: string, currentStatus: boolean, isCategory = false) => {
    setUpdatingKey(key);
    const newStatus = !currentStatus;

    // Optimistic UI update
    if (isCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.key === key ? { ...c, isVisible: newStatus } : c))
      );
    } else {
      setPages((prev) =>
        prev.map((p) => (p.key === key ? { ...p, isVisible: newStatus } : p))
      );
    }

    try {
      const res = await fetch('/api/admin/pages/visibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageKey: key, isVisible: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update visibility');

      setNotification({
        message: `${key} is now ${newStatus ? 'Visible' : 'Hidden'} to public.`,
        type: 'success',
      });
      setTimeout(() => setNotification(null), 3500);
    } catch (err: any) {
      // Revert on error
      if (isCategory) {
        setCategories((prev) =>
          prev.map((c) => (c.key === key ? { ...c, isVisible: currentStatus } : c))
        );
      } else {
        setPages((prev) =>
          prev.map((p) => (p.key === key ? { ...p, isVisible: currentStatus } : p))
        );
      }
      setNotification({ message: err.message || 'Failed to update visibility', type: 'error' });
    } finally {
      setUpdatingKey(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F232B] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <LayoutTemplate className="w-6 h-6 text-brand" />
            <h1 className="text-2xl font-black text-white">Pages & Visibility Manager</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Edit text content of public pages and toggle page visibility without modifying code or layouts.
          </p>
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

      {/* Info Callout */}
      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs leading-relaxed flex items-start gap-3">
        <span className="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 mt-0.5">
          Rule
        </span>
        <p>
          <strong>Visible</strong> pages appear in navigation menus, footer, and category lists. 
          When set to <strong>Hidden</strong>, the page disappears from all navigation and cards, and direct URL access returns a 404 Not Found.
          Page content and code are never deleted.
        </p>
      </div>

      {/* Main Pages Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Public Pages (CMS Content & Visibility)</span>
          <span className="text-xs font-normal text-gray-500">({pages.length} pages)</span>
        </h2>

        {loading ? (
          <div className="p-12 text-center text-gray-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-brand" />
            <span>Loading pages...</span>
          </div>
        ) : (
          <div className="bg-[#0F1115] border border-[#1F232B] rounded-2xl overflow-hidden divide-y divide-[#1F232B]">
            {pages.map((page) => {
              const isUpdating = updatingKey === page.key;
              return (
                <div
                  key={page.key}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-white text-base">{page.name}</span>
                      <span className="font-mono text-xs text-gray-500 bg-[#16181D] px-2 py-0.5 rounded">
                        {page.route}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          page.isVisible
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {page.isVisible ? 'Visible' : 'Hidden'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{page.description}</p>
                    <div className="text-[11px] text-gray-500 flex items-center gap-2 pt-1">
                      <span>{page.sectionsCount} sections configured</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {/* Direct View */}
                    <Link
                      href={page.route}
                      target="_blank"
                      className="p-2 rounded-lg bg-[#16181D] hover:bg-[#1E2128] text-gray-400 hover:text-white transition-colors"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {/* Visibility Switch */}
                    <button
                      onClick={() => handleToggleVisibility(page.key, page.isVisible)}
                      disabled={isUpdating}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                        page.isVisible
                          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {isUpdating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : page.isVisible ? (
                        <Eye className="w-3.5 h-3.5" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                      <span>{page.isVisible ? 'Public: Visible' : 'Public: Hidden'}</span>
                    </button>

                    {/* Edit Content Button */}
                    <Link
                      href={`/admin/pages/${page.key}`}
                      className="px-4 py-2 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold flex items-center gap-1.5 glow-orange-sm transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resource Sub-categories Visibility */}
      <div className="space-y-4 pt-6 border-t border-[#1F232B]">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Resource Hub Categories Visibility</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Hide or show individual sub-sections within the Resources Hub (e.g. Bedah Iklan / Ads Breakdown).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const isUpdating = updatingKey === cat.key;
            return (
              <div
                key={cat.key}
                className="p-4 rounded-xl bg-[#0F1115] border border-[#1F232B] flex items-center justify-between gap-3"
              >
                <div>
                  <span className="font-bold text-white text-sm block">{cat.name}</span>
                  <span className="font-mono text-[11px] text-gray-500">{cat.route}</span>
                </div>

                <button
                  onClick={() => handleToggleVisibility(cat.key, cat.isVisible, true)}
                  disabled={isUpdating}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    cat.isVisible
                      ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20'
                  }`}
                >
                  {isUpdating ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : cat.isVisible ? (
                    <Eye className="w-3 h-3" />
                  ) : (
                    <EyeOff className="w-3 h-3" />
                  )}
                  <span>{cat.isVisible ? 'Visible' : 'Hidden'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
