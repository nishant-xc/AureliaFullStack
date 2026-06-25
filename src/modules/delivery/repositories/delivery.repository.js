import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Register Delivery Partner
|--------------------------------------------------------------------------
*/

export async function createDeliveryPartner(data) {
    const result = await pool.query(
        `
        INSERT INTO delivery_partners
        (
            user_id,
            full_name,
            phone,
            vehicle_type,
            vehicle_number
        )
        VALUES
        (
            $1,$2,$3,$4,$5
        )
        RETURNING *;
        `,
        [data.user_id, data.full_name, data.phone, data.vehicle_type, data.vehicle_number]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Delivery Partner By User
|--------------------------------------------------------------------------
*/

export async function getPartnerByUserId(userId) {
    const result = await pool.query(
        `
        SELECT *
        FROM delivery_partners
        WHERE user_id = $1
        `,
        [userId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Delivery Partner By ID
|--------------------------------------------------------------------------
*/

export async function getPartnerById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM delivery_partners
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Update Online Status
|--------------------------------------------------------------------------
*/

export async function updateOnlineStatus(id, online) {
    const result = await pool.query(
        `
        UPDATE delivery_partners
        SET
            is_online = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
        `,
        [online, id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Update Current Location
|--------------------------------------------------------------------------
*/

export async function updateLocation(id, latitude, longitude) {
    const result = await pool.query(
        `
        UPDATE delivery_partners
        SET
            current_latitude = $1,
            current_longitude = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [latitude, longitude, id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Available Partners
|--------------------------------------------------------------------------
*/

export async function getAvailablePartners() {
    const result = await pool.query(
        `
        SELECT *
        FROM delivery_partners
        WHERE
            is_online = TRUE
        AND
            is_available = TRUE
        ORDER BY created_at ASC
        `
    );

    return result.rows;
}

/*
|--------------------------------------------------------------------------
| Assign Order
|--------------------------------------------------------------------------
*/

export async function assignOrder(orderId, partnerId) {
    const result = await pool.query(
        `
        INSERT INTO delivery_assignments
        (
            order_id,
            delivery_partner_id
        )
        VALUES
        (
            $1,$2
        )
        RETURNING *;
        `,
        [orderId, partnerId]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Assignment By Order
|--------------------------------------------------------------------------
*/

export async function getAssignmentByOrder(orderId) {
    const result = await pool.query(
        `
        SELECT *
        FROM delivery_assignments
        WHERE order_id = $1
        `,
        [orderId]
    );

    return result.rows[0];
}
