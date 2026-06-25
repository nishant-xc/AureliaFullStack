CREATE TABLE IF NOT EXISTS user_addresses (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    full_name VARCHAR(150) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    address_line_1 TEXT NOT NULL,

    address_line_2 TEXT,

    landmark TEXT,

    city VARCHAR(100) NOT NULL,

    state VARCHAR(100) NOT NULL,

    country VARCHAR(100) NOT NULL,

    postal_code VARCHAR(20) NOT NULL,

    latitude NUMERIC(10,7),

    longitude NUMERIC(10,7),

    address_type VARCHAR(30) NOT NULL DEFAULT 'home',

    is_default BOOLEAN DEFAULT false,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX IF NOT EXISTS idx_user_addresses_user
ON user_addresses(user_id);
