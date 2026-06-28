'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, CheckCircle2, AlertCircle, Inbox, 
  MessageSquare, ArrowUpRight, Check, Clock 
} from 'lucide-react';
import { productsService } from '../../lib/services/products';
import { inquiriesService } from '../../lib/services/inquiries';
import { Product, Inquiry } from '../../lib/types';
import { formatPrice } from '../../lib/utils';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [allProducts, allInquiries] = await Promise.all([
        productsService.getProducts(),
        inquiriesService.getInquiries(),
      ]);
      setProducts(allProducts);
      setInquiries(allInquiries);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMarkReplied = async (inqId: string) => {
    try {
      await inquiriesService.markAsReplied(inqId);
      fetchData(); // Refresh counts
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
        Loading dashboard metrics...
      </div>
    );
  }

  // Calculate metrics
  const totalProducts = products.length;
  const inStockProducts = products.filter(p => p.availability === 'In Stock').length;
  const soldProducts = products.filter(p => p.availability === 'Sold Out').length;
  const totalInquiries = inquiries.length;
  const pendingInquiries = inquiries.filter(i => i.status === 'Pending').length;

  const stats = [
    { label: 'Total Products', value: totalProducts, icon: Package, color: 'text-blue-500 bg-blue-500/10' },
    { label: 'Available Stock', value: inStockProducts, icon: CheckCircle2, color: 'text-green-500 bg-green-500/10' },
    { label: 'Items Sold Out', value: soldProducts, icon: AlertCircle, color: 'text-zinc-500 bg-zinc-500/10' },
    { label: 'Pending Inquiries', value: pendingInquiries, icon: Inbox, color: 'text-gold-500 bg-gold-500/10' },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Stats Overview</h1>
        <p className="text-xs text-zinc-500">Live operational stats for Nextron storefront.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-zinc-500 font-semibold">{stat.label}</span>
                <span className="text-2xl font-black">{stat.value}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent inquiries & Shortcut buttons */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* Recent Inquiries List */}
        <div className="xl:col-span-8 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 flex flex-col gap-6">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400">
              Recent Customer Inquiries
            </h3>
            <Link
              href="/admin/inquiries"
              className="text-xs font-semibold text-gold-500 hover:text-gold-450 transition-colors flex items-center gap-1"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentInquiries.length > 0 ? (
            <div className="flex flex-col gap-4">
              {recentInquiries.map((inq) => (
                <div 
                  key={inq.id} 
                  className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-2 max-w-lg">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-zinc-100">{inq.customer_name}</span>
                      <span className="text-[10px] text-zinc-500">{inq.customer_phone}</span>
                      <span className="text-[10px] text-zinc-500">•</span>
                      <span className="text-[10px] text-gold-500 font-semibold truncate max-w-[150px]">
                        {inq.product?.name || 'General'}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed italic">
                      "{inq.message}"
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center shrink-0">
                    {inq.status === 'Pending' ? (
                      <button
                        onClick={() => handleMarkReplied(inq.id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-zinc-950 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Reply / Mark Checked
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-wider">
                        <Check className="w-3.5 h-3.5" />
                        Replied
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-zinc-650 text-xs">
              No inquiries logged yet.
            </div>
          )}
        </div>

        {/* Shortcuts Panel */}
        <div className="xl:col-span-4 p-6 rounded-3xl bg-zinc-900/40 border border-zinc-900 flex flex-col gap-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-800/60 pb-4">
            Quick Actions
          </h3>

          <div className="flex flex-col gap-3">
            <Link
              href="/admin/products"
              className="w-full text-center py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Add New Product
            </Link>
            <Link
              href="/admin/categories-brands"
              className="w-full text-center py-3 rounded-xl border border-zinc-800 hover:bg-white/5 text-zinc-300 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Manage Brands & Categories
            </Link>
            <a
              href="/"
              className="w-full text-center py-3 rounded-xl border border-zinc-800 hover:bg-white/5 text-zinc-500 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Preview Live Site
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
