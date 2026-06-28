'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Save, X, Search, Check, 
  AlertTriangle, Filter, CheckCircle2, XCircle
} from 'lucide-react';
import { productsService } from '../../../lib/services/products';
import { categoriesService } from '../../../lib/services/categories';
import { brandsService } from '../../../lib/services/brands';
import { Product, Category, Brand } from '../../../lib/types';
import { formatPrice } from '../../../lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields state
  const [name, setName] = useState('');
  const [brandId, setBrandId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [condition, setCondition] = useState<'Brand New' | 'Used'>('Brand New');
  const [price, setPrice] = useState('');
  const [discountPrice, setDiscountPrice] = useState('');
  const [storage, setStorage] = useState('');
  const [ram, setRam] = useState('');
  const [color, setColor] = useState('');
  const [warranty, setWarranty] = useState('');
  const [availability, setAvailability] = useState<'In Stock' | 'Sold Out'>('In Stock');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);
  const [isOffer, setIsOffer] = useState(false);
  const [imageUrls, setImageUrls] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [allProducts, allCategories, allBrands] = await Promise.all([
        productsService.getProducts(),
        categoriesService.getCategories(),
        brandsService.getBrands(),
      ]);
      setProducts(allProducts);
      setCategories(allCategories);
      setBrands(allBrands);
    } catch (e) {
      console.error('Error loading inventory:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAddForm = () => {
    setEditingProduct(null);
    setName('');
    setBrandId(brands[0]?.id || '');
    setCategoryId(categories[0]?.id || '');
    setCondition('Brand New');
    setPrice('');
    setDiscountPrice('');
    setStorage('');
    setRam('');
    setColor('');
    setWarranty('');
    setAvailability('In Stock');
    setShortDescription('');
    setFullDescription('');
    setIsFeatured(false);
    setIsNewArrival(false);
    setIsOffer(false);
    setImageUrls('');
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setBrandId(product.brand_id);
    setCategoryId(product.category_id);
    setCondition(product.condition);
    setPrice(product.price.toString());
    setDiscountPrice(product.discount_price?.toString() || '');
    setStorage(product.storage || '');
    setRam(product.ram || '');
    setColor(product.color || '');
    setWarranty(product.warranty || '');
    setAvailability(product.availability);
    setShortDescription(product.short_description);
    setFullDescription(product.full_description || '');
    setIsFeatured(product.is_featured);
    setIsNewArrival(product.is_new_arrival);
    setIsOffer(product.is_offer);
    
    // Join image URLs by comma
    const urls = product.images?.map(img => img.image_url).join(', ') || '';
    setImageUrls(urls);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !shortDescription) return;

    // Split image urls
    const imgUrlsArray = imageUrls
      .split(',')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    const productPayload: any = {
      name,
      brand_id: brandId,
      category_id: categoryId,
      condition,
      price: Number(price),
      discount_price: discountPrice ? Number(discountPrice) : undefined,
      storage: storage || undefined,
      ram: ram || undefined,
      color: color || undefined,
      warranty: warranty || undefined,
      availability,
      short_description: shortDescription,
      full_description: fullDescription || undefined,
      is_featured: isFeatured,
      is_new_arrival: isNewArrival,
      is_offer: isOffer
    };

    setLoading(true);
    try {
      if (editingProduct) {
        await productsService.updateProduct(editingProduct.id, productPayload, imgUrlsArray);
      } else {
        await productsService.createProduct(productPayload, imgUrlsArray);
      }
      setIsFormOpen(false);
      loadData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      await productsService.deleteProduct(productId);
      setDeleteConfirmId(null);
      loadData();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    const nextAvailability = product.availability === 'In Stock' ? 'Sold Out' : 'In Stock';
    try {
      await productsService.updateProduct(product.id, { availability: nextAvailability });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  // Filter products by search query
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Manage Inventory</h1>
          <p className="text-xs text-zinc-550">Create, edit, or delete items inside Nextron product catalog.</p>
        </div>
        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Search Filter input */}
      <div className="relative w-full max-w-md">
        <input
          type="text"
          placeholder="Filter inventory by name or brand..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-zinc-900 bg-zinc-900/40 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
      </div>

      {/* Editor Drawer Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl flex flex-col gap-6">
            
            {/* Form Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h2 className="text-lg font-bold text-zinc-100">
                {editingProduct ? `Edit: ${editingProduct.name}` : 'Create New Product'}
              </h2>
              <button onClick={() => setIsFormOpen(false)} aria-label="Close form" className="p-1 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-zinc-350">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs text-zinc-300">
              
              {/* Product Name */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Product Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aero Phone Pro 16"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Brand Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Brand *</label>
                <select
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                  aria-label="Brand"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                >
                  {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              {/* Category Selector */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  aria-label="Category"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                >
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Original Price ($) *</label>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 999"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              {/* Discount Price */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Discount Price ($)</label>
                <input
                  type="number"
                  value={discountPrice}
                  onChange={(e) => setDiscountPrice(e.target.value)}
                  placeholder="e.g. 899 (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              {/* Specs: Storage & RAM */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Storage Size</label>
                <input
                  type="text"
                  value={storage}
                  onChange={(e) => setStorage(e.target.value)}
                  placeholder="e.g. 256GB (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">RAM Size</label>
                <input
                  type="text"
                  value={ram}
                  onChange={(e) => setRam(e.target.value)}
                  placeholder="e.g. 8GB (Optional)"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              {/* Specs: Color & Warranty */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Color</label>
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="e.g. Titanium Black"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Warranty</label>
                <input
                  type="text"
                  value={warranty}
                  onChange={(e) => setWarranty(e.target.value)}
                  placeholder="e.g. 1 Year Brand Warranty"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              {/* Condition & Availability */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Condition</label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  aria-label="Condition"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Used">Used / Pre-Owned</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Availability</label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value as any)}
                  aria-label="Availability"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Sold Out">Sold Out</option>
                </select>
              </div>

              {/* Image URLs */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Product Images (URLs separated by comma)</label>
                <input
                  type="text"
                  value={imageUrls}
                  onChange={(e) => setImageUrls(e.target.value)}
                  placeholder="e.g. /images/phone.png, /images/laptop.png"
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
                <span className="text-[10px] text-zinc-500 font-medium">Leave blank to let Nextron automatically select a category placeholder.</span>
              </div>

              {/* Descriptions */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Short Description *</label>
                <input
                  type="text"
                  required
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  placeholder="Summarize key selling points..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Full Description</label>
                <textarea
                  rows={4}
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  placeholder="Describe full hardware specs, design material, performance metrics..."
                  className="w-full px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-200 focus:outline-none resize-none"
                />
              </div>

              {/* Visibility flags */}
              <div className="flex gap-6 md:col-span-2 py-2">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-zinc-400 hover:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-zinc-800 bg-zinc-950 text-gold-500 focus:ring-0 focus:ring-offset-0 w-4 h-4"
                  />
                  Featured Item
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-zinc-400 hover:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isNewArrival}
                    onChange={(e) => setIsNewArrival(e.target.checked)}
                    className="rounded border-zinc-800 bg-zinc-950 text-gold-500 focus:ring-0 w-4 h-4"
                  />
                  New Arrival
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-zinc-400 hover:text-zinc-200">
                  <input
                    type="checkbox"
                    checked={isOffer}
                    onChange={(e) => setIsOffer(e.target.checked)}
                    className="rounded border-zinc-800 bg-zinc-950 text-gold-500 focus:ring-0 w-4 h-4"
                  />
                  Special Offer
                </label>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 md:col-span-2 pt-4 border-t border-zinc-800 mt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-3 rounded-xl border border-zinc-800 hover:bg-white/5 font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-zinc-950 font-bold uppercase tracking-wider flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 w-full max-w-sm flex flex-col gap-4 text-center items-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
            <h3 className="text-base font-bold text-zinc-100">Delete Product?</h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Are you sure you want to delete this product? This action cannot be undone and will permanently remove it from the catalog.
            </p>
            <div className="flex gap-3 w-full mt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 rounded-xl border border-zinc-800 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                No, Keep
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteConfirmId)}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-650 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table Card */}
      <div className="rounded-3xl border border-zinc-900 bg-zinc-900/30 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-zinc-400">
            <thead className="bg-zinc-950/60 border-b border-zinc-900 text-zinc-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Brand / Category</th>
                <th className="px-6 py-4">Condition</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4 text-center">Availability</th>
                <th className="px-6 py-4 text-center">Badges</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.01]">
                    {/* Title */}
                    <td className="px-6 py-4 font-bold text-zinc-200">
                      <div className="flex flex-col">
                        <span>{p.name}</span>
                        {(p.storage || p.ram) && (
                          <span className="text-[10px] text-zinc-500 font-medium">
                            {[p.storage, p.ram].filter(Boolean).join(' / ')}
                          </span>
                        )}
                      </div>
                    </td>
                    
                    {/* Brand / Category */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span>{p.brand?.name || 'Unknown'}</span>
                        <span className="text-[10px] text-zinc-500 font-medium">{p.category?.name || 'Unknown'}</span>
                      </div>
                    </td>

                    {/* Condition */}
                    <td className="px-6 py-4">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                        p.condition === 'Brand New' 
                          ? 'bg-zinc-100 text-zinc-950 font-semibold' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {p.condition}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-bold text-zinc-200">
                      {p.discount_price ? (
                        <div className="flex flex-col">
                          <span>{formatPrice(p.discount_price)}</span>
                          <span className="text-[10px] text-zinc-500 line-through font-normal">{formatPrice(p.price)}</span>
                        </div>
                      ) : (
                        <span>{formatPrice(p.price)}</span>
                      )}
                    </td>

                    {/* Availability */}
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleAvailability(p)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer select-none transition-colors ${
                          p.availability === 'In Stock'
                            ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20'
                            : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                        }`}
                        title="Click to toggle availability"
                      >
                        {p.availability === 'In Stock' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            In Stock
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Sold Out
                          </>
                        )}
                      </button>
                    </td>

                    {/* Badges status */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${p.is_featured ? 'bg-blue-500' : 'bg-zinc-850'}`} title="Featured" />
                        <span className={`w-2 h-2 rounded-full ${p.is_new_arrival ? 'bg-purple-500' : 'bg-zinc-850'}`} title="New Arrival" />
                        <span className={`w-2 h-2 rounded-full ${p.is_offer ? 'bg-red-500' : 'bg-zinc-850'}`} title="Special Offer" />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditForm(p)}
                          className="p-2 rounded-lg bg-zinc-950/60 hover:bg-white/5 text-zinc-400 hover:text-zinc-100 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-2 rounded-lg bg-zinc-950/60 hover:bg-red-500/10 text-zinc-500 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-650">
                    No products found matching your filter queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
