import pool from "../../../database/database.js";

export async function createRefreshToken({
    userId,
    jti,
    tokenHash,
    expiresAt,
    ipAddress = null,
    userAgent = null,
}) {
    const result = await pool.query(
        `
        INSERT INTO refresh_tokens
        (
            user_id,
            jti,
            token_hash,
            expires_at,
            ip_address,
            user_agent
        )
        VALUES
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6
        )
        RETURNING
            id,
            user_id,
            jti,
            token_hash,
            expires_at,
            revoked,
            revoked_at,
            last_used_at,
            created_at
        `,
        [
            userId,
            jti,
            tokenHash,
            expiresAt,
            ipAddress,
            userAgent,
        ]
    );

    return result.rows[0];
}

export async function findRefreshToken(tokenHash) {
    const result = await pool.query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE token_hash = $1
        LIMIT 1
        `,
        [tokenHash]
    );

    return result.rows[0];
}

export async function findRefreshTokenByJti(jti) {
    const result = await pool.query(
        `
        SELECT *
        FROM refresh_tokens
        WHERE jti = $1
        LIMIT 1
        `,
        [jti]
    );

    return result.rows[0];
}

export async function updateLastUsed(jti) {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET last_used_at = CURRENT_TIMESTAMP
        WHERE jti = $1
        `,
        [jti]
    );
}

export async function revokeRefreshToken(tokenHash) {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET
            revoked = TRUE,
            revoked_at = CURRENT_TIMESTAMP
        WHERE token_hash = $1
        `,
        [tokenHash]
    );
}

export async function revokeRefreshTokenByJti(jti) {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET
            revoked = TRUE,
            revoked_at = CURRENT_TIMESTAMP
        WHERE jti = $1
        `,
        [jti]
    );
}

export async function revokeAllUserTokens(userId) {
    await pool.query(
        `
        UPDATE refresh_tokens
        SET
            revoked = TRUE,
            revoked_at = CURRENT_TIMESTAMP
        WHERE user_id = $1
        `,
        [userId]
    );
}

export async function deleteExpiredTokens() {
    await pool.query(
        `
        DELETE FROM refresh_tokens
        WHERE expires_at < CURRENT_TIMESTAMP
        `
    );
}
