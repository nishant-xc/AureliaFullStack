CREATE TABLE IF NOT EXISTS cart_items (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

    menu_item_id UUID NOT NULL REFERENCES menu_items(id) ON DELETE CASCADE,

    quantity INTEGER NOT NULL DEFAULT 1,

    unit_price NUMERIC(10,2) NOT NULL,

    special_instructions TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_cart_quantity
    CHECK(quantity > 0)

);

CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_unique_item
ON cart_items(user_id, menu_item_id);

CREATE INDEX IF NOT EXISTS idx_cart_user
ON cart_items(user_id);

CREATE INDEX IF NOT EXISTS idx_cart_restaurant
ON cart_items(restaurant_id);

CREATE INDEX IF NOT EXISTS idx_cart_menu_item
ON cart_items(menu_item_id);
