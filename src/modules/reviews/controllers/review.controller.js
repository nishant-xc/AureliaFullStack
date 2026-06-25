import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import reviewService from "../services/review.service.js";

export const create = asyncHandler(async (req, res) => {
    const review = await reviewService.create(req.user.id, req.body);

    return ApiResponse.success(res, review, "Review submitted successfully", 201);
});

export const getById = asyncHandler(async (req, res) => {
    const review = await reviewService.getById(req.params.id);

    return ApiResponse.success(res, review);
});

export const getRestaurantReviews = asyncHandler(async (req, res) => {
    const reviews = await reviewService.getRestaurantReviews(req.params.restaurantId);

    return ApiResponse.success(res, {
        total: reviews.length,
        reviews,
    });
});

export const update = asyncHandler(async (req, res) => {
    const review = await reviewService.update(req.user.id, req.params.id, req.body);

    return ApiResponse.success(res, review, "Review updated successfully");
});

export const remove = asyncHandler(async (req, res) => {
    await reviewService.delete(req.user.id, req.params.id);

    return ApiResponse.success(res, null, "Review deleted successfully");
});
