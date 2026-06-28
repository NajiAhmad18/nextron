import React from 'react';
import { productsService } from '../../lib/services/products';
import ProductCard from '../../components/ProductCard';
import ScrollReveal from '../../components/ScrollReveal';

export const revalidate = 0;

export default async function UsedDevicesPage() {
  const products = await productsService.getProducts({ condition: 'Used' });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-10">
      <ScrollReveal className="flex flex-col gap-2 border-b border-black/[0.04] dark:border-white/[0.04] pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Certified Pre-Owned</h1>
        <p className="text-sm text-zinc-500">
          Get flagship level specs at a fraction of the price. Hand-inspected with shop warranty.
        </p>
      </ScrollReveal>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.05} direction="up">
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <ScrollReveal className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <p className="text-zinc-555 text-sm">No used devices in stock right now. Check back later!</p>
        </ScrollReveal>
      )}
    </div>
  );
}
