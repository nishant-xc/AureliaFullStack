-- =====================================================
-- Aurelia
-- Migration 008
-- Performance Indexes for Orders
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_orders_user_created_at
ON orders(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_restaurant_created_at
ON orders(restaurant_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_status_created_at
ON orders(status, created_at DESC);
