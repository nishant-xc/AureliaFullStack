import pool from "../../../database/database.js";

export async function createCategory(data) {
    const query = `
        INSERT INTO restaurant_categories
        (
            restaurant_id,
            name,
            slug,
            description,
            image_url,
            display_order
        )
        VALUES
        ($1,$2,$3,$4,$5,$6)
        RETURNING *;
    `;

    const values = [
        data.restaurant_id,
        data.name,
        data.slug,
        data.description,
        data.image_url,
        data.display_order,
    ];

    const result = await pool.query(query, values);

    return result.rows[0];
}

export async function getCategoriesByRestaurant(restaurantId) {
    const result = await pool.query(
        `
        SELECT *
        FROM restaurant_categories
        WHERE restaurant_id=$1
        ORDER BY display_order ASC,name ASC
        `,

        [restaurantId]
    );

    return result.rows;
}

export async function getCategoryById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM restaurant_categories
        WHERE id=$1
        LIMIT 1
        `,

        [id]
    );

    return result.rows[0];
}
