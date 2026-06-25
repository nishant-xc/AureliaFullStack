import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Customer Order History
|--------------------------------------------------------------------------
*/

export async function getCustomerOrders(userId) {
    const result = await pool.query(
        `
        SELECT
            o.*,
            r.name AS restaurant_name,
            r.logo_url
        FROM orders o
        JOIN restaurants r
            ON o.restaurant_id = r.id
        WHERE o.user_id = $1
        ORDER BY o.created_at DESC
        `,
        [userId]
    );

    return result.rows;
}

/*
|--------------------------------------------------------------------------
| Customer Order Details
|--------------------------------------------------------------------------
*/

export async function getCustomerOrderById(orderId, userId) {
    const orderResult = await pool.query(
        `
        SELECT
            o.*,
            r.name AS restaurant_name,
            r.logo_url,
            r.phone,
            r.address
        FROM orders o
        JOIN restaurants r
            ON o.restaurant_id = r.id
        WHERE
            o.id = $1
        AND
            o.user_id = $2
        `,
        [orderId, userId]
    );

    if (orderResult.rows.length === 0) {
        return null;
    }

    const itemsResult = await pool.query(
        `
        SELECT
            *
        FROM order_items
        WHERE order_id = $1
        `,
        [orderId]
    );

    return {
        ...orderResult.rows[0],

        items: itemsResult.rows,
    };
}

/*
|--------------------------------------------------------------------------
| Order Timeline
|--------------------------------------------------------------------------
*/

export async function getOrderTimeline(orderId, userId) {
    const result = await pool.query(
        `
        SELECT
            h.status,
            h.remarks,
            h.created_at
        FROM order_status_history h
        JOIN orders o
            ON h.order_id = o.id
        WHERE
            h.order_id = $1
        AND
            o.user_id = $2
        ORDER BY h.created_at ASC
        `,
        [orderId, userId]
    );

    return result.rows;
}

/*
|--------------------------------------------------------------------------
| Order Tracking
|--------------------------------------------------------------------------
*/

export async function getOrderTracking(orderId, userId) {
    const result = await pool.query(
        `
        SELECT
            status
        FROM orders
        WHERE
            id = $1
        AND
            user_id = $2
        `,
        [orderId, userId]
    );

    return result.rows[0];
}
