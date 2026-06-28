'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface StoreLayoutProps {
  children: React.ReactNode;
}

export default function StoreLayout({ children }: StoreLayoutProps) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-[76px]">{children}</main>
      <Footer />
    </>
  );
}
