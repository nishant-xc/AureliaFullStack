import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import AppError from "../../../shared/errors/AppError.js";

import menuService from "../services/menu.service.js";

class MenuController {
    create = asyncHandler(async (req, res) => {
        const menu = await menuService.create(req.body);

        return ApiResponse.success(res, menu, "Menu item created successfully", 201);
    });

    getAll = asyncHandler(async (req, res) => {
        const menu = await menuService.getAll();

        return ApiResponse.success(res, {
            total: menu.length,
            menu,
        });
    });

    getBySlug = asyncHandler(async (req, res) => {
        const menu = await menuService.getBySlug(req.params.slug);

        if (!menu) {
            throw new AppError("Menu item not found", 404);
        }

        return ApiResponse.success(res, menu);
    });

    getByCategory = asyncHandler(async (req, res) => {
        const menu = await menuService.getByCategory(req.params.categoryId);

        return ApiResponse.success(res, {
            total: menu.length,
            menu,
        });
    });

    update = asyncHandler(async (req, res) => {
        const menu = await menuService.update(req.params.id, req.body);

        return ApiResponse.success(res, menu, "Menu item updated successfully");
    });

    delete = asyncHandler(async (req, res) => {
        await menuService.delete(req.params.id);

        return ApiResponse.success(res, null, "Menu item deleted successfully");
    });
}

export default new MenuController();
