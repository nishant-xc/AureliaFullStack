import pool from "../../../database/database.js";

/*
|--------------------------------------------------------------------------
| Create Review
|--------------------------------------------------------------------------
*/

export async function createReview(data) {
    const result = await pool.query(
        `
        INSERT INTO reviews
        (
            user_id,
            restaurant_id,
            order_id,
            rating,
            review
        )
        VALUES
        (
            $1,$2,$3,$4,$5
        )
        RETURNING *;
        `,
        [data.user_id, data.restaurant_id, data.order_id, data.rating, data.review]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Review By ID
|--------------------------------------------------------------------------
*/

export async function getReviewById(id) {
    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Get Reviews Of Restaurant
|--------------------------------------------------------------------------
*/

export async function getRestaurantReviews(restaurantId) {
    const result = await pool.query(
        `
        SELECT
            r.*,
            u.full_name
        FROM reviews r
        JOIN users u
        ON r.user_id = u.id
        WHERE r.restaurant_id = $1
        ORDER BY r.created_at DESC
        `,
        [restaurantId]
    );

    return result.rows;
}

/*
|--------------------------------------------------------------------------
| Update Review
|--------------------------------------------------------------------------
*/

export async function updateReview(id, rating, review) {
    const result = await pool.query(
        `
        UPDATE reviews
        SET
            rating = $1,
            review = $2,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *;
        `,
        [rating, review, id]
    );

    return result.rows[0];
}

/*
|--------------------------------------------------------------------------
| Delete Review
|--------------------------------------------------------------------------
*/

export async function deleteReview(id) {
    await pool.query(
        `
        DELETE FROM reviews
        WHERE id = $1
        `,
        [id]
    );
}

/*
|--------------------------------------------------------------------------
| Check Existing Review
|--------------------------------------------------------------------------
*/

export async function getUserReview(userId, restaurantId, orderId) {
    const result = await pool.query(
        `
        SELECT *
        FROM reviews
        WHERE user_id = $1
        AND restaurant_id = $2
        AND order_id = $3
        `,
        [userId, restaurantId, orderId]
    );

    return result.rows[0];
}
