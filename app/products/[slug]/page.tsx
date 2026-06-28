import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MessageCircle, Shield, Truck, Calendar, Tag } from 'lucide-react';
import { productsService } from '../../../lib/services/products';
import { formatPrice, getWhatsAppInquiryUrl } from '../../../lib/utils';
import ProductImageGallery from '../../../components/ProductImageGallery';
import InquiryForm from '../../../components/InquiryForm';
import ProductCard from '../../../components/ProductCard';
import ScrollReveal from '../../../components/ScrollReveal';

export const revalidate = 0; // Dynamic detail page

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await productsService.getProductBySlug(slug);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-zinc-500 mb-8 max-w-sm">
          Sorry, we couldn't find the product you're looking for. It may have been removed or is no longer available.
        </p>
        <Link
          href="/products"
          className="px-6 py-3 rounded-full bg-gold-500 text-zinc-950 font-semibold"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Fetch similar products in the same category
  let similarProducts: any[] = [];
  if (product.category?.slug) {
    const allInCategory = await productsService.getProducts({ categorySlug: product.category.slug });
    similarProducts = allInCategory.filter(p => p.id !== product.id).slice(0, 4);
  }

  const hasDiscount = !!(product.discount_price && product.discount_price < product.price);
  const isSoldOut = product.availability === 'Sold Out';
  const whatsappUrl = getWhatsAppInquiryUrl(product.name);

  // Fallback image logic based on category
  let defaultImg = '/images/phone.png';
  if (product.category?.slug === 'laptops') defaultImg = '/images/laptop.png';
  if (product.category?.slug === 'wearables') defaultImg = '/images/watch.png';
  if (product.category?.slug === 'audio') defaultImg = '/images/audio.png';
  if (product.category?.slug === 'accessories') defaultImg = '/images/hero_bg.png';

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-16">
      
      {/* Back button */}
      <ScrollReveal className="w-fit">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </ScrollReveal>

      {/* Main product columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6">
          <ScrollReveal direction="right" duration={0.5}>
            <ProductImageGallery
              images={product.images || []}
              defaultImage={defaultImg}
              productName={product.name}
            />
          </ScrollReveal>
        </div>

        {/* Right Column: Title, Specs, Inquire buttons */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          
          <ScrollReveal className="flex flex-col gap-4">
            {/* Category and brand tags */}
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-gold-600 dark:text-gold-500">
              {product.brand && <span>{product.brand.name}</span>}
              {product.brand && product.category && <span>•</span>}
              {product.category && <span>{product.category.name}</span>}
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
              {product.name}
            </h1>

            {/* Condition badge */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                product.condition === 'Brand New' 
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black' 
                  : 'bg-zinc-200 text-zinc-850 dark:bg-zinc-800 dark:text-zinc-200'
              }`}>
                {product.condition}
              </span>
              
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full ${
                isSoldOut 
                  ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                  : 'bg-green-500/10 text-green-500 border border-green-500/20'
              }`}>
                {product.availability}
              </span>
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-4 mt-2">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-black text-zinc-950 dark:text-white">
                    {formatPrice(product.discount_price!)}
                  </span>
                  <span className="text-lg text-zinc-400 dark:text-zinc-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xs font-bold text-red-500 uppercase">
                    Save {Math.round(((product.price - product.discount_price!) / product.price) * 100)}%
                  </span>
                </>
              ) : (
                <span className="text-3xl font-black text-zinc-950 dark:text-white">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </ScrollReveal>

          {/* Description */}
          <ScrollReveal delay={0.05} className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Description</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              {product.short_description}
            </p>
            {product.full_description && (
              <p className="text-zinc-500 dark:text-zinc-550 text-xs leading-relaxed mt-2 border-l border-zinc-200 dark:border-zinc-800 pl-4">
                {product.full_description}
              </p>
            )}
          </ScrollReveal>

          {/* Product Specifications Table */}
          <ScrollReveal delay={0.1} className="flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">Specifications</h3>
            <div className="rounded-2xl border border-black/[0.03] dark:border-white/[0.04] overflow-hidden bg-white/50 dark:bg-zinc-950/20">
              <table className="w-full text-xs text-left">
                <tbody>
                  {product.storage && (
                    <tr className="border-b border-black/[0.03] dark:border-white/[0.04]">
                      <td className="px-4 py-3 font-semibold text-zinc-450 uppercase w-1/3">Storage Capacity</td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.storage}</td>
                    </tr>
                  )}
                  {product.ram && (
                    <tr className="border-b border-black/[0.03] dark:border-white/[0.04]">
                      <td className="px-4 py-3 font-semibold text-zinc-450 uppercase">RAM Size</td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.ram}</td>
                    </tr>
                  )}
                  {product.color && (
                    <tr className="border-b border-black/[0.03] dark:border-white/[0.04]">
                      <td className="px-4 py-3 font-semibold text-zinc-450 uppercase">Colorway</td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.color}</td>
                    </tr>
                  )}
                  {product.warranty && (
                    <tr className="border-b border-black/[0.03] dark:border-white/[0.04]">
                      <td className="px-4 py-3 font-semibold text-zinc-450 uppercase">Warranty Info</td>
                      <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.warranty}</td>
                    </tr>
                  )}
                  <tr className="border-b border-black/[0.03] dark:border-white/[0.04]">
                    <td className="px-4 py-3 font-semibold text-zinc-450 uppercase">Item Condition</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.condition}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-semibold text-zinc-450 uppercase">In-Store Stock</td>
                    <td className="px-4 py-3 text-zinc-800 dark:text-zinc-200">{product.availability}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ScrollReveal>

          {/* Action Area: WhatsApp Inquiry & Custom Form */}
          <ScrollReveal delay={0.15} className="flex flex-col gap-4 mt-2">
            {!isSoldOut && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-sm font-bold shadow-lg shadow-green-500/10 hover:shadow-green-500/20 hover:scale-[1.01] transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                Inquire Instantly via WhatsApp
              </a>
            )}

            {/* Store inquiry card */}
            <InquiryForm productId={product.id} productName={product.name} />
          </ScrollReveal>

          {/* Guarantee Badges */}
          <ScrollReveal delay={0.2} className="grid grid-cols-3 gap-3 text-center border-t border-black/[0.03] dark:border-white/[0.04] pt-6 mt-2">
            <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
              <Shield className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">100% Inspected</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
              <Truck className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Store Pickup</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-zinc-100/50 dark:bg-zinc-900/30">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span className="text-[10px] font-bold text-zinc-700 dark:text-zinc-300">Easy Exchange</span>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* Similar products section */}
      {similarProducts.length > 0 && (
        <ScrollReveal className="flex flex-col gap-8 border-t border-black/[0.04] dark:border-white/[0.04] pt-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">Similar Products</h2>
            <p className="text-xs text-zinc-500">Explore other devices in the {product.category?.name} category.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.05} direction="up">
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      )}

    </div>
  );
}
