-- =====================================================
-- Aurelia
-- Migration 002
-- Restaurants
-- =====================================================

CREATE TABLE IF NOT EXISTS restaurants (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    owner_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    name VARCHAR(200) NOT NULL,

    slug VARCHAR(220) UNIQUE NOT NULL,

    description TEXT,

    email VARCHAR(255),

    phone VARCHAR(20),

    logo_url TEXT,

    banner_url TEXT,

    cover_url TEXT,

    address TEXT NOT NULL,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    country VARCHAR(100) NOT NULL,

    postal_code VARCHAR(20),

    latitude DECIMAL(10,7),

    longitude DECIMAL(10,7),

    delivery_radius_km DECIMAL(5,2)
        DEFAULT 5,

    minimum_order DECIMAL(10,2)
        DEFAULT 0,

    delivery_fee DECIMAL(10,2)
        DEFAULT 0,

    average_rating DECIMAL(3,2)
        DEFAULT 0,

    total_reviews INTEGER
        DEFAULT 0,

    is_verified BOOLEAN
        DEFAULT FALSE,

    is_open BOOLEAN
        DEFAULT TRUE,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX idx_restaurants_owner
ON restaurants(owner_id);

CREATE INDEX idx_restaurants_city
ON restaurants(city);

CREATE INDEX idx_restaurants_slug
ON restaurants(slug);

CREATE INDEX idx_restaurants_rating
ON restaurants(average_rating);
