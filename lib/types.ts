export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  created_at?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  created_at?: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  image_url: string;
  is_primary: boolean;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id: string;
  category_id: string;
  condition: 'Brand New' | 'Used';
  price: number;
  discount_price?: number;
  storage?: string;
  ram?: string;
  color?: string;
  warranty?: string;
  availability: 'In Stock' | 'Sold Out';
  short_description: string;
  full_description?: string;
  is_featured: boolean;
  is_new_arrival: boolean;
  is_offer: boolean;
  created_at?: string;
  
  // Relations loaded dynamically
  brand?: Brand;
  category?: Category;
  images?: ProductImage[];
}

export interface Inquiry {
  id: string;
  product_id: string;
  customer_name: string;
  customer_phone: string;
  message: string;
  status: 'Pending' | 'Replied';
  created_at?: string;
  
  // Relation loaded dynamically
  product?: Product;
}

export interface Profile {
  id: string;
  role: 'admin' | 'user';
  created_at?: string;
}
