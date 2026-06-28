'use client';

import React, { useState, useEffect } from 'react';
import { MailOpen, Check, Phone, Clock, ShoppingBag } from 'lucide-react';
import { inquiriesService } from '../../../lib/services/inquiries';
import { Inquiry } from '../../../lib/types';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const all = await inquiriesService.getInquiries();
      setInquiries(all);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkReplied = async (id: string) => {
    try {
      await inquiriesService.markAsReplied(id);
      fetchInquiries(); // reload list
    } catch (e) {
      console.error(e);
    }
  };

  if (loading && inquiries.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-zinc-500 text-sm">
        Loading inquiries logs...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      
      {/* Title */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Customer Inquiries</h1>
        <p className="text-xs text-zinc-550">Review and resolve customer questions submitted via product forms.</p>
      </div>

      {/* List */}
      <div className="rounded-3xl border border-zinc-900 bg-zinc-900/30 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-zinc-400">
            <thead className="bg-zinc-950/60 border-b border-zinc-900 text-zinc-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Message</th>
                <th className="px-6 py-4">Inquiry Date</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-900">
              {inquiries.length > 0 ? (
                inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/[0.01]">
                    
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-200">{inq.customer_name}</span>
                        <a 
                          href={`tel:${inq.customer_phone}`} 
                          className="text-[10px] text-zinc-500 flex items-center gap-1 hover:text-gold-500 mt-0.5"
                        >
                          <Phone className="w-3 h-3" />
                          {inq.customer_phone}
                        </a>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="px-6 py-4 font-semibold text-zinc-300">
                      {inq.product ? (
                        <div className="flex items-center gap-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                          <span>{inq.product.name}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-600">General Shop Inquiry</span>
                      )}
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-zinc-400 leading-relaxed italic line-clamp-2" title={inq.message}>
                        "{inq.message}"
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{new Date(inq.created_at || '').toLocaleDateString()}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        inq.status === 'Pending'
                          ? 'bg-gold-500/10 text-gold-500 border border-gold-500/20'
                          : 'bg-green-500/10 text-green-500 border border-green-500/20'
                      }`}>
                        {inq.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      {inq.status === 'Pending' ? (
                        <button
                          onClick={() => handleMarkReplied(inq.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-white/5 border border-zinc-800 text-zinc-300 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ml-auto"
                        >
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          Mark Checked
                        </button>
                      ) : (
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mr-2 select-none">
                          Completed
                        </span>
                      )}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-650">
                    No inquiries received yet.
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
