'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductImage } from '../lib/types';

interface ProductImageGalleryProps {
  images: ProductImage[];
  defaultImage: string;
  productName: string;
}

export default function ProductImageGallery({ images, defaultImage, productName }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(
    images.length > 0 ? images.find(img => img.is_primary)?.image_url || images[0].image_url : defaultImage
  );

  const displayImages = images.length > 0 
    ? images 
    : [{ id: 'default', image_url: defaultImage, is_primary: true }];

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Main Display Container */}
      <div className="relative aspect-square w-full rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden flex items-center justify-center p-8 border border-black/[0.03] dark:border-white/[0.04]">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          className="object-contain p-8 transition-all duration-300"
        />
      </div>

      {/* Thumbnails Row */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto py-1 scrollbar-thin">
          {displayImages.map((img) => (
            <button
              key={img.id}
              onClick={() => setActiveImage(img.image_url)}
              aria-label={`View ${productName} image`}
              className={`relative w-20 h-20 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 overflow-hidden border-2 transition-all p-2 flex items-center justify-center shrink-0 ${
                activeImage === img.image_url
                  ? 'border-gold-500 ring-2 ring-gold-500/20'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-650'
              }`}
            >
              <Image
                src={img.image_url}
                alt={`${productName} thumbnail`}
                width={60}
                height={60}
                className="object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
