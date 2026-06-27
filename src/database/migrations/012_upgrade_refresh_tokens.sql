-- =====================================================
-- Aurelia
-- Migration 012
-- Upgrade Refresh Token Sessions
-- =====================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

DO $$
BEGIN

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'refresh_tokens'
          AND column_name = 'jti'
    ) THEN
        ALTER TABLE refresh_tokens
        ADD COLUMN jti UUID DEFAULT gen_random_uuid();
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'refresh_tokens'
          AND column_name = 'last_used_at'
    ) THEN
        ALTER TABLE refresh_tokens
        ADD COLUMN last_used_at TIMESTAMP;
    END IF;

END $$;

UPDATE refresh_tokens
SET jti = gen_random_uuid()
WHERE jti IS NULL;

ALTER TABLE refresh_tokens
ALTER COLUMN jti SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_refresh_tokens_jti
ON refresh_tokens(jti);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_revoked
ON refresh_tokens(user_id, revoked);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_jti
ON refresh_tokens(user_id, jti);
