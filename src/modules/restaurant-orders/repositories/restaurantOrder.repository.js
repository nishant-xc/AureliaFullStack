import pool from "../../../database/database.js";
import NotFoundError from "../../../shared/errors/NotFoundError.js";

/* ==========================================================
   Get Restaurant Orders
========================================================== */

export async function getRestaurantOrders(ownerId, status = null) {
    let query = `
        SELECT
            o.*,
            r.name AS restaurant_name,
            u.full_name AS customer_name,
            u.email AS customer_email
        FROM orders o
        JOIN restaurants r
            ON o.restaurant_id = r.id
        JOIN users u
            ON o.user_id = u.id
        WHERE r.owner_id = $1
    `;

    const values = [ownerId];

    if (status) {
        query += " AND o.status = $2";
        values.push(status);
    }

    query += " ORDER BY o.created_at DESC";

    const result = await pool.query(query, values);

    return result.rows;
}

/* ==========================================================
   Get Order By ID
========================================================== */

export async function getRestaurantOrderById(orderId, ownerId) {
    const result = await pool.query(
        `
        SELECT
            o.*,
            r.name AS restaurant_name,
            u.full_name AS customer_name,
            u.email AS customer_email
        FROM orders o
        JOIN restaurants r
            ON o.restaurant_id = r.id
        JOIN users u
            ON o.user_id = u.id
        WHERE
            o.id = $1
            AND r.owner_id = $2
        `,
        [orderId, ownerId]
    );

    return result.rows[0];
}

/* ==========================================================
   Update Order Status
========================================================== */

export async function updateOrderStatus(orderId, ownerId, status, remarks = null) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const orderResult = await client.query(
            `
            SELECT
                o.*,
                r.owner_id
            FROM orders o
            JOIN restaurants r
                ON o.restaurant_id = r.id
            WHERE
                o.id = $1
                AND r.owner_id = $2
            `,
            [orderId, ownerId]
        );

        if (orderResult.rows.length === 0) {
            throw new NotFoundError("Order not found");
        }

        const updateResult = await client.query(
            `
            UPDATE orders
            SET
                status = $1,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $2
            RETURNING *;
            `,
            [status, orderId]
        );

        await client.query(
            `
            INSERT INTO order_status_history
            (
                order_id,
                status,
                remarks
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            `,
            [orderId, status, remarks]
        );

        await client.query("COMMIT");

        return updateResult.rows[0];
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}
