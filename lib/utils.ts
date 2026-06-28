import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function getWhatsAppInquiryUrl(productName: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890';
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const message = `Hi, I’m interested in ${productName}. Is it available?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function getWhatsAppGeneralUrl(): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+1234567890';
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  const message = `Hi, I have a question about products in your shop!`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
