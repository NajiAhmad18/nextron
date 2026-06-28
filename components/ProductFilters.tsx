'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, SlidersHorizontal, Trash2, ChevronDown } from 'lucide-react';
import { Category, Brand } from '../lib/types';
import { formatPrice } from '../lib/utils';

interface ProductFiltersProps {
  categories: Category[];
  brands: Brand[];
}

export default function ProductFilters({ categories, brands }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State initialized from URL search params
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [condition, setCondition] = useState(searchParams.get('condition') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync state with URL changes (e.g. clicking category link in navbar)
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || '');
    setBrand(searchParams.get('brand') || '');
    setCondition(searchParams.get('condition') || '');
    setMinPrice(searchParams.get('minPrice') || '');
    setMaxPrice(searchParams.get('maxPrice') || '');
    setSort(searchParams.get('sort') || 'newest');
  }, [searchParams]);

  // Apply filters to URL
  const applyFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Reset page to 1 if sorting/filtering
    params.delete('page');

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search });
  };

  const handleClear = () => {
    setSearch('');
    setCategory('');
    setBrand('');
    setCondition('');
    setMinPrice('');
    setMaxPrice('');
    setSort('newest');
    router.push('/products');
  };

  return (
    <div className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
      
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
      </form>

      {/* Expand/Collapse Filters Button (Mobile only) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden flex items-center justify-between w-full p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 text-sm font-semibold"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gold-500" />
          Filter & Sort Catalog
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Filter Body */}
      <div className={`flex flex-col gap-6 ${isExpanded ? 'block' : 'hidden lg:flex'}`}>
        
        {/* Sort Order */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => applyFilters({ sort: e.target.value })}
            aria-label="Sort By"
            className="w-full px-4 py-2.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500 transition-all appearance-none cursor-pointer"
          >
            <option value="newest">Newest Releases</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>

        {/* Categories Tab */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Categories
          </label>
          <div className="flex flex-wrap lg:flex-col gap-1.5">
            <button
              onClick={() => applyFilters({ category: null })}
              className={`px-4 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                category === ''
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => applyFilters({ category: cat.slug })}
                className={`px-4 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                  category === cat.slug
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Selector */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Brands
          </label>
          <div className="flex flex-wrap lg:flex-col gap-1.5">
            <button
              onClick={() => applyFilters({ brand: null })}
              className={`px-4 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                brand === ''
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                  : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              All Brands
            </button>
            {brands.map((br) => (
              <button
                key={br.id}
                onClick={() => applyFilters({ brand: br.slug })}
                className={`px-4 py-2 rounded-xl text-xs font-medium text-left transition-all ${
                  brand === br.slug
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-black font-semibold shadow-sm'
                    : 'hover:bg-black/5 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {br.name}
              </button>
            ))}
          </div>
        </div>

        {/* Condition Filter */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Condition
          </label>
          <div className="flex gap-2">
            {['', 'Brand New', 'Used'].map((cond) => (
              <button
                key={cond}
                onClick={() => applyFilters({ condition: cond || null })}
                className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center border transition-all ${
                  condition === cond
                    ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-white dark:text-black dark:border-white shadow-sm'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {cond || 'All'}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col gap-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Price Range ($)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              onBlur={() => applyFilters({ minPrice })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
            <span className="text-zinc-400 text-xs">-</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              onBlur={() => applyFilters({ maxPrice })}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
        </div>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:border-red-500/20 dark:hover:border-red-500/20 text-xs font-bold uppercase tracking-wider transition-colors mt-2"
        >
          <Trash2 className="w-4 h-4" />
          Reset Filters
        </button>

      </div>
    </div>
  );
}
