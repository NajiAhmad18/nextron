'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Smartphone, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { authService, UserSession } from '../lib/services/auth';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  {
    href: '/products',
    label: 'Products',
    children: [
      { href: '/products', label: 'All Products' },
      { href: '/new-arrivals', label: 'New Arrivals' },
      { href: '/used', label: 'Certified Pre-Owned' },
      { href: '/offers', label: 'Special Offers' },
    ],
  },
  { href: '/brands', label: 'Brands' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface DropdownProps {
  link: (typeof NAV_LINKS)[0];
  isActive: boolean;
}

function NavDropdown({ link, isActive }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!link.children) {
    return (
      <Link
        href={link.href}
        className="nav-link"
        style={{
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontWeight: isActive ? '600' : '500',
        }}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="nav-link flex items-center gap-1"
        style={{
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          fontWeight: isActive ? '600' : '500',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        {link.label}
        <ChevronDown
          className="w-3.5 h-3.5 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Dropdown Panel */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-52 rounded-2xl overflow-hidden transition-all duration-200"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-6px)',
        }}
      >
        <div className="py-2">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="flex items-center px-4 py-2.5 text-sm font-medium transition-colors duration-150"
              style={{ color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<UserSession | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const active = await authService.getCurrentSession();
      setSession(active);
    };
    fetchSession();
  }, [pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    await authService.logout();
    setSession(null);
    window.location.href = '/';
  };

  return (
    <>
      <style>{`
        .nav-link {
          font-size: 14px;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: color 0.15s ease;
          white-space: nowrap;
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
          borderBottom: isScrolled ? '1px solid var(--nav-border)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(24px) saturate(180%)' : 'none',
          padding: isScrolled ? '12px 0' : '20px 0',
        }}
      >
        <div className="container-xl flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-transform duration-200 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #1428a0 0%, #4f6ef7 100%)' }}
            >
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span
              className="text-lg font-black tracking-tight"
              style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
            >
              NEXTRON
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
              return (
                <NavDropdown key={link.href} link={link} isActive={isActive} />
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />

            {session ? (
              <div className="flex items-center gap-2">
                {session.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                    style={{
                      background: 'var(--text-primary)',
                      color: 'var(--text-inverse)',
                    }}
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium transition-colors duration-200"
                  style={{ color: '#ef4444' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200"
                style={{
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-tertiary)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--bg-secondary)'; }}
              >
                <User className="w-3.5 h-3.5" />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile: Theme + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className="lg:hidden fixed inset-0 z-40 transition-all duration-300"
        style={{
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMobileMenuOpen(false)}
        />
        {/* Drawer Panel */}
        <nav
          className="absolute top-0 right-0 h-full w-80 max-w-full overflow-y-auto"
          style={{
            background: 'var(--bg-card)',
            borderLeft: '1px solid var(--border-color)',
            transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'var(--shadow-xl)',
          }}
        >
          {/* Drawer Header */}
          <div
            className="flex items-center justify-between px-6 py-5"
            style={{ borderBottom: '1px solid var(--border-color)' }}
          >
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                style={{ background: 'linear-gradient(135deg, #1428a0 0%, #4f6ef7 100%)' }}
              >
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                NEXTRON
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="px-4 py-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div key={link.href} className="mb-1">
                  {link.children ? (
                    <>
                      <button
                        onClick={() => setMobileExpanded(mobileExpanded === link.href ? null : link.href)}
                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold transition-all"
                        style={{
                          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                          background: mobileExpanded === link.href ? 'var(--bg-secondary)' : 'transparent',
                        }}
                      >
                        {link.label}
                        <ChevronDown
                          className="w-4 h-4 transition-transform duration-200"
                          style={{ transform: mobileExpanded === link.href ? 'rotate(180deg)' : 'none' }}
                        />
                      </button>
                      {mobileExpanded === link.href && (
                        <div className="ml-3 mt-1 mb-2 flex flex-col gap-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="px-3 py-2.5 rounded-lg text-sm transition-colors"
                              style={{ color: 'var(--text-secondary)' }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center px-3 py-3 rounded-xl text-sm font-semibold transition-colors"
                      style={{
                        color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--bg-secondary)' : 'transparent',
                      }}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer */}
          <div
            className="px-4 py-4 mt-auto"
            style={{ borderTop: '1px solid var(--border-color)' }}
          >
            {session ? (
              <div className="flex flex-col gap-2">
                <p className="text-xs px-3 truncate" style={{ color: 'var(--text-muted)' }}>
                  {session.email}
                </p>
                {session.role === 'admin' && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: 'var(--text-primary)', color: 'var(--text-inverse)' }}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
                  style={{
                    border: '1px solid rgba(239,68,68,0.25)',
                    color: '#ef4444',
                    background: 'transparent',
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: 'var(--text-primary)',
                  color: 'var(--text-inverse)',
                }}
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}
