import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Analytics } from './Analytics';
import { getAllPageVisibilities } from '@/lib/visibility';

export async function PublicLayout({ children }: { children: React.ReactNode }) {
  const visibilities = await getAllPageVisibilities();

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-gray-100">
      <Analytics />
      <Navbar visibilities={visibilities} />
      <main className="flex-1">{children}</main>
      <Footer visibilities={visibilities} />
    </div>
  );
}
