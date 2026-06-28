import { supabase, isSupabaseConfigured } from '../supabase';
import { Category } from '../types';
import { getMockCategories, saveMockCategory } from '../mockData';
import { generateSlug } from './products';

export const categoriesService = {
  async getCategories(): Promise<Category[]> {
    if (!isSupabaseConfigured) {
      return getMockCategories();
    }

    try {
      const { data, error } = await supabase!
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Category[];
    } catch (e) {
      console.error('Supabase getCategories error, falling back to mock:', e);
      return getMockCategories();
    }
  },

  async createCategory(name: string, icon?: string): Promise<Category> {
    const slug = generateSlug(name);
    const id = typeof crypto !== 'undefined' ? crypto.randomUUID() : `cat-${Date.now()}`;
    const newCategory: Category = { id, name, slug, icon, created_at: new Date().toISOString() };

    if (!isSupabaseConfigured) {
      saveMockCategory(newCategory);
      return newCategory;
    }

    try {
      const { data, error } = await supabase!
        .from('categories')
        .insert({ name, slug, icon })
        .select()
        .single();

      if (error) throw error;
      return data as Category;
    } catch (e) {
      console.error('Supabase createCategory error, using mock:', e);
      saveMockCategory(newCategory);
      return newCategory;
    }
  }
};
