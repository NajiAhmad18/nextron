'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage first, then OS preference
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else if (stored === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Use OS preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full" style={{ background: 'var(--bg-secondary)' }} />
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
      }}
    >
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: isDark ? 0 : 1, transform: isDark ? 'rotate(90deg) scale(0.5)' : 'rotate(0deg) scale(1)' }}
      >
        <Sun className="w-4 h-4" />
      </span>
      <span
        className="absolute inset-0 flex items-center justify-center transition-all duration-300"
        style={{ opacity: isDark ? 1 : 0, transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.5)' }}
      >
        <Moon className="w-4 h-4" />
      </span>
    </button>
  );
}
