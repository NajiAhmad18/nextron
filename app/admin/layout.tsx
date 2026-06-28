'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Smartphone, LayoutDashboard, Database, FolderGit, 
  MailOpen, LogOut, ArrowLeft, Loader2, Sparkles
} from 'lucide-react';
import { authService, UserSession } from '../../lib/services/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<UserSession | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const active = await authService.getCurrentSession();
        if (!active || active.role !== 'admin') {
          router.push('/login');
        } else {
          setSession(active);
        }
      } catch (e) {
        router.push('/login');
      } finally {
        setChecking(false);
      }
    };

    verifyAdmin();
  }, [pathname, router]);

  const handleLogout = async () => {
    await authService.logout();
    router.push('/');
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-gold-500" />
        <span className="text-xs font-semibold tracking-wider uppercase">Verifying Admin Access...</span>
      </div>
    );
  }

  if (!session) return null;

  const sidebarLinks = [
    { href: '/admin', label: 'Stats Overview', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Manage Inventory', icon: Database },
    { href: '/admin/categories-brands', label: 'Categories & Brands', icon: FolderGit },
    { href: '/admin/inquiries', label: 'Customer Inquiries', icon: MailOpen },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col lg:flex-row">
      
      {/* Sidebar navigation */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-zinc-900 bg-zinc-950 p-6 flex flex-col justify-between shrink-0">
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-white shadow-md">
                <Smartphone className="w-4.5 h-4.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-gradient-gold">
                NEXTRON
              </span>
            </Link>
            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-gold-500/20 text-gold-400 bg-gold-500/5">
              Admin
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-col gap-1.5">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-gold-500 text-zinc-950 shadow-md'
                      : 'text-zinc-450 hover:text-zinc-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer controls in sidebar */}
        <div className="flex flex-col gap-3 mt-8 pt-6 border-t border-zinc-900">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-zinc-500 hover:text-zinc-350 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Shop
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/5 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main workspace */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto max-w-7xl">
        {children}
      </main>

    </div>
  );
}
