import { supabase, isSupabaseConfigured } from '../supabase';
import { Inquiry } from '../types';
import { getMockInquiries, saveMockInquiry } from '../mockData';

export const inquiriesService = {
  async getInquiries(): Promise<Inquiry[]> {
    if (!isSupabaseConfigured) {
      return getMockInquiries();
    }

    try {
      const { data, error } = await supabase!
        .from('inquiries')
        .select('*, product:products(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Inquiry[];
    } catch (e) {
      console.error('Supabase getInquiries error, falling back to mock:', e);
      return getMockInquiries();
    }
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>): Promise<Inquiry> {
    const id = typeof crypto !== 'undefined' ? crypto.randomUUID() : `inq-${Date.now()}`;
    const newInquiry: Inquiry = {
      ...inquiry,
      id,
      status: 'Pending',
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured) {
      saveMockInquiry(newInquiry);
      return getMockInquiries().find(i => i.id === id) || newInquiry;
    }

    try {
      const { data, error } = await supabase!
        .from('inquiries')
        .insert({
          product_id: inquiry.product_id,
          customer_name: inquiry.customer_name,
          customer_phone: inquiry.customer_phone,
          message: inquiry.message,
          status: 'Pending'
        })
        .select()
        .single();

      if (error) throw error;
      return data as Inquiry;
    } catch (e) {
      console.error('Supabase createInquiry error, using mock:', e);
      saveMockInquiry(newInquiry);
      return getMockInquiries().find(i => i.id === id) || newInquiry;
    }
  },

  async markAsReplied(id: string): Promise<Inquiry> {
    if (!isSupabaseConfigured) {
      const inquiries = getMockInquiries();
      const existing = inquiries.find(i => i.id === id);
      if (!existing) throw new Error('Inquiry not found');
      const updated = { ...existing, status: 'Replied' as const };
      saveMockInquiry(updated);
      return getMockInquiries().find(i => i.id === id)!;
    }

    try {
      const { data, error } = await supabase!
        .from('inquiries')
        .update({ status: 'Replied' })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Inquiry;
    } catch (e) {
      console.error('Supabase markAsReplied error, using mock:', e);
      const inquiries = getMockInquiries();
      const existing = inquiries.find(i => i.id === id);
      if (!existing) throw new Error('Inquiry not found');
      const updated = { ...existing, status: 'Replied' as const };
      saveMockInquiry(updated);
      return getMockInquiries().find(i => i.id === id)!;
    }
  }
};
