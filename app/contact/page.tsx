import React from 'react';
import { Phone, MapPin, Mail, Clock, MessageSquare } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';
import InquiryForm from '../../components/InquiryForm';
import { productsService } from '../../lib/services/products';

export const revalidate = 0;

export default async function ContactPage() {
  // Try to find a default product to hook the inquiry form, or let it fallback to general
  const products = await productsService.getProducts();
  const sampleProduct = products.length > 0 ? products[0] : null;

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-16">
      
      {/* Page Header */}
      <section className="flex flex-col gap-3 border-b border-black/[0.04] dark:border-white/[0.04] pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">Contact & Store Location</h1>
        <p className="text-sm text-zinc-500">
          Have questions or want to inspect a device in person? Visit our store or get in touch.
        </p>
      </section>

      {/* Main Grid: Info columns + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Contact details & Hours */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <ScrollReveal className="flex flex-col gap-6">
            <h2 className="text-xl font-bold">Store Details</h2>
            
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Our Address</span>
                  <span className="text-sm text-zinc-800 dark:text-zinc-200 mt-1 leading-relaxed">
                    123 Luxury Avenue, Electronics Hub,<br />
                    Suite 404, Cupertino, CA 95014
                  </span>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Call Support</span>
                  <a href="tel:+1234567890" className="text-sm text-zinc-800 dark:text-zinc-200 mt-1 hover:text-gold-500 transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Email Inquiry</span>
                  <a href="mailto:info@nextron.com" className="text-sm text-zinc-800 dark:text-zinc-200 mt-1 hover:text-gold-500 transition-colors">
                    info@nextron.com
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Business Hours</span>
                  <span className="text-sm text-zinc-800 dark:text-zinc-200 mt-1 leading-relaxed">
                    Monday - Saturday: 9:00 AM - 8:00 PM<br />
                    Sunday: 11:00 AM - 5:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Right Column: Embedded Map Placeholder + Inquiry Form */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Map placeholder */}
          <ScrollReveal direction="left" className="relative h-64 w-full rounded-3xl overflow-hidden border border-black/[0.03] dark:border-white/[0.04] bg-zinc-100 dark:bg-zinc-900/30 flex items-center justify-center">
            <div className="absolute inset-0 bg-zinc-200 dark:bg-zinc-900 opacity-20 z-0"></div>
            {/* Simple simulated premium dark map grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#808080_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
            <div className="relative z-10 flex flex-col items-center gap-2.5 p-6 text-center">
              <div className="px-3.5 py-1.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-wider">
                Store Location Map
              </div>
              <h4 className="text-xs font-bold mt-2">Nextron Flagship Showroom</h4>
              <p className="text-[10px] text-zinc-500 max-w-xs leading-relaxed">
                Located right opposite the Central Tech Park main gates. Secure basement parking available for shop customers.
              </p>
            </div>
          </ScrollReveal>

          {/* Contact Form */}
          {sampleProduct && (
            <ScrollReveal direction="up" delay={0.1}>
              <InquiryForm productId={sampleProduct.id} productName="General Inquiry" />
            </ScrollReveal>
          )}
        </div>

      </div>

    </div>
  );
}
