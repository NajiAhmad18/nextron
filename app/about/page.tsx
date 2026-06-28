import React from 'react';
import { Award, ShieldCheck, HeartHandshake, Zap, ChevronRight } from 'lucide-react';
import ScrollReveal from '../../components/ScrollReveal';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col gap-20">
      
      {/* Hero header */}
      <section className="flex flex-col gap-4 text-center items-center">
        <ScrollReveal className="flex flex-col gap-2 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-650 dark:text-gold-500">
            About Nextron
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight text-zinc-950 dark:text-white">
            Uncompromising Standards. <br />
            <span className="text-gradient-gold">Redefining Tech Retail.</span>
          </h1>
          <p className="text-zinc-550 text-sm md:text-base leading-relaxed mt-2">
            Established in 2021, Nextron is a local boutique electronics retailer committed to sourcing and delivering premium mobile devices and laptops. We believe premium hardware should be accessible, verified, and protected.
          </p>
        </ScrollReveal>
      </section>

      {/* Grid: Quality Parameters */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <ScrollReveal delay={0.05} className="flex flex-col p-8 rounded-3xl border border-black/[0.03] dark:border-white/[0.04] bg-white dark:bg-zinc-900/20 gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Strict Sourcing</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We partner with reliable distributors and corporate lease programs to curate premium devices. No generic components, no low-grade refurbished units.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="flex flex-col p-8 rounded-3xl border border-black/[0.03] dark:border-white/[0.04] bg-white dark:bg-zinc-900/20 gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Shop Warranties</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Every product goes out with protection. New items carry official manufacturer warranties, and used items come with our signature 3 to 6 months in-house parts-and-labor warranty.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="flex flex-col p-8 rounded-3xl border border-black/[0.03] dark:border-white/[0.04] bg-white dark:bg-zinc-900/20 gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold">Customer First</h3>
          <p className="text-xs text-zinc-500 leading-relaxed">
            We don't do hard sales. Our experts offer consulting to match your budget and needs. Our direct WhatsApp chat connects you to a real human tech expert instantly.
          </p>
        </ScrollReveal>
      </section>

      {/* Showcase Section: 30-Point Diagnostics */}
      <section className="rounded-3xl bg-zinc-950 text-white p-8 md:p-12 border border-white/[0.06] flex flex-col lg:flex-row gap-10 items-center justify-between">
        <ScrollReveal className="flex flex-col gap-4 max-w-lg">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">
            Diagnostics Standards
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Our Certified <span className="text-gradient-gold">30-Point Inspection</span>
          </h2>
          <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
            Before any pre-owned smartphone or laptop hits our showcase, it must pass a rigorous 30-point evaluation conducted by our certified hardware technicians. This checklist covers:
          </p>
          <ul className="grid grid-cols-2 gap-3 text-xs text-zinc-350 mt-2">
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Battery Capacity &gt; 85%</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Display & Dead Pixels</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Camera Focus & Lenses</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Audio & Microphones</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Cellular & Wi-Fi Band</li>
            <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-gold-500 shrink-0" /> Face ID & Fingerprint</li>
          </ul>
        </ScrollReveal>

        <ScrollReveal delay={0.2} className="relative w-full lg:w-96 aspect-video rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-600/30 to-purple-600/20 z-0"></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full p-6 text-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center border border-gold-500/30">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold">In-Store Tech Lab</h4>
            <p className="text-[10px] text-zinc-400 max-w-[240px]">
              Our local shop features a modern static-dissipative hardware inspection lab for certified diagnostics.
            </p>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
