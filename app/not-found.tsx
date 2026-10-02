import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mx-auto shadow-xl shadow-brand/10">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-brand uppercase tracking-wider">
            404 Error • Page Not Found
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            Halaman atau konten artikel/event yang Anda cari mungkin telah dipindahkan, diubah URL-nya, atau belum dipublikasikan.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand hover:bg-brand-hover text-white text-xs font-bold glow-orange transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </Link>
          <Link
            href="/programs"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-card hover:bg-dark-muted text-gray-300 hover:text-white border border-dark-border text-xs font-semibold transition-colors"
          >
            Lihat Program Belajar
          </Link>
        </div>
      </div>
    </div>
  );
}
