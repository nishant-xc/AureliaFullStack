-- =====================================================
-- Aurelia
-- Migration 010
-- Add CHECK Constraints (Idempotent)
-- =====================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_users_role'
    ) THEN
        ALTER TABLE users
        ADD CONSTRAINT chk_users_role
        CHECK (
            role IN (
                'customer',
                'restaurant',
                'delivery',
                'admin'
            )
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_orders_status'
    ) THEN
        ALTER TABLE orders
        ADD CONSTRAINT chk_orders_status
        CHECK (
            status IN (
                'pending',
                'confirmed',
                'preparing',
                'ready',
                'picked_up',
                'delivered',
                'cancelled'
            )
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_orders_payment_status'
    ) THEN
        ALTER TABLE orders
        ADD CONSTRAINT chk_orders_payment_status
        CHECK (
            payment_status IN (
                'pending',
                'paid',
                'failed',
                'refunded'
            )
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_cart_unit_price'
    ) THEN
        ALTER TABLE cart_items
        ADD CONSTRAINT chk_cart_unit_price
        CHECK (unit_price >= 0);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_menu_price'
    ) THEN
        ALTER TABLE menu_items
        ADD CONSTRAINT chk_menu_price
        CHECK (price >= 0);
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'chk_orders_total'
    ) THEN
        ALTER TABLE orders
        ADD CONSTRAINT chk_orders_total
        CHECK (total >= 0);
    END IF;
END $$;
