'use client';

import React, { useState, useEffect } from 'react';
import { FolderGit, Plus, Save } from 'lucide-react';
import { categoriesService } from '../../../lib/services/categories';
import { brandsService } from '../../../lib/services/brands';
import { Category, Brand } from '../../../lib/types';

export default function AdminCategoriesBrandsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [catName, setCatName] = useState('');
  const [catIcon, setCatIcon] = useState('Smartphone');
  const [brandName, setBrandName] = useState('');
  const [brandLogo, setBrandLogo] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [allCats, allBrands] = await Promise.all([
        categoriesService.getCategories(),
        brandsService.getBrands()
      ]);
      setCategories(allCats);
      setBrands(allBrands);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName) return;

    setLoading(true);
    try {
      await categoriesService.createCategory(catName, catIcon);
      setCatName('');
      loadData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleAddBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;

    setLoading(true);
    try {
      await brandsService.createBrand(brandName, brandLogo || undefined);
      setBrandName('');
      setBrandLogo('');
      loadData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (loading && categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
        Loading collections details...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Categories & Brands</h1>
        <p className="text-xs text-zinc-505">Organize your store catalog with filter groupings and tags.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Categories Section */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/60 pb-4">
            Manage Categories
          </h3>

          {/* Add Category Form */}
          <form onSubmit={handleAddCategory} className="flex flex-col gap-4 text-xs text-zinc-300">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Category Name</label>
              <input
                type="text"
                required
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="e.g. Tablets"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Icon Tag</label>
              <select
                value={catIcon}
                onChange={(e) => setCatIcon(e.target.value)}
                aria-label="Icon Tag"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
              >
                <option value="Smartphone">Smartphone</option>
                <option value="Laptop">Laptop</option>
                <option value="Watch">Watch (Wearables)</option>
                <option value="Headphones">Headphones (Audio)</option>
                <option value="Usb">Usb (Accessories)</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-wider self-start flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
          </form>

          {/* Categories list */}
          <div className="mt-4 border-t border-zinc-900 pt-6 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-zinc-500">Current Categories ({categories.length})</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {categories.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-between">
                  <span className="font-semibold text-zinc-300">{c.name}</span>
                  <span className="text-[10px] text-zinc-600 font-mono italic">({c.icon || 'default'})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/60 pb-4">
            Manage Brands
          </h3>

          {/* Add Brand Form */}
          <form onSubmit={handleAddBrand} className="flex flex-col gap-4 text-xs text-zinc-300">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Brand Name</label>
              <input
                type="text"
                required
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. HyperX"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Logo Image URL</label>
              <input
                type="text"
                value={brandLogo}
                onChange={(e) => setBrandLogo(e.target.value)}
                placeholder="e.g. /images/brand_logo.png (Optional)"
                className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-wider self-start flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Add Brand
            </button>
          </form>

          {/* Brands list */}
          <div className="mt-4 border-t border-zinc-900 pt-6 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-zinc-500">Current Brands ({brands.length})</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {brands.map(b => (
                <div key={b.id} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-900 flex items-center justify-between">
                  <span className="font-semibold text-zinc-300">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
