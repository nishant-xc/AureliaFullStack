import {
    createReview,
    getReviewById,
    getRestaurantReviews,
    updateReview,
    deleteReview,
    getUserReview,
} from "../repositories/review.repository.js";

import pool from "../../../database/database.js";
import { ORDER_STATUS } from "../../../shared/constants/index.js";
import NotFoundError from "../../../shared/errors/NotFoundError.js";
import AuthorizationError from "../../../shared/errors/AuthorizationError.js";
import ConflictError from "../../../shared/errors/ConflictError.js";
import ValidationError from "../../../shared/errors/ValidationError.js";
import { validate as uuidValidate } from "uuid";

class ReviewService {
    async create(userId, data) {
        const orderResult = await pool.query(
            `
            SELECT *
            FROM orders
            WHERE id = $1
            `,
            [data.order_id]
        );

        const order = orderResult.rows[0];

        if (!order) {
            throw new NotFoundError("Order not found");
        }

        if (order.user_id !== userId) {
            throw new AuthorizationError("You can review only your own orders");
        }

        if (order.status !== ORDER_STATUS.DELIVERED) {
            throw new ValidationError("Only delivered orders can be reviewed");
        }

        const existing = await getUserReview(userId, data.restaurant_id, data.order_id);

        if (existing) {
            throw new ConflictError("Review already submitted");
        }

        const review = await createReview({
            user_id: userId,
            restaurant_id: data.restaurant_id,
            order_id: data.order_id,
            rating: data.rating,
            review: data.review,
        });

        await this.updateRestaurantRating(data.restaurant_id);

        return review;
    }

    async getById(id) {
        return await getReviewById(id);
    }

    async getRestaurantReviews(restaurantId) {
        if (!uuidValidate(restaurantId)) {
            throw new ValidationError("Invalid restaurant ID");
        }

        return await getRestaurantReviews(restaurantId);
    }

    async update(userId, reviewId, data) {
        const review = await getReviewById(reviewId);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        if (review.user_id !== userId) {
            throw new AuthorizationError("Not authorized");
        }

        const updated = await updateReview(reviewId, data.rating, data.review);

        await this.updateRestaurantRating(review.restaurant_id);

        return updated;
    }

    async delete(userId, reviewId) {
        const review = await getReviewById(reviewId);

        if (!review) {
            throw new NotFoundError("Review not found");
        }

        if (review.user_id !== userId) {
            throw new AuthorizationError("Not authorized");
        }

        await deleteReview(reviewId);

        await this.updateRestaurantRating(review.restaurant_id);
    }

    async updateRestaurantRating(restaurantId) {
        const result = await pool.query(
            `
            SELECT
                AVG(rating) AS avg_rating,
                COUNT(*) AS total_reviews
            FROM reviews
            WHERE restaurant_id = $1
            `,
            [restaurantId]
        );

        await pool.query(
            `
            UPDATE restaurants
            SET
                average_rating = $1,
                total_reviews = $2
            WHERE id = $3
            `,
            [
                Number(result.rows[0].avg_rating || 0).toFixed(2),
                result.rows[0].total_reviews,
                restaurantId,
            ]
        );
    }
}

export default new ReviewService();
