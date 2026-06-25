CREATE TABLE IF NOT EXISTS delivery_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    full_name VARCHAR(150) NOT NULL,

    phone VARCHAR(20) NOT NULL,

    vehicle_type VARCHAR(30),

    vehicle_number VARCHAR(30),

    is_online BOOLEAN DEFAULT FALSE,

    is_available BOOLEAN DEFAULT TRUE,

    current_latitude NUMERIC(10,7),

    current_longitude NUMERIC(10,7),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS delivery_assignments (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID UNIQUE NOT NULL REFERENCES orders(id) ON DELETE CASCADE,

    delivery_partner_id UUID NOT NULL REFERENCES delivery_partners(id),

    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    picked_up_at TIMESTAMP,

    delivered_at TIMESTAMP
);

CREATE INDEX idx_delivery_partner_online
ON delivery_partners(is_online);

CREATE INDEX idx_delivery_partner_available
ON delivery_partners(is_available);
