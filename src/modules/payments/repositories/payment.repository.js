import pool from "../../../database/database.js";
import { PAYMENT_STATUS } from "../../../shared/constants/index.js";

/*
|--------------------------------------------------------------------------
| Create Payment
|--------------------------------------------------------------------------
*/

export async function createPayment(data) {
    const result = await pool.query(
        `
        INSERT INTO payments
        (
            order_id,
            user_id,
            provider,
            transaction_id,
            payment_order_id,
            amount,
            currency,
            status,
            method,
            gateway_response
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )
        RETURNING *;
        `,
        [
            data.order_id,
            data.user_id,
            data.provider,
            data.transaction_id,
            data.payment_order_id,
            data.amount,
            data.currency || "INR",
            data.status || PAYMENT_STATUS.PENDING,
            data.method || null,
            data.gateway_response || null,
        ]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Payment By ID
|--------------------------------------------------------------------------
*/

export async function getPaymentById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM payments
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Payment By Order
|--------------------------------------------------------------------------
*/

export async function getPaymentByOrderId(orderId) {
    const result = await pool.query(
        `
        SELECT *
        FROM payments
        WHERE order_id = $1
        `,
        [orderId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Update Payment Status
|--------------------------------------------------------------------------
*/

export async function updatePaymentStatus(id, status, transactionId = null) {
    const result = await pool.query(
        `
        UPDATE payments
        SET
            status = $1,
            transaction_id = COALESCE($2, transaction_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [status, transactionId, id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Create Payment Log
|--------------------------------------------------------------------------
*/

export async function createPaymentLog(paymentId, event, payload) {
    await pool.query(
        `
        INSERT INTO payment_logs
        (
            payment_id,
            event,
            payload
        )
        VALUES
        (
            $1,$2,$3
        )
        `,
        [paymentId, event, JSON.stringify(payload)]
    );
}

/*
|--------------------------------------------------------------------------
| Check Existing Payment
|--------------------------------------------------------------------------
*/

export async function getActivePaymentByOrderId(orderId) {
    const result = await pool.query(
        `
        SELECT *
        FROM payments
        WHERE order_id = $1
        AND status IN ($2, $3)
        LIMIT 1
        `,
        [orderId, PAYMENT_STATUS.PENDING, PAYMENT_STATUS.SUCCESS]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Check Order
|--------------------------------------------------------------------------
*/

export async function getOrderById(orderId) {
    const result = await pool.query(
        `
        SELECT *
        FROM orders
        WHERE id = $1
        `,
        [orderId]
    );

    return result.rows[0];
}
