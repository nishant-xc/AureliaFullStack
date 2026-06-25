import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Create Admin
|--------------------------------------------------------------------------
*/

export async function createAdmin(userId, role = "admin") {
    const result = await pool.query(
        `
        INSERT INTO admins
        (
            user_id,
            role
        )
        VALUES
        (
            $1,
            $2
        )
        RETURNING *;
        `,
        [userId, role]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Admin By User
|--------------------------------------------------------------------------
*/

export async function getAdminByUserId(userId) {
    const result = await pool.query(
        `
        SELECT *
        FROM admins
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function getDashboardStats() {
    const result = await pool.query(
        `
        SELECT
            (SELECT COUNT(*) FROM users) AS users,
            (SELECT COUNT(*) FROM restaurants) AS restaurants,
            (SELECT COUNT(*) FROM orders) AS orders,
            (SELECT COUNT(*) FROM delivery_partners) AS delivery_partners,
            (SELECT COUNT(*) FROM coupons) AS coupons,
            (SELECT COUNT(*) FROM reviews) AS reviews,
            (SELECT COUNT(*) FROM payments) AS payments
        `
    );

    return result.rows[0];
}
