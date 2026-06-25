CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS restaurant_categories (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    restaurant_id UUID NOT NULL
        REFERENCES restaurants(id)
        ON DELETE CASCADE,

    name VARCHAR(120) NOT NULL,

    slug VARCHAR(150) NOT NULL,

    description TEXT,

    image_url TEXT,

    display_order INTEGER DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(restaurant_id, slug)

);

CREATE INDEX IF NOT EXISTS idx_categories_restaurant
ON restaurant_categories(restaurant_id);

CREATE INDEX IF NOT EXISTS idx_categories_slug
ON restaurant_categories(slug);
