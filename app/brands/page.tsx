import React from 'react';
import Link from 'next/link';
import { brandsService } from '../../lib/services/brands';
import { productsService } from '../../lib/services/products';
import ScrollReveal from '../../components/ScrollReveal';

export const revalidate = 0;

export default async function BrandsPage() {
  const brands = await brandsService.getBrands();
  const allProducts = await productsService.getProducts();

  // Calculate product counts per brand
  const getBrandCount = (brandId: string) => {
    return allProducts.filter(p => p.brand_id === brandId).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-10">
      <ScrollReveal className="flex flex-col gap-2 border-b border-black/[0.04] dark:border-white/[0.04] pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Our Brands</h1>
        <p className="text-sm text-zinc-500">
          Browse items by manufacturer. Select a brand to explore their catalog.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand, i) => {
          const count = getBrandCount(brand.id);
          return (
            <ScrollReveal
              key={brand.id}
              delay={i * 0.05}
              direction="up"
              className="flex flex-col rounded-3xl p-6 glass-card hover:border-gold-500/50 hover:bg-gold-500/[0.01] transition-all duration-300 group"
            >
              <Link href={`/products?brand=${brand.slug}`} className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center text-xl font-black text-zinc-400 dark:text-zinc-650 group-hover:scale-105 transition-transform duration-300">
                    {brand.name[0]}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-gold-500 transition-colors">
                      {brand.name}
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider mt-0.5">
                      Brand Manufacturer
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 border-t border-black/[0.03] dark:border-white/[0.04] pt-4 text-xs">
                  <span className="text-zinc-400">{count} {count === 1 ? 'device' : 'devices'} in stock</span>
                  <span className="font-semibold text-gold-600 dark:text-gold-500 group-hover:translate-x-1 transition-transform duration-200">
                    Browse &rarr;
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
