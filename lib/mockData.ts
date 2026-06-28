import { Category, Brand, Product, Inquiry } from './types';

// Pre-seeded Categories
export const defaultCategories: Category[] = [
  { id: 'cat-1', name: 'Phones', slug: 'phones', icon: 'Smartphone' },
  { id: 'cat-2', name: 'Laptops', slug: 'laptops', icon: 'Laptop' },
  { id: 'cat-3', name: 'Wearables', slug: 'wearables', icon: 'Watch' },
  { id: 'cat-4', name: 'Audio', slug: 'audio', icon: 'Headphones' },
  { id: 'cat-5', name: 'Accessories', slug: 'accessories', icon: 'Usb' }
];

// Pre-seeded Brands
export const defaultBrands: Brand[] = [
  { id: 'br-1', name: 'Aero', slug: 'aero', logo_url: '' },
  { id: 'br-2', name: 'Zenith', slug: 'zenith', logo_url: '' },
  { id: 'br-3', name: 'Chronos', slug: 'chronos', logo_url: '' },
  { id: 'br-4', name: 'SonicWave', slug: 'sonicwave', logo_url: '' },
  { id: 'br-5', name: 'Nova', slug: 'nova', logo_url: '' }
];

// Pre-seeded Products
export const defaultProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Aero Phone Pro Ultra',
    slug: 'aero-phone-pro-ultra',
    brand_id: 'br-1',
    category_id: 'cat-1',
    condition: 'Brand New',
    price: 1199,
    discount_price: 1099,
    storage: '256GB',
    ram: '12GB',
    color: 'Titanium Gray',
    warranty: '1 Year Brand Warranty',
    availability: 'In Stock',
    short_description: 'Experience the pinnacle of mobile technology with our new aero-frame mobile featuring triple lenses and dynamic OLED.',
    full_description: 'The Aero Phone Pro Ultra sets a new standard for luxury mobile devices. Crafted with aerospace-grade titanium, it features the ultra-performance Aero 5nm chip, a stunning 120Hz ProMotion display, and a breakthrough 200MP camera system. Its battery life easily lasts two full days of heavy usage. Designed for creators, professionals, and tech enthusiasts.',
    is_featured: true,
    is_new_arrival: true,
    is_offer: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
  },
  {
    id: 'prod-2',
    name: 'ZenithBook Pro 14',
    slug: 'zenithbook-pro-14',
    brand_id: 'br-2',
    category_id: 'cat-2',
    condition: 'Brand New',
    price: 1899,
    discount_price: 1749,
    storage: '512GB',
    ram: '16GB',
    color: 'Midnight Space Gray',
    warranty: '2 Year Zenith Care',
    availability: 'In Stock',
    short_description: 'Stunning carbon-neutral ultraportable laptop engineered for intensive graphic design and heavy compilation work.',
    full_description: 'ZenithBook Pro 14 offers uncompromised power in an ultra-sleek, lightweight chassis. Featuring the Zenith M2 Multi-Core processor, an spectacular Liquid Retina XDR screen with 1600 nits peak brightness, and an array of premium ports (HDMI, SD Card Reader, Thunderbolt 4). It is perfect for software developers, video editors, and sound engineers looking for portable perfection.',
    is_featured: true,
    is_new_arrival: true,
    is_offer: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
  },
  {
    id: 'prod-3',
    name: 'Chronos Smart Watch S3',
    slug: 'chronos-smart-watch-s3',
    brand_id: 'br-3',
    category_id: 'cat-3',
    condition: 'Brand New',
    price: 399,
    storage: '32GB',
    ram: '2GB',
    color: 'Titanium Amber Band',
    warranty: '1 Year Local Warranty',
    availability: 'In Stock',
    short_description: 'Advanced sports smartwatch with a premium titanium finish, long battery, and advanced bio-tracking sensor suite.',
    full_description: 'Take charge of your health and schedule with the Chronos Smart Watch S3. Designed for extreme environments, it features dual-frequency GPS, a military-grade dust-proof design, and real-time blood oxygen, heart-rate, and sleep metrics. The display is visible even under bright direct sunlight. Battery lasts up to 7 days in smartwatch mode.',
    is_featured: true,
    is_new_arrival: false,
    is_offer: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
  },
  {
    id: 'prod-4',
    name: 'SonicWave ANC Headphones',
    slug: 'sonicwave-anc-headphones',
    brand_id: 'br-4',
    category_id: 'cat-4',
    condition: 'Brand New',
    price: 349,
    discount_price: 299,
    color: 'Space Obsidian Black',
    warranty: '1 Year Replacement Warranty',
    availability: 'In Stock',
    short_description: 'Audiophile-grade over-ear headphones with industry-leading Active Noise Cancellation and spatial audio projection.',
    full_description: 'SonicWave ANC Headphones deliver sound in its purest form. With customized 40mm dynamic drivers, support for high-resolution LDAC audio, and premium memory foam ear cushions for long listening sessions. Our active noise cancellation suppresses up to 98% of ambient noise, giving you full isolation. Fast charge provides 5 hours of playback in just 10 minutes.',
    is_featured: false,
    is_new_arrival: true,
    is_offer: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
  },
  {
    id: 'prod-5',
    name: 'Aero Phone Pro 14 (Used)',
    slug: 'aero-phone-pro-14-used',
    brand_id: 'br-1',
    category_id: 'cat-1',
    condition: 'Used',
    price: 799,
    discount_price: 699,
    storage: '128GB',
    ram: '6GB',
    color: 'Deep Violet',
    warranty: '3 Months Shop Warranty',
    availability: 'In Stock',
    short_description: 'Excellent condition (9.5/10), minor micro-scratches on bezel, original screen and 92% battery capacity.',
    full_description: 'This pre-owned Aero Phone Pro 14 is fully tested and verified by our in-store technicians. It is in excellent cosmetic condition with 92% battery health. Comes with an original fast charging cable and a 3-month shop warranty. Perfect for getting flagship performance at a fraction of the cost.',
    is_featured: false,
    is_new_arrival: false,
    is_offer: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString() // 7 days ago
  },
  {
    id: 'prod-6',
    name: 'ZenithBook Air 13 (Used)',
    slug: 'zenithbook-air-13-used',
    brand_id: 'br-2',
    category_id: 'cat-2',
    condition: 'Used',
    price: 999,
    storage: '256GB',
    ram: '8GB',
    color: 'Stardust Silver',
    warranty: '6 Months Care Plus',
    availability: 'Sold Out',
    short_description: 'Lightweight notebook in pristine condition (10/10). No visual blemishes, 95% battery, box included.',
    full_description: 'An immaculate pre-owned ZenithBook Air 13. Features an incredibly thin fanless design, long-lasting battery life, and comfortable typing. Ideal for students and remote workers. Comes with its original retail packaging, charger, and a 6-month shop warranty. Currently Sold Out.',
    is_featured: false,
    is_new_arrival: false,
    is_offer: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString() // 10 days ago
  },
  {
    id: 'prod-7',
    name: 'Nova USB-C Fast Charger 100W',
    slug: 'nova-usb-c-fast-charger-100w',
    brand_id: 'br-5',
    category_id: 'cat-5',
    condition: 'Brand New',
    price: 79,
    discount_price: 59,
    color: 'Glacier White',
    warranty: '6 Months Replacement Warranty',
    availability: 'In Stock',
    short_description: 'GaN technology charger, 4 ports, intelligent power distribution, supports charging laptops and phones.',
    full_description: 'Nova 100W multi-port charger uses gallium nitride (GaN) semiconductor technology to provide high-speed charging in a package 40% smaller than traditional laptop bricks. Features 3x USB-C ports and 1x USB-A port with smart charging power balancing. Over-heat and voltage protection built in.',
    is_featured: false,
    is_new_arrival: false,
    is_offer: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString() // 4 days ago
  }
];

// Seed Images
export const defaultProductImages = [
  { id: 'img-1', product_id: 'prod-1', image_url: '/images/phone.png', is_primary: true },
  { id: 'img-2', product_id: 'prod-2', image_url: '/images/laptop.png', is_primary: true },
  { id: 'img-3', product_id: 'prod-3', image_url: '/images/watch.png', is_primary: true },
  { id: 'img-4', product_id: 'prod-4', image_url: '/images/audio.png', is_primary: true },
  { id: 'img-5', product_id: 'prod-5', image_url: '/images/phone.png', is_primary: true },
  { id: 'img-6', product_id: 'prod-6', image_url: '/images/laptop.png', is_primary: true },
  { id: 'img-7', product_id: 'prod-7', image_url: '/images/hero_bg.png', is_primary: true } // accessories fallback
];

// Pre-seeded Inquiries
export const defaultInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    product_id: 'prod-1',
    customer_name: 'John Doe',
    customer_phone: '+1 555 123 4567',
    message: 'Hi, I’m interested in Aero Phone Pro Ultra. Is it available in Titanium Gray?',
    status: 'Pending',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
  },
  {
    id: 'inq-2',
    product_id: 'prod-3',
    customer_name: 'Sarah Connor',
    customer_phone: '+1 555 987 6543',
    message: 'Hello, what is the best discount price for the Chronos Smart Watch S3? Can I pick it up today?',
    status: 'Replied',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString() // 25 hours ago
  }
];

// Store managers using localStorage
const IS_BROWSER = typeof window !== 'undefined';

function getLocalData<T>(key: string, defaultValue: T): T {
  if (!IS_BROWSER) return defaultValue;
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Error loading key "${key}" from localStorage:`, e);
    return defaultValue;
  }
}

function setLocalData<T>(key: string, value: T): void {
  if (!IS_BROWSER) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving key "${key}" to localStorage:`, e);
  }
}

// In-memory caching for Server-Side Rendering
let categoriesStore = defaultCategories;
let brandsStore = defaultBrands;
let productsStore = defaultProducts;
let productImagesStore = defaultProductImages;
let inquiriesStore = defaultInquiries;

// Expose state accessors
export const getMockCategories = () => {
  categoriesStore = getLocalData('nextron_categories', categoriesStore);
  return categoriesStore;
};

export const saveMockCategory = (category: Category) => {
  const current = getMockCategories();
  const exists = current.findIndex(c => c.id === category.id);
  if (exists >= 0) current[exists] = category;
  else current.push(category);
  categoriesStore = current;
  setLocalData('nextron_categories', current);
};

export const getMockBrands = () => {
  brandsStore = getLocalData('nextron_brands', brandsStore);
  return brandsStore;
};

export const saveMockBrand = (brand: Brand) => {
  const current = getMockBrands();
  const exists = current.findIndex(b => b.id === brand.id);
  if (exists >= 0) current[exists] = brand;
  else current.push(brand);
  brandsStore = current;
  setLocalData('nextron_brands', current);
};

export const getMockProductImages = () => {
  productImagesStore = getLocalData('nextron_product_images', productImagesStore);
  return productImagesStore;
};

export const getMockProducts = () => {
  productsStore = getLocalData('nextron_products', productsStore);
  const images = getMockProductImages();
  const brands = getMockBrands();
  const categories = getMockCategories();

  // Map relations
  return productsStore.map(product => ({
    ...product,
    brand: brands.find(b => b.id === product.brand_id),
    category: categories.find(c => c.id === product.category_id),
    images: images.filter(img => img.product_id === product.id)
  }));
};

export const saveMockProduct = (product: Product, imagesUrls?: string[]) => {
  const currentProducts = getLocalData('nextron_products', defaultProducts);
  const currentImages = getMockProductImages();
  
  // Clean product formatting (exclude relations from serialization)
  const productToSave: Product = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    brand_id: product.brand_id,
    category_id: product.category_id,
    condition: product.condition,
    price: Number(product.price),
    discount_price: product.discount_price ? Number(product.discount_price) : undefined,
    storage: product.storage || undefined,
    ram: product.ram || undefined,
    color: product.color || undefined,
    warranty: product.warranty || undefined,
    availability: product.availability,
    short_description: product.short_description,
    full_description: product.full_description || undefined,
    is_featured: product.is_featured,
    is_new_arrival: product.is_new_arrival,
    is_offer: product.is_offer,
    created_at: product.created_at || new Date().toISOString()
  };

  const pIndex = currentProducts.findIndex(p => p.id === product.id);
  if (pIndex >= 0) currentProducts[pIndex] = productToSave;
  else currentProducts.push(productToSave);

  productsStore = currentProducts;
  setLocalData('nextron_products', currentProducts);

  // Manage Images
  if (imagesUrls && imagesUrls.length > 0) {
    // Remove previous images
    const filteredImages = currentImages.filter(img => img.product_id !== product.id);
    
    // Add new images
    const newImages = imagesUrls.map((url, i) => ({
      id: `img-${product.id}-${i}-${Date.now()}`,
      product_id: product.id,
      image_url: url,
      is_primary: i === 0
    }));

    const finalImages = [...filteredImages, ...newImages];
    productImagesStore = finalImages;
    setLocalData('nextron_product_images', finalImages);
  } else if (!currentImages.some(img => img.product_id === product.id)) {
    // Add a default primary image if none exists
    let defaultImg = '/images/phone.png';
    const cat = getMockCategories().find(c => c.id === product.category_id);
    if (cat?.slug === 'laptops') defaultImg = '/images/laptop.png';
    if (cat?.slug === 'wearables') defaultImg = '/images/watch.png';
    if (cat?.slug === 'audio') defaultImg = '/images/audio.png';
    if (cat?.slug === 'accessories') defaultImg = '/images/hero_bg.png';

    const newImage = {
      id: `img-${product.id}-def-${Date.now()}`,
      product_id: product.id,
      image_url: defaultImg,
      is_primary: true
    };
    currentImages.push(newImage);
    productImagesStore = currentImages;
    setLocalData('nextron_product_images', currentImages);
  }
};

export const deleteMockProduct = (productId: string) => {
  const currentProducts = getLocalData('nextron_products', defaultProducts);
  const currentImages = getMockProductImages();

  const filteredProducts = currentProducts.filter(p => p.id !== productId);
  const filteredImages = currentImages.filter(img => img.product_id !== productId);

  productsStore = filteredProducts;
  productImagesStore = filteredImages;

  setLocalData('nextron_products', filteredProducts);
  setLocalData('nextron_product_images', filteredImages);
};

export const getMockInquiries = () => {
  inquiriesStore = getLocalData('nextron_inquiries', inquiriesStore);
  const products = getMockProducts();

  return inquiriesStore.map(inq => ({
    ...inq,
    product: products.find(p => p.id === inq.product_id)
  })).sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
};

export const saveMockInquiry = (inquiry: Inquiry) => {
  const current = getLocalData('nextron_inquiries', defaultInquiries);
  const exists = current.findIndex(i => i.id === inquiry.id);
  
  if (exists >= 0) current[exists] = inquiry;
  else current.push(inquiry);

  inquiriesStore = current;
  setLocalData('nextron_inquiries', current);
};
