'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { getWhatsAppGeneralUrl } from '../lib/utils';

export default function Footer() {
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <footer className="relative mt-auto text-zinc-400" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      {/* Upper footer */}
      <div className="container-xl py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand column */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2.5 group w-fit">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white" 
              style={{ background: 'linear-gradient(135deg, #1428a0 0%, #4f6ef7 100%)' }}
            >
              <Smartphone className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
              NEXTRON
            </span>
          </Link>
          <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-secondary)' }}>
            Your destination for premium electronics. We buy and sell brand new and certified pre-owned smartphones, laptops, smartwatches, and accessories with a commitment to unmatched quality and service.
          </p>
        </div>

        {/* Categories column */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)' }}>
            Product Categories
          </h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: 'Smartphones', href: '/products?category=phones' },
              { label: 'Laptops & Notebooks', href: '/products?category=laptops' },
              { label: 'Smartwatches & Fitness', href: '/products?category=wearables' },
              { label: 'Audio & Headphones', href: '/products?category=audio' },
              { label: 'Chargers & Accessories', href: '/products?category=accessories' },
            ].map(link => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop Info column */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)' }}>
            Quick Links
          </h4>
          <ul className="space-y-3.5 text-sm">
            {[
              { label: 'New Arrivals', href: '/new-arrivals' },
              { label: 'Certified Pre-Owned', href: '/used' },
              { label: 'Special Offers', href: '/offers' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact & Store Locator', href: '/contact' },
            ].map(link => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact details */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider mb-5" style={{ color: 'var(--text-primary)' }}>
            Contact & Location
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                123 Luxury Avenue, Electronics Hub,<br />
                Suite 404, Cupertino, CA 95014
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} />
              <a 
                href="tel:+1234567890" 
                className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                style={{ color: 'var(--text-secondary)' }}
              >
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} />
              <a 
                href="mailto:info@nextron.com" 
                className="transition-colors hover:text-zinc-900 dark:hover:text-white"
                style={{ color: 'var(--text-secondary)' }}
              >
                info@nextron.com
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="w-5 h-5 shrink-0" style={{ color: 'var(--accent)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                Mon - Sat: 9:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 5:00 PM
              </span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom footer bar */}
      <div style={{ borderTop: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
        <div className="container-xl py-6 flex flex-col md:flex-row items-center justify-between text-xs gap-4">
          <p style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Nextron Electronics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-zinc-900 dark:hover:text-white" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link>
            <Link href="/contact" className="hover:text-zinc-900 dark:hover:text-white" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link>
            <Link href="/login" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-0.5" style={{ color: 'var(--text-muted)' }}>
              Portal Access <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp CTA */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-green-400/30"
        title="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-35 group-hover:hidden"></span>
        <MessageCircle className="w-7 h-7 relative z-10 fill-white stroke-none" />
      </a>
    </footer>
  );
}
