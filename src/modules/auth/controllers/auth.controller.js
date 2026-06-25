import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import { registerUser, loginUser } from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
    const result = await registerUser(req.body);

    return ApiResponse.success(res, result, "Registration successful", 201);
});

export const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);

    return ApiResponse.success(res, result, "Login successful");
});

export const me = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, req.user);
});
