-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create brands table
CREATE TABLE IF NOT EXISTS public.brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) UNIQUE NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    brand_id UUID REFERENCES public.brands(id) ON DELETE RESTRICT NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE RESTRICT NOT NULL,
    condition VARCHAR(50) CHECK (condition IN ('Brand New', 'Used')) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    discount_price NUMERIC(10, 2) CHECK (discount_price < price),
    storage VARCHAR(50),
    ram VARCHAR(50),
    color VARCHAR(100),
    warranty VARCHAR(255),
    availability VARCHAR(50) CHECK (availability IN ('In Stock', 'Sold Out')) DEFAULT 'In Stock' NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT,
    is_featured BOOLEAN DEFAULT FALSE NOT NULL,
    is_new_arrival BOOLEAN DEFAULT FALSE NOT NULL,
    is_offer BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS public.product_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Pending', 'Replied')) DEFAULT 'Pending' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create profiles table linked to Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role VARCHAR(50) CHECK (role IN ('admin', 'user')) DEFAULT 'user' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_condition ON public.products(condition);
CREATE INDEX IF NOT EXISTS idx_products_availability ON public.products(availability);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON public.product_images(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_product ON public.inquiries(product_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for Profiles
CREATE POLICY "Public profiles are readable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Policies for Categories
CREATE POLICY "Categories are readable by everyone" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories" ON public.categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policies for Brands
CREATE POLICY "Brands are readable by everyone" ON public.brands
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify brands" ON public.brands
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policies for Products
CREATE POLICY "Products are readable by everyone" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify products" ON public.products
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policies for Product Images
CREATE POLICY "Product images are readable by everyone" ON public.product_images
    FOR SELECT USING (true);

CREATE POLICY "Only admins can modify product images" ON public.product_images
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Policies for Inquiries
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Only admins can view/modify inquiries" ON public.inquiries
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Triggers to automatically create profile on sign up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, role)
    VALUES (new.id, 'user');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
