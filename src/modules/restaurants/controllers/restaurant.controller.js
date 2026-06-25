import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import AppError from "../../../shared/errors/AppError.js";

import restaurantService from "../services/restaurant.service.js";

export const create = asyncHandler(async (req, res) => {
    const restaurant = await restaurantService.create(req.user.id, req.body);

    return ApiResponse.success(res, restaurant, "Restaurant created successfully", 201);
});

export const getAll = asyncHandler(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await restaurantService.getAll(page, limit);

    return ApiResponse.success(res, {
        page,
        limit,
        total: result.total,
        restaurants: result.data,
    });
});

export const getBySlug = asyncHandler(async (req, res) => {
    const restaurant = await restaurantService.getBySlug(req.params.slug);

    if (!restaurant) {
        throw new AppError("Restaurant not found", 404);
    }

    return ApiResponse.success(res, restaurant);
});

export const update = asyncHandler(async (req, res) => {
    const restaurant = await restaurantService.update(req.params.id, req.user.id, req.body);

    return ApiResponse.success(res, restaurant, "Restaurant updated successfully");
});

export const remove = asyncHandler(async (req, res) => {
    await restaurantService.delete(req.params.id, req.user.id);

    return ApiResponse.success(res, null, "Restaurant deleted successfully");
});
