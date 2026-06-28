'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { inquiriesService } from '../lib/services/inquiries';

interface InquiryFormProps {
  productId: string;
  productName: string;
}

export default function InquiryForm({ productId, productName }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Hi, I'm interested in ${productName}. Is it available?`);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setStatus('submitting');
    try {
      await inquiriesService.createInquiry({
        product_id: productId,
        customer_name: name,
        customer_phone: phone,
        message: message
      });
      setStatus('success');
      setName('');
      setPhone('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-6 rounded-3xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/30 text-center flex flex-col items-center gap-3">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <h3 className="text-base font-bold text-green-900 dark:text-green-400">Inquiry Sent Successfully!</h3>
        <p className="text-xs text-green-700 dark:text-green-500/80 leading-relaxed">
          Thank you for your interest. Our shop team has received your message and will reach out to you shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs font-semibold text-green-800 dark:text-green-400 hover:underline"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900/30 border border-black/[0.03] dark:border-white/[0.04] flex flex-col gap-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Inquire In-Store
      </h3>
      <p className="text-xs text-zinc-500">
        Submit this form and our sales representatives will contact you directly.
      </p>

      {/* Name Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Your Name
        </label>
        <input
          type="text"
          placeholder="e.g. John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
        />
      </div>

      {/* Phone Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Your Phone
        </label>
        <input
          type="tel"
          placeholder="e.g. +1 555-0199"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
        />
      </div>

      {/* Message Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="inquiry-message" className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          Message
        </label>
        <textarea
          id="inquiry-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-[10px] text-red-500 font-semibold">
          Error sending inquiry. Please try again.
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-850 dark:hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
        <Send className="w-3.5 h-3.5" />
      </button>
    </form>
  );
}
