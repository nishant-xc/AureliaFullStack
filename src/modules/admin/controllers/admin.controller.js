import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import adminService from "../services/admin.service.js";

export const register = asyncHandler(async (req, res) => {
    const admin = await adminService.register(req.user.id, req.body.role || "admin");

    return ApiResponse.success(res, admin, "Admin registered successfully", 201);
});

export const profile = asyncHandler(async (req, res) => {
    const admin = await adminService.profile(req.user.id);

    return ApiResponse.success(res, admin);
});

export const dashboard = asyncHandler(async (req, res) => {
    const stats = await adminService.dashboard();

    return ApiResponse.success(res, stats);
});
