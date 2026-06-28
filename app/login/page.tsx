'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Mail, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';
import { authService } from '../../lib/services/auth';
import { isSupabaseConfigured } from '../../lib/supabase';
import ScrollReveal from '../../components/ScrollReveal';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Check if already logged in and redirect to admin
  useEffect(() => {
    const checkSession = async () => {
      const session = await authService.getCurrentSession();
      if (session?.role === 'admin') {
        router.push('/admin');
      }
    };
    checkSession();
  }, [router]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await authService.signInWithOtp(email);
      if (res.success) {
        setMessage(res.message);
        setStep('otp');
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otpCode) return;

    setLoading(true);
    setError('');

    try {
      const res = await authService.verifyOtp(email, otpCode);
      if (res.success && res.session?.role === 'admin') {
        router.push('/admin');
      } else if (res.success && res.session?.role !== 'admin') {
        setError('Access denied. You do not have administrator privileges.');
        await authService.logout();
      } else {
        setError(res.error || 'Invalid code.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoBypass = async () => {
    setLoading(true);
    setError('');
    
    try {
      const res = await authService.verifyOtp('demo@nextron.com', '123456');
      if (res.success) {
        router.push('/admin');
      } else {
        setError(res.error || 'Demo bypass failed.');
      }
    } catch (err: any) {
      setError('Demo bypass failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-6 bg-zinc-50 dark:bg-black/20">
      
      <ScrollReveal className="w-full max-w-md rounded-3xl p-8 glass-card shadow-2xl relative overflow-hidden">
        
        {/* Brand Banner */}
        <div className="flex flex-col items-center text-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-white shadow-md">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-gradient-gold">
            NEXTRON ADMIN PORTAL
          </h2>
          <p className="text-xs text-zinc-500">
            Verify credentials to access catalog management and customer requests feed.
          </p>
        </div>

        {/* Info/Error Banners */}
        {message && (
          <div className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold leading-relaxed">
            {error}
          </div>
        )}

        {/* Login Step Forms */}
        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@nextron.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-850 dark:hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? 'Requesting OTP...' : 'Send Verification OTP'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                One-Time Passcode (OTP)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 123456"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-center tracking-[0.5em] font-mono focus:outline-none focus:ring-2 focus:ring-gold-500/20"
                />
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('email')}
                className="flex-1 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 py-3.5 rounded-xl bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-850 dark:hover:bg-zinc-200 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>
            </div>
          </form>
        )}

        {/* Demo Bypass Option (Visible when not configured OR for quick testing) */}
        <div className="mt-8 pt-6 border-t border-black/[0.04] dark:border-white/[0.04] flex flex-col gap-3">
          <div className="p-3 rounded-2xl bg-gold-500/5 border border-gold-500/10 text-center">
            <span className="text-[10px] text-gold-600 dark:text-gold-500 font-bold uppercase tracking-wider block">
              {!isSupabaseConfigured ? 'Mock Sandbox Mode Active' : 'Reviewer Sandbox Access'}
            </span>
            <span className="text-[10px] text-zinc-400 leading-tight block mt-1">
              {!isSupabaseConfigured 
                ? 'Supabase credentials are not configured. Use the instant bypass to test the dashboard.'
                : 'You can bypass normal OTP codes for quick evaluation of admin forms.'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleDemoBypass}
            disabled={loading}
            className="flex items-center justify-center gap-1.5 w-full py-3 rounded-xl border border-dashed border-gold-500/30 text-gold-600 hover:text-gold-500 dark:text-gold-500 dark:hover:text-gold-450 hover:bg-gold-500/[0.02] text-xs font-semibold transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            Quick Demo Bypass
          </button>
        </div>

      </ScrollReveal>

    </div>
  );
}
