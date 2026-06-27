import pool from "../../../database/database.js";

export async function createRefreshToken({
    userId,
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
            $5
        )
        RETURNING *
        `,
        [
            userId,
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
