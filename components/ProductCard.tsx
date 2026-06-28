'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, MessageCircle, Tag } from 'lucide-react';
import { Product } from '../lib/types';
import { formatPrice, getWhatsAppInquiryUrl } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.is_primary)?.image_url || '/images/phone.png';
  const hasDiscount = !!(product.discount_price && product.discount_price < product.price);
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discount_price!) / product.price) * 100)
    : 0;
  const isSoldOut = product.availability === 'Sold Out';
  const whatsappUrl = getWhatsAppInquiryUrl(product.name);
  const isNew = product.condition === 'Brand New';

  return (
    <div
      className="product-card group flex flex-col w-full"
      style={{ borderRadius: 'var(--card-radius)' }}
    >
      {/* Image Zone */}
      <div
        className="relative overflow-hidden"
        style={{
          aspectRatio: '1 / 1',
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--card-radius) var(--card-radius) 0 0',
        }}
      >
        {/* Condition Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
              background: isNew ? 'var(--text-primary)' : 'var(--bg-tertiary)',
              color: isNew ? 'var(--text-inverse)' : 'var(--text-secondary)',
            }}
          >
            {product.condition}
          </span>
          {hasDiscount && !isSoldOut && (
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: '#ef4444', color: '#fff' }}>
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Brand Label */}
        {product.brand && (
          <span
            className="absolute top-3 right-3 z-10 text-[11px] font-semibold"
            style={{ color: 'var(--text-muted)' }}
          >
            {product.brand.name}
          </span>
        )}

        {/* Product Image */}
        <Image
          src={primaryImage}
          alt={product.name}
          width={300}
          height={300}
          className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div
            className="absolute inset-0 flex items-center justify-center z-20"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
          >
            <span
              className="text-xs font-bold uppercase tracking-[0.18em] px-5 py-2 rounded-full"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}
            >
              Sold Out
            </span>
          </div>
        )}

        {/* Hover Quick Actions */}
        {!isSoldOut && (
          <div
            className="absolute inset-0 flex items-end justify-center pb-4 gap-2 z-20 transition-all duration-300"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)',
              opacity: 0,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = '0'; }}
          >
            <Link
              href={`/products/${product.slug}`}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: '#fff', color: '#111', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
              title="View Details"
            >
              <Eye className="w-3.5 h-3.5" />
              View
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:scale-105"
              style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
              title="Inquire on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none" />
              Inquire
            </a>
          </div>
        )}
      </div>

      {/* Add the hover overlay properly using group */}
      <style>{`
        .product-card:hover .quick-actions { opacity: 1 !important; }
      `}</style>

      {/* Info Section */}
      <div
        className="flex flex-col flex-1 p-4"
        style={{ background: 'var(--bg-card)' }}
      >
        {/* Category */}
        {product.category && (
          <div className="flex items-center gap-1 mb-2">
            <Tag className="w-3 h-3" style={{ color: 'var(--text-muted)' }} />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-muted)' }}
            >
              {product.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <Link href={`/products/${product.slug}`} className="block mb-1.5">
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-150"
            style={{ color: 'var(--text-primary)' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Specs */}
        {(product.storage || product.ram) && (
          <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>
            {[product.storage, product.ram].filter(Boolean).join(' · ')}
          </p>
        )}

        {/* Price Row */}
        <div
          className="flex items-center justify-between mt-auto pt-3"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          <div className="flex flex-col gap-0.5">
            {hasDiscount ? (
              <>
                <span className="text-[11px] line-through" style={{ color: 'var(--text-muted)' }}>
                  {formatPrice(product.price)}
                </span>
                <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                  {formatPrice(product.discount_price!)}
                </span>
              </>
            ) : (
              <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Mobile: Details Link */}
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-semibold transition-colors md:hidden"
            style={{ color: 'var(--accent)' }}
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
