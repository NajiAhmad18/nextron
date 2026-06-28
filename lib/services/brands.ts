import { supabase, isSupabaseConfigured } from '../supabase';
import { Brand } from '../types';
import { getMockBrands, saveMockBrand } from '../mockData';
import { generateSlug } from './products';

export const brandsService = {
  async getBrands(): Promise<Brand[]> {
    if (!isSupabaseConfigured) {
      return getMockBrands();
    }

    try {
      const { data, error } = await supabase!
        .from('brands')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Brand[];
    } catch (e) {
      console.error('Supabase getBrands error, falling back to mock:', e);
      return getMockBrands();
    }
  },

  async createBrand(name: string, logoUrl?: string): Promise<Brand> {
    const slug = generateSlug(name);
    const id = typeof crypto !== 'undefined' ? crypto.randomUUID() : `br-${Date.now()}`;
    const newBrand: Brand = { id, name, slug, logo_url: logoUrl, created_at: new Date().toISOString() };

    if (!isSupabaseConfigured) {
      saveMockBrand(newBrand);
      return newBrand;
    }

    try {
      const { data, error } = await supabase!
        .from('brands')
        .insert({ name, slug, logo_url: logoUrl })
        .select()
        .single();

      if (error) throw error;
      return data as Brand;
    } catch (e) {
      console.error('Supabase createBrand error, using mock:', e);
      saveMockBrand(newBrand);
      return newBrand;
    }
  }
};
