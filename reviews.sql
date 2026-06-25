CREATE TABLE reviews (

    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,

    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),

    review TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(user_id, restaurant_id, order_id)

);

CREATE INDEX idx_reviews_restaurant
ON reviews(restaurant_id);

CREATE INDEX idx_reviews_user
ON reviews(user_id);
