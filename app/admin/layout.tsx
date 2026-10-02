import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { AdminNav } from '@/components/admin/AdminNav';

export const metadata = {
  title: 'Belajar Ads CMS • Admin Control Center',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isLoginPage = pathname === '/admin/login';

  const session = await getAdminSession();

  // Enforce server-side authentication guard for all protected admin pages
  if (!session && !isLoginPage) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#08090A] text-gray-100 flex flex-col antialiased">
      <AdminNav session={session}>
        {children}
      </AdminNav>
    </div>
  );
}
