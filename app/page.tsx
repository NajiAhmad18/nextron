import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, ShieldCheck, Award, Zap, RefreshCw,
  MessageCircle, BadgePercent, Sparkles, ChevronRight
} from 'lucide-react';
import { productsService } from '../lib/services/products';
import { brandsService } from '../lib/services/brands';
import { getWhatsAppGeneralUrl } from '../lib/utils';
import ProductCard from '../components/ProductCard';
import ScrollReveal from '../components/ScrollReveal';

export const revalidate = 0;

const CATEGORIES = [
  { label: 'Smartphones', slug: 'phones', emoji: '📱', desc: 'Flagship & mid-range' },
  { label: 'Laptops', slug: 'laptops', emoji: '💻', desc: 'Ultrabooks & Pro' },
  { label: 'Smartwatches', slug: 'wearables', emoji: '⌚', desc: 'Health & fitness' },
  { label: 'Audio', slug: 'audio', emoji: '🎧', desc: 'Headphones & earbuds' },
  { label: 'Accessories', slug: 'accessories', emoji: '🔌', desc: 'Cables & chargers' },
];

const WHY_ITEMS = [
  {
    icon: Award,
    title: 'Certified Quality',
    desc: 'Every pre-owned device passes our 30-point inspection before it reaches you.',
  },
  {
    icon: ShieldCheck,
    title: 'Warranty Backed',
    desc: '1-year warranty on new items, up to 6 months shop warranty on pre-owned.',
  },
  {
    icon: Zap,
    title: 'Instant Support',
    desc: 'Reach our tech experts instantly via WhatsApp — no hold times, ever.',
  },
  {
    icon: RefreshCw,
    title: 'Fair Trade-Ins',
    desc: 'Bring your old device and get top-value credit toward your next upgrade.',
  },
];

export default async function HomePage() {
  const featuredProducts = await productsService.getProducts({ isFeatured: true });
  const newArrivals = await productsService.getProducts({ isNewArrival: true });
  const usedDevices = await productsService.getProducts({ condition: 'Used' });
  const brands = await brandsService.getBrands();
  const whatsappUrl = getWhatsAppGeneralUrl();

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* ──────────────────────────────────────────────
          1. HERO SECTION
      ────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: '#050810' }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero_bg.png"
            alt="Premium Electronics"
            fill
            priority
            className="object-cover"
            style={{ opacity: 0.45 }}
          />
          {/* Gradient overlays */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to right, rgba(5,8,16,0.95) 35%, rgba(5,8,16,0.5) 65%, rgba(5,8,16,0.2) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to top, rgba(5,8,16,1) 0%, transparent 50%)',
            }}
          />
        </div>

        {/* Content */}
        <div className="container-xl relative z-10 py-32">
          <div className="max-w-2xl">
            <ScrollReveal direction="up" delay={0}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: 'rgba(79,110,247,0.15)',
                  border: '1px solid rgba(79,110,247,0.3)',
                  color: '#6b83f8',
                }}
              >
                <Sparkles className="w-3 h-3" />
                Premium Electronics
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08}>
              <h1
                className="font-black leading-[1.05] mb-6"
                style={{ fontSize: 'clamp(44px, 7vw, 88px)', letterSpacing: '-0.04em', color: '#fff' }}
              >
                The Future<br />
                <span style={{
                  background: 'linear-gradient(90deg, #6b83f8 0%, #4f6ef7 50%, #a78bfa 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Is Here.
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.14}>
              <p
                className="text-lg leading-relaxed mb-10 max-w-lg"
                style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}
              >
                Shop hand-picked premium smartphones, laptops, smartwatches, and accessories.
                Brand new and certified pre-owned — all warranty backed.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/products"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: '#fff',
                    color: '#111',
                    boxShadow: '0 8px 32px rgba(255,255,255,0.15)',
                  }}
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/new-arrivals"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  New Arrivals
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div
            className="w-px h-12 animate-bounce"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
          />
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          2. STATS BAR
      ────────────────────────────────────────────── */}
      <div style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container-xl py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: '500+', label: 'Products in Stock' },
              { num: '2K+', label: 'Happy Customers' },
              { num: '30pt', label: 'Quality Inspection' },
              { num: '1yr', label: 'Warranty on New' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black mb-1" style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}>
                  {stat.num}
                </p>
                <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          3. SHOP BY CATEGORY
      ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="section-label mb-2">Browse</p>
                <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                  Shop by Category
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.06} direction="up">
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="flex flex-col items-center text-center p-6 rounded-2xl transition-all duration-200 group hover:-translate-y-1 hover:shadow-lg hover:border-[var(--accent)]"
                  style={{
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span className="text-3xl mb-3 block leading-none">{cat.emoji}</span>
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    {cat.label}
                  </h3>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                    {cat.desc}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          4. FEATURED PRODUCTS
      ────────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container-xl">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Editor&apos;s Choice</p>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    Featured Products
                  </h2>
                </div>
                <Link
                  href="/products?featured=true"
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 4).map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.06} direction="up">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
            <div className="flex sm:hidden justify-center mt-8">
              <Link href="/products?featured=true" className="btn-secondary text-sm">
                View All Featured
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────
          5. NEW ARRIVALS
      ────────────────────────────────────────────── */}
      {newArrivals.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="container-xl">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Just Landed</p>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    New Arrivals
                  </h2>
                </div>
                <Link
                  href="/new-arrivals"
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {newArrivals.slice(0, 4).map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.06} direction="up">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────
          6. BRANDS MARQUEE
      ────────────────────────────────────────────── */}
      {brands.length > 0 && (
        <section
          className="py-16 overflow-hidden"
          style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}
        >
          <div className="container-xl mb-10">
            <ScrollReveal>
              <p className="section-label mb-2">Our Partners</p>
              <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                Top Brands
              </h2>
            </ScrollReveal>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex">
              {/* Duplicate for seamless loop */}
              <div className="marquee-track">
                {[...brands, ...brands].map((brand, i) => (
                  <Link
                    key={`${brand.id}-${i}`}
                    href={`/products?brand=${brand.slug}`}
                    className="flex-shrink-0 mx-4 px-8 py-5 rounded-2xl transition-all duration-200 hover:-translate-y-1"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      boxShadow: 'var(--shadow-sm)',
                      minWidth: 140,
                      textAlign: 'center',
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-black mx-auto mb-2"
                      style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
                    >
                      {brand.name[0]}
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{brand.name}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Explore →</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────
          7. WHY NEXTRON
      ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-label mb-3">Why Us</p>
              <h2
                className="text-3xl font-black tracking-tight mb-4"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
              >
                Why Shop With Nextron
              </h2>
              <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                We&apos;re redefining the electronics retail experience with unmatched quality guarantees and personal service.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07} direction="up">
                <div
                  className="p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                  >
                    <item.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          8. CERTIFIED PRE-OWNED
      ────────────────────────────────────────────── */}
      {usedDevices.length > 0 && (
        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container-xl">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="section-label mb-2">Save More</p>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
                    Certified Pre-Owned
                  </h2>
                </div>
                <Link
                  href="/used"
                  className="hidden sm:flex items-center gap-1 text-sm font-semibold transition-colors"
                  style={{ color: 'var(--accent)' }}
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {usedDevices.slice(0, 4).map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.06} direction="up">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ──────────────────────────────────────────────
          9. PROMOTIONAL BANNER
      ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ background: '#050810' }}
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/promo_bg.png"
                  alt="Special Offers"
                  fill
                  className="object-cover opacity-50"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to right, rgba(5,8,16,0.95) 0%, rgba(5,8,16,0.6) 60%, rgba(5,8,16,0.3) 100%)' }}
                />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-14 py-14">
                <div className="text-white">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-wider"
                    style={{
                      background: 'rgba(239,68,68,0.15)',
                      border: '1px solid rgba(239,68,68,0.3)',
                      color: '#f87171',
                    }}
                  >
                    <BadgePercent className="w-3 h-3" />
                    Limited Time
                  </div>
                  <h2
                    className="font-black leading-tight mb-4 max-w-md"
                    style={{ fontSize: 'clamp(26px, 4vw, 42px)', letterSpacing: '-0.03em' }}
                  >
                    Exclusive Deals on{' '}
                    <span style={{
                      background: 'linear-gradient(90deg, #f5c842, #d4a017)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}>
                      Accessories & More
                    </span>
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 15, maxWidth: 360 }}>
                    Up to 30% off premium charging docks, noise-cancelling headphones, and smartwatch cases.
                  </p>
                </div>
                <Link
                  href="/offers"
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 shrink-0"
                  style={{
                    background: '#fff',
                    color: '#111',
                    boxShadow: '0 8px 24px rgba(255,255,255,0.12)',
                  }}
                >
                  Browse Offers
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          10. WHATSAPP CTA
      ────────────────────────────────────────────── */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-xl">
          <ScrollReveal>
            <div
              className="rounded-3xl p-10 md:p-16 text-center"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(37,211,102,0.1)' }}
              >
                <MessageCircle className="w-8 h-8 fill-[#25D366] stroke-none" />
              </div>
              <h2
                className="text-2xl md:text-3xl font-black mb-3 tracking-tight"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.03em' }}
              >
                Have Questions?
              </h2>
              <p className="text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--text-secondary)' }}>
                Talk directly with our sales experts on WhatsApp. Get real photos, detailed specs, and personalized recommendations — instantly.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: '#25D366',
                  color: '#fff',
                  boxShadow: '0 8px 24px rgba(37,211,102,0.25)',
                }}
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                Chat with Sales Experts
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
