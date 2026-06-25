import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Create Coupon
|--------------------------------------------------------------------------
*/

export async function createCoupon(data) {
    const result = await pool.query(
        `
        INSERT INTO coupons
        (
            code,
            title,
            description,
            discount_type,
            discount_value,
            max_discount,
            minimum_order_amount,
            usage_limit,
            per_user_limit,
            starts_at,
            expires_at,
            is_active
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12
        )
        RETURNING *;
        `,
        [
            data.code.toUpperCase(),
            data.title,
            data.description,
            data.discount_type,
            data.discount_value,
            data.max_discount,
            data.minimum_order_amount,
            data.usage_limit,
            data.per_user_limit,
            data.starts_at,
            data.expires_at,
            data.is_active ?? true,
        ]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Find Coupon By Code
|--------------------------------------------------------------------------
*/

export async function getCouponByCode(code) {
    const result = await pool.query(
        `
        SELECT *
        FROM coupons
        WHERE code = $1
        `,
        [code.toUpperCase()]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Count User Usage
|--------------------------------------------------------------------------
*/

export async function getUserCouponUsage(couponId, userId) {
    const result = await pool.query(
        `
        SELECT COUNT(*) AS total
        FROM coupon_usage
        WHERE coupon_id = $1
        AND user_id = $2
        `,
        [couponId, userId]
    );

    return Number(result.rows[0].total);
}

/*
|--------------------------------------------------------------------------
| Increment Usage Count
|--------------------------------------------------------------------------
*/

export async function incrementCouponUsage(client, couponId) {
    await client.query(
        `
        UPDATE coupons
        SET usage_count = usage_count + 1
        WHERE id = $1
        `,
        [couponId]
    );
}

/*
|--------------------------------------------------------------------------
| Save Coupon Usage
|--------------------------------------------------------------------------
*/

export async function saveCouponUsage(client, data) {
    await client.query(
        `
        INSERT INTO coupon_usage
        (
            coupon_id,
            user_id,
            order_id,
            discount_amount
        )
        VALUES
        (
            $1,$2,$3,$4
        )
        `,
        [data.coupon_id, data.user_id, data.order_id, data.discount_amount]
    );
}
