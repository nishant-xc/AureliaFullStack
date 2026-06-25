import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

import deliveryService from "../services/delivery.service.js";

export const register = asyncHandler(async (req, res) => {
    const partner = await deliveryService.register(req.user.id);

    return ApiResponse.success(res, partner, "Delivery partner registered successfully", 201);
});

export const goOnline = asyncHandler(async (req, res) => {
    const partner = await deliveryService.goOnline(req.user.id);

    return ApiResponse.success(res, partner, "You are now online");
});

export const goOffline = asyncHandler(async (req, res) => {
    const partner = await deliveryService.goOffline(req.user.id);

    return ApiResponse.success(res, partner, "You are now offline");
});

export const updateLocation = asyncHandler(async (req, res) => {
    const partner = await deliveryService.updateCurrentLocation(
        req.user.id,
        req.body.latitude,
        req.body.longitude
    );

    return ApiResponse.success(res, partner, "Location updated successfully");
});

export const assign = asyncHandler(async (req, res) => {
    const assignment = await deliveryService.assign(req.params.orderId, req.user.id);

    return ApiResponse.success(res, assignment, "Order assigned successfully");
});

export const getAssignment = asyncHandler(async (req, res) => {
    const assignment = await deliveryService.getAssignment(req.params.orderId);

    return ApiResponse.success(res, assignment);
});
