'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminSession } from '@/lib/auth';
import { 
  LayoutDashboard, 
  LayoutTemplate,
  FileText, 
  Layers, 
  Calendar, 
  BookOpen, 
  Users, 
  Inbox, 
  Settings, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface AdminNavProps {
  session: AdminSession | null;
  children: React.ReactNode;
}

export function AdminNav({ session, children }: AdminNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Pages (CMS)', href: '/admin/pages', icon: LayoutTemplate },
    { label: 'Articles', href: '/admin/articles', icon: FileText },
    { label: 'Programs', href: '/admin/programs', icon: Layers },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Resources', href: '/admin/resources', icon: BookOpen },
    { label: 'Mentors', href: '/admin/mentors', icon: Users },
    { label: 'Leads', href: '/admin/leads', icon: Inbox },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#08090A]">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:w-64 flex-col bg-[#0F1115] border-r border-[#1F232B]">
        {/* Brand Header */}
        <div className="p-5 border-b border-[#1F232B] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-brand flex items-center justify-center font-black text-white text-xs">
              BA
            </div>
            <span className="font-bold text-white text-base">
              Belajar<span className="text-brand">Ads</span> CMS
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand text-white shadow-md shadow-brand/20 font-semibold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Actions Footer */}
        <div className="p-4 border-t border-[#1F232B] bg-[#0C0D10] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div>
              <div className="font-semibold text-white truncate max-w-[130px]">
                {session?.name || 'Administrator'}
              </div>
              <div className="text-[10px] text-gray-500 truncate max-w-[130px]">
                {session?.email || 'admin@belajarads.com'}
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-brand/20 text-brand text-[10px] font-bold">
              {session?.role || 'ADMIN'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0F1115] border-b border-[#1F232B]">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand flex items-center justify-center font-bold text-white text-xs">
              BA
            </div>
            <span className="font-bold text-white text-sm">Belajar Ads CMS</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-gray-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Menu Overlay */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-x-0 top-[57px] bottom-0 bg-[#0F1115] border-b border-[#1F232B] z-50 p-4 space-y-2 overflow-y-auto">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5"
              >
                <item.icon className="w-4 h-4 text-brand" />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-[#1F232B] flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-gray-400">
                View Site
              </Link>
              <button onClick={handleLogout} className="text-xs text-red-400">
                Logout
              </button>
            </div>
          </div>
        )}

        {/* Main Content Scrollable Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#08090A]">
          {children}
        </main>
      </div>
    </div>
  );
}
