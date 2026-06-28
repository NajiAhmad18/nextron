import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreLayout from "../components/StoreLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nextron | Premium Electronics Store",
  description: "Discover next-generation electronics. Buy and sell brand new and certified pre-owned smartphones, laptops, smartwatches, and audio accessories.",
  keywords: "electronics, smartphones, laptops, smartwatches, premium, certified pre-owned",
  openGraph: {
    title: "Nextron | Premium Electronics Store",
    description: "Your destination for premium new and certified pre-owned electronics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <StoreLayout>{children}</StoreLayout>
      </body>
    </html>
  );
}
