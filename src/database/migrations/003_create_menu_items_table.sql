CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS menu_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    restaurant_id UUID NOT NULL
        REFERENCES restaurants(id)
        ON DELETE CASCADE,

    category_id UUID NOT NULL
        REFERENCES restaurant_categories(id)
        ON DELETE CASCADE,

    name VARCHAR(200) NOT NULL,

    slug VARCHAR(220) NOT NULL,

    description TEXT,

    image_url TEXT,

    price DECIMAL(10,2) NOT NULL,

    discount_price DECIMAL(10,2),

    is_veg BOOLEAN DEFAULT TRUE,

    is_available BOOLEAN DEFAULT TRUE,

    is_featured BOOLEAN DEFAULT FALSE,

    preparation_time INTEGER DEFAULT 15,

    calories INTEGER,

    display_order INTEGER DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(restaurant_id, slug)

);

CREATE INDEX IF NOT EXISTS idx_menu_restaurant
ON menu_items(restaurant_id);

CREATE INDEX IF NOT EXISTS idx_menu_category
ON menu_items(category_id);

CREATE INDEX IF NOT EXISTS idx_menu_slug
ON menu_items(slug);
