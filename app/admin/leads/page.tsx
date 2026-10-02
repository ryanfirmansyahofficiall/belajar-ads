'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '@prisma/client';
import { Search, Trash2, Mail, Phone, Building2, CheckCircle2, Loader2, MessageSquare } from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/leads');
      const data = await res.json();
      if (Array.isArray(data)) setLeads(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setActionLoading(id);
      await fetch(`/api/admin/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      await fetchLeads();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus data lead ini?')) return;
    try {
      setActionLoading(id);
      await fetch(`/api/admin/leads/${id}`, { method: 'DELETE' });
      await fetchLeads();
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = leads.filter((l) => {
    const matchSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (l.company && l.company.toLowerCase().includes(search.toLowerCase())) ||
      l.phone.includes(search);
    const matchStatus = statusFilter ? l.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="border-b border-[#1F232B] pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Lead & Inquiry Management
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Pantau dan tindak lanjuti prospek yang masuk dari formulir kontak, konsultasi bisnis, dan pendaftaran.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama prospek, email, perusahaan, atau no WA..."
            className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-56 px-3 py-2 rounded-xl bg-[#101216] border border-[#1F232B] text-white text-xs focus:outline-none focus:border-brand"
        >
          <option value="">Semua Status Lead</option>
          <option value="NEW">NEW (Baru)</option>
          <option value="CONTACTED">CONTACTED (Dihubungi)</option>
          <option value="QUALIFIED">QUALIFIED (Prospek)</option>
          <option value="CLOSED">CLOSED (Selesai/Deals)</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="p-6 rounded-2xl bg-[#101216] border border-[#1F232B] overflow-x-auto">
        {loading ? (
          <div className="py-12 flex items-center justify-center text-gray-400 text-xs gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-brand" />
            <span>Memuat data prospek...</span>
          </div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1F232B] text-gray-400 font-semibold">
                <th className="pb-3">Nama & Perusahaan</th>
                <th className="pb-3">Kontak</th>
                <th className="pb-3">Sumber / Kebutuhan</th>
                <th className="pb-3">Pesan</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F232B] text-gray-300">
              {filtered.length > 0 ? (
                filtered.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 pr-4 max-w-xs">
                      <div className="font-bold text-white text-sm">{lead.name}</div>
                      {lead.company && (
                        <div className="text-[11px] text-brand flex items-center gap-1 mt-0.5">
                          <Building2 className="w-3 h-3" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-1.5 text-gray-200">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span>{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-400 text-[11px] mt-0.5">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span className="font-mono">{lead.phone}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2 py-0.5 rounded bg-[#181C22] border border-[#252A34] text-[10px] text-gray-300 font-semibold block mb-1">
                        {lead.source}
                      </span>
                      {lead.trainingNeeds && (
                        <div className="text-[11px] text-gray-400 line-clamp-1">
                          {lead.trainingNeeds}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 pr-4 max-w-xs">
                      <div className="text-gray-400 text-xs line-clamp-2">
                        {lead.message || '-'}
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        disabled={actionLoading === lead.id}
                        className="px-2 py-1 rounded bg-[#161920] border border-[#252A34] text-xs font-semibold text-brand focus:outline-none"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="QUALIFIED">QUALIFIED</option>
                        <option value="CLOSED">CLOSED</option>
                      </select>
                    </td>
                    <td className="py-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(lead.id)}
                        disabled={actionLoading === lead.id}
                        className="p-1.5 rounded-lg bg-[#181C22] text-red-400 hover:text-red-300 hover:bg-white/10"
                        title="Hapus Lead"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">
                    Tidak ada lead yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
