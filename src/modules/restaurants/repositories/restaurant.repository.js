import pool from "../../../database/database.js";

/* ==========================================================
   Create Restaurant
========================================================== */

export async function createRestaurant(data) {
    const result = await pool.query(
        `
        INSERT INTO restaurants
        (
            owner_id,
            name,
            slug,
            description,
            email,
            phone,
            address,
            city,
            state,
            country
        )
        VALUES
        (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10
        )
        RETURNING *
        `,
        [
            data.owner_id,
            data.name,
            data.slug,
            data.description,
            data.email,
            data.phone,
            data.address,
            data.city,
            data.state,
            data.country,
        ]
    );

    return result.rows[0];
}

/* ==========================================================
   Get All Restaurants
========================================================== */

export async function getRestaurants(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const totalResult = await pool.query(`
        SELECT COUNT(*) AS total
        FROM restaurants
    `);

    const result = await pool.query(
        `
        SELECT *
        FROM restaurants
        ORDER BY created_at DESC
        LIMIT $1
        OFFSET $2
        `,
        [limit, offset]
    );

    return {
        total: Number(totalResult.rows[0].total),

        data: result.rows,
    };
}

/* ==========================================================
   Get Restaurant By Slug
========================================================== */

export async function getRestaurantBySlug(slug) {
    const result = await pool.query(
        `
        SELECT *
        FROM restaurants
        WHERE slug = $1
        `,
        [slug]
    );

    return result.rows[0];
}

/* ==========================================================
   Get Restaurant By ID
========================================================== */

export async function getRestaurantById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM restaurants
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

/* ==========================================================
   Update Restaurant
========================================================== */

export async function updateRestaurant(id, data) {
    const result = await pool.query(
        `
        UPDATE restaurants
        SET
            name = $1,
            description = $2,
            email = $3,
            phone = $4,
            address = $5,
            city = $6,
            state = $7,
            country = $8,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $9
        RETURNING *
        `,
        [
            data.name,
            data.description,
            data.email,
            data.phone,
            data.address,
            data.city,
            data.state,
            data.country,
            id,
        ]
    );

    return result.rows[0];
}

/* ==========================================================
   Delete Restaurant
========================================================== */

export async function deleteRestaurant(id) {
    const result = await pool.query(
        `
        DELETE FROM restaurants
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
}
