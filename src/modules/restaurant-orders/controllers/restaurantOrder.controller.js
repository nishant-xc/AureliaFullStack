import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import { ORDER_STATUS } from "../../../shared/constants/index.js";
import restaurantOrderService from "../services/restaurantOrder.service.js";

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await restaurantOrderService.getOrders(req.user.id, req.query.status || null);

    return ApiResponse.success(res, {
        total: orders.length,
        orders,
    });
});

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await restaurantOrderService.getOrderById(req.params.id, req.user.id);

    return ApiResponse.success(res, order);
});

async function changeStatus(req, res, status, message) {
    const order = await restaurantOrderService.updateStatus(
        req.params.id,
        req.user.id,
        status,
        req.body.remarks || null
    );

    return ApiResponse.success(res, order, message);
}

export const acceptOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.ACCEPTED, "Order accepted successfully")
);

export const preparingOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.PREPARING, "Order marked as preparing")
);

export const readyOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.READY, "Order marked as ready")
);

export const outForDeliveryOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.OUT_FOR_DELIVERY, "Order is out for delivery")
);

export const deliveredOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.DELIVERED, "Order delivered successfully")
);

export const cancelOrder = asyncHandler(async (req, res) =>
    changeStatus(req, res, ORDER_STATUS.CANCELLED, "Order cancelled successfully")
);
