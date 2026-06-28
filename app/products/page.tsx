import React from 'react';
import { productsService } from '../../lib/services/products';
import { categoriesService } from '../../lib/services/categories';
import { brandsService } from '../../lib/services/brands';
import ProductCard from '../../components/ProductCard';
import ProductFilters from '../../components/ProductFilters';
import ScrollReveal from '../../components/ScrollReveal';

export const revalidate = 0; // Dynamic catalog page

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    condition?: string;
    minPrice?: string;
    maxPrice?: string;
    search?: string;
    sort?: string;
    featured?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;

  // Resolve filters from query params
  const categorySlug = resolvedParams.category;
  const brandSlug = resolvedParams.brand;
  const condition = resolvedParams.condition as 'Brand New' | 'Used' | undefined;
  const minPrice = resolvedParams.minPrice ? Number(resolvedParams.minPrice) : undefined;
  const maxPrice = resolvedParams.maxPrice ? Number(resolvedParams.maxPrice) : undefined;
  const search = resolvedParams.search;
  const sortBy = (resolvedParams.sort || 'newest') as 'newest' | 'price_asc' | 'price_desc';
  const isFeatured = resolvedParams.featured === 'true' ? true : undefined;

  // Fetch filters data and matching products concurrently
  const [categories, brands, products] = await Promise.all([
    categoriesService.getCategories(),
    brandsService.getBrands(),
    productsService.getProducts({
      search,
      categorySlug,
      brandSlug,
      condition,
      minPrice,
      maxPrice,
      sortBy,
      isFeatured,
    }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 flex flex-col gap-10">
      
      {/* Page Title & Count */}
      <ScrollReveal className="flex flex-col gap-2 border-b border-black/[0.04] dark:border-white/[0.04] pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Explore Products</h1>
        <p className="text-sm text-zinc-500">
          Showing {products.length} {products.length === 1 ? 'device' : 'devices'} matching your selection
        </p>
      </ScrollReveal>

      {/* Grid Layout (Filters Sidebar + Products Grid) */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* Sidebar Filters */}
        <ScrollReveal direction="right" duration={0.5} className="w-full lg:w-auto">
          <ProductFilters categories={categories} brands={brands} />
        </ScrollReveal>

        {/* Products Grid / Empty state */}
        <div className="flex-1 w-full">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, i) => (
                <ScrollReveal key={product.id} delay={(i % 3) * 0.05} direction="up">
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <ScrollReveal className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
              <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-650 text-xl font-bold mb-4">
                !
              </div>
              <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 mb-2">No Products Found</h3>
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed mb-6">
                We couldn't find any products matching your specific filters. Try searching for something else or clearing some filter conditions.
              </p>
            </ScrollReveal>
          )}
        </div>

      </div>

    </div>
  );
}
