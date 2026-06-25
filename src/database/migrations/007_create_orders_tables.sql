CREATE TABLE IF NOT EXISTS orders (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    restaurant_id UUID NOT NULL
        REFERENCES restaurants(id)
        ON DELETE CASCADE,

    order_number VARCHAR(30)
        UNIQUE NOT NULL,

    status VARCHAR(30)
        NOT NULL DEFAULT 'pending',

    subtotal NUMERIC(10,2)
        NOT NULL,

    delivery_fee NUMERIC(10,2)
        NOT NULL DEFAULT 0,

    tax NUMERIC(10,2)
        NOT NULL DEFAULT 0,

    discount NUMERIC(10,2)
        NOT NULL DEFAULT 0,

    total NUMERIC(10,2)
        NOT NULL,

    payment_status VARCHAR(30)
        NOT NULL DEFAULT 'pending',

    payment_method VARCHAR(50),

    notes TEXT,

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE IF NOT EXISTS order_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    menu_item_id UUID NOT NULL
        REFERENCES menu_items(id),

    name VARCHAR(200)
        NOT NULL,

    quantity INTEGER
        NOT NULL,

    unit_price NUMERIC(10,2)
        NOT NULL,

    total_price NUMERIC(10,2)
        NOT NULL

);

CREATE TABLE IF NOT EXISTS order_status_history (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    order_id UUID NOT NULL
        REFERENCES orders(id)
        ON DELETE CASCADE,

    status VARCHAR(30)
        NOT NULL,

    remarks TEXT,

    created_at TIMESTAMP
        DEFAULT CURRENT_TIMESTAMP

);

CREATE INDEX IF NOT EXISTS idx_orders_user
ON orders(user_id);

CREATE INDEX IF NOT EXISTS idx_orders_restaurant
ON orders(restaurant_id);

CREATE INDEX IF NOT EXISTS idx_orders_status
ON orders(status);

CREATE INDEX IF NOT EXISTS idx_order_items_order
ON order_items(order_id);

CREATE INDEX IF NOT EXISTS idx_order_history
ON order_status_history(order_id);
