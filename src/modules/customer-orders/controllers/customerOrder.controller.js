import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import customerOrderService from "../services/customerOrder.service.js";

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await customerOrderService.getOrders(req.user.id);

    return ApiResponse.success(res, {
        total: orders.length,
        orders,
    });
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await customerOrderService.getOrderById(req.params.id, req.user.id);

    return ApiResponse.success(res, order);
});

export const getTimeline = asyncHandler(async (req, res) => {
    const timeline = await customerOrderService.getTimeline(req.params.id, req.user.id);

    return ApiResponse.success(res, timeline);
});

export const getTracking = asyncHandler(async (req, res) => {
    const tracking = await customerOrderService.getTracking(req.params.id, req.user.id);

    return ApiResponse.success(res, tracking);
});

export const cancelOrder = asyncHandler(async (req, res) => {
    const order = await customerOrderService.cancelOrder(req.params.id, req.user.id);

    return ApiResponse.success(res, order, "Order cancelled successfully");
});
