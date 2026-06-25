import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import AppError from "../../../shared/errors/AppError.js";

import {
    createCategoryService,
    getCategoriesService,
    getCategoryService,
} from "../services/category.service.js";

/* ==========================================================
   Create Category
========================================================== */

export const createCategory = asyncHandler(async (req, res) => {
    const category = await createCategoryService(req.body);

    return ApiResponse.success(res, category, "Category created successfully", 201);
});

/* ==========================================================
   Get Categories By Restaurant
========================================================== */

export const getCategories = asyncHandler(async (req, res) => {
    const categories = await getCategoriesService(req.params.restaurantId);

    return ApiResponse.success(res, {
        total: categories.length,
        categories,
    });
});

/* ==========================================================
   Get Category By ID
========================================================== */

export const getCategory = asyncHandler(async (req, res) => {
    const category = await getCategoryService(req.params.id);

    if (!category) {
        throw new AppError("Category not found", 404);
    }

    return ApiResponse.success(res, category);
});
