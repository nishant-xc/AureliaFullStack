import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import {
    registerUser,
    loginUser,
    refreshAccessToken,
} from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
    const result = await registerUser(req.body);

    return ApiResponse.success(
        res,
        result,
        "Registration successful",
        201
    );
});

export const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);

    return ApiResponse.success(
        res,
        result,
        "Login successful"
    );
});

export const refresh = asyncHandler(async (req, res) => {
    const result = await refreshAccessToken(req.body.refreshToken);

    return ApiResponse.success(
        res,
        result,
        "Access token refreshed"
    );
});

export const me = asyncHandler(async (req, res) => {
    return ApiResponse.success(res, req.user);
});
