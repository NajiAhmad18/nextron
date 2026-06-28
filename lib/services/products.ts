import { supabase, isSupabaseConfigured } from '../supabase';
import { Product } from '../types';
import { getMockProducts, saveMockProduct, deleteMockProduct } from '../mockData';

// Helper to convert plain string to slug
export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const productsService = {
  async getProducts(filters?: {
    search?: string;
    categorySlug?: string;
    brandSlug?: string;
    condition?: 'Brand New' | 'Used';
    availability?: 'In Stock' | 'Sold Out';
    minPrice?: number;
    maxPrice?: number;
    isFeatured?: boolean;
    isNewArrival?: boolean;
    isOffer?: boolean;
    sortBy?: 'newest' | 'price_asc' | 'price_desc';
  }): Promise<Product[]> {
    if (!isSupabaseConfigured) {
      let items = getMockProducts();

      // Apply Filters
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        items = items.filter(p => p.name.toLowerCase().includes(query) || p.short_description.toLowerCase().includes(query));
      }
      if (filters?.categorySlug) {
        items = items.filter(p => p.category?.slug === filters.categorySlug);
      }
      if (filters?.brandSlug) {
        items = items.filter(p => p.brand?.slug === filters.brandSlug);
      }
      if (filters?.condition) {
        items = items.filter(p => p.condition === filters.condition);
      }
      if (filters?.availability) {
        items = items.filter(p => p.availability === filters.availability);
      }
      if (filters?.minPrice !== undefined) {
        items = items.filter(p => p.price >= filters.minPrice!);
      }
      if (filters?.maxPrice !== undefined) {
        items = items.filter(p => p.price <= filters.maxPrice!);
      }
      if (filters?.isFeatured !== undefined) {
        items = items.filter(p => p.is_featured === filters.isFeatured);
      }
      if (filters?.isNewArrival !== undefined) {
        items = items.filter(p => p.is_new_arrival === filters.isNewArrival);
      }
      if (filters?.isOffer !== undefined) {
        items = items.filter(p => p.is_offer === filters.isOffer);
      }

      // Sort
      if (filters?.sortBy === 'price_asc') {
        items.sort((a, b) => a.price - b.price);
      } else if (filters?.sortBy === 'price_desc') {
        items.sort((a, b) => b.price - a.price);
      } else {
        // newest (default)
        items.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
      }

      return items;
    }

    // Supabase Mode
    try {
      let query = supabase!
        .from('products')
        .select('*, brand:brands(*), category:categories(*), images:product_images(*)');

      if (filters?.isFeatured !== undefined) {
        query = query.eq('is_featured', filters.isFeatured);
      }
      if (filters?.isNewArrival !== undefined) {
        query = query.eq('is_new_arrival', filters.isNewArrival);
      }
      if (filters?.isOffer !== undefined) {
        query = query.eq('is_offer', filters.isOffer);
      }
      if (filters?.condition) {
        query = query.eq('condition', filters.condition);
      }
      if (filters?.availability) {
        query = query.eq('availability', filters.availability);
      }
      if (filters?.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice);
      }
      if (filters?.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice);
      }
      if (filters?.search) {
        query = query.ilike('name', `%${filters.search}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      let results: Product[] = data as Product[];

      // Post-filtering for relations if needed
      if (filters?.categorySlug) {
        results = results.filter(p => p.category?.slug === filters.categorySlug);
      }
      if (filters?.brandSlug) {
        results = results.filter(p => p.brand?.slug === filters.brandSlug);
      }

      // Post-sorting
      if (filters?.sortBy === 'price_asc') {
        results.sort((a, b) => a.price - b.price);
      } else if (filters?.sortBy === 'price_desc') {
        results.sort((a, b) => b.price - a.price);
      } else {
        // newest
        results.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
      }

      return results;
    } catch (e) {
      console.error('Supabase getProducts error, falling back to mock data:', e);
      return getMockProducts();
    }
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    if (!isSupabaseConfigured) {
      const items = getMockProducts();
      return items.find(p => p.slug === slug) || null;
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .select('*, brand:brands(*), category:categories(*), images:product_images(*)')
        .eq('slug', slug)
        .single();

      if (error) throw error;
      return data as Product;
    } catch (e) {
      console.error(`Supabase getProductBySlug error for slug ${slug}:`, e);
      const items = getMockProducts();
      return items.find(p => p.slug === slug) || null;
    }
  },

  async createProduct(product: Omit<Product, 'id' | 'slug' | 'created_at'>, imageUrls?: string[]): Promise<Product> {
    const slug = generateSlug(product.name);
    const id = typeof crypto !== 'undefined' ? crypto.randomUUID() : `prod-${Date.now()}`;
    const newProduct: Product = {
      ...product,
      id,
      slug,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured) {
      saveMockProduct(newProduct, imageUrls);
      // Retrieve it with populated brand/category relations
      return getMockProducts().find(p => p.id === id) || newProduct;
    }

    try {
      const { data, error } = await supabase!
        .from('products')
        .insert({
          name: product.name,
          slug,
          brand_id: product.brand_id,
          category_id: product.category_id,
          condition: product.condition,
          price: product.price,
          discount_price: product.discount_price || null,
          storage: product.storage || null,
          ram: product.ram || null,
          color: product.color || null,
          warranty: product.warranty || null,
          availability: product.availability,
          short_description: product.short_description,
          full_description: product.full_description || null,
          is_featured: product.is_featured,
          is_new_arrival: product.is_new_arrival,
          is_offer: product.is_offer
        })
        .select()
        .single();

      if (error) throw error;
      const created = data as Product;

      // Handle Image uploads
      if (imageUrls && imageUrls.length > 0) {
        const imageRows = imageUrls.map((url, i) => ({
          product_id: created.id,
          image_url: url,
          is_primary: i === 0
        }));

        const { error: imgError } = await supabase!.from('product_images').insert(imageRows);
        if (imgError) console.error('Error inserting product images:', imgError);
      }

      // Fetch full product details
      const fullProduct = await this.getProductBySlug(slug);
      return fullProduct || created;
    } catch (e) {
      console.error('Supabase createProduct error, using mock:', e);
      saveMockProduct(newProduct, imageUrls);
      return getMockProducts().find(p => p.id === id) || newProduct;
    }
  },

  async updateProduct(id: string, product: Partial<Product>, imageUrls?: string[]): Promise<Product> {
    if (!isSupabaseConfigured) {
      const existing = getMockProducts().find(p => p.id === id);
      if (!existing) throw new Error('Product not found');
      
      const updatedProduct = {
        ...existing,
        ...product,
        slug: product.name ? generateSlug(product.name) : existing.slug
      } as Product;
      
      saveMockProduct(updatedProduct, imageUrls);
      return getMockProducts().find(p => p.id === id)!;
    }

    try {
      const updateData: any = { ...product };
      delete updateData.brand;
      delete updateData.category;
      delete updateData.images;
      if (product.name) {
        updateData.slug = generateSlug(product.name);
      }

      const { data, error } = await supabase!
        .from('products')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      const updated = data as Product;

      // Update images if provided
      if (imageUrls && imageUrls.length > 0) {
        // Delete old images
        await supabase!.from('product_images').delete().eq('product_id', id);

        // Insert new
        const imageRows = imageUrls.map((url, i) => ({
          product_id: id,
          image_url: url,
          is_primary: i === 0
        }));

        await supabase!.from('product_images').insert(imageRows);
      }

      const fullProduct = await this.getProductBySlug(updated.slug);
      return fullProduct || updated;
    } catch (e) {
      console.error('Supabase updateProduct error, using mock:', e);
      const existing = getMockProducts().find(p => p.id === id);
      if (!existing) throw new Error('Product not found');
      const updatedProduct = { ...existing, ...product } as Product;
      saveMockProduct(updatedProduct, imageUrls);
      return getMockProducts().find(p => p.id === id)!;
    }
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (!isSupabaseConfigured) {
      deleteMockProduct(id);
      return true;
    }

    try {
      const { error } = await supabase!.from('products').delete().eq('id', id);
      if (error) throw error;
      return true;
    } catch (e) {
      console.error('Supabase deleteProduct error, using mock:', e);
      deleteMockProduct(id);
      return true;
    }
  }
};
