import asyncHandler from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import paymentService from "../services/payment.service.js";

export const createPayment = asyncHandler(async (req, res) => {
    const payment = await paymentService.create({
        ...req.body,
        user_id: req.user.id,
    });

    return ApiResponse.success(res, payment, "Payment created successfully", 201);
});

export const getPaymentById = asyncHandler(async (req, res) => {
    const payment = await paymentService.getById(req.params.id);

    return ApiResponse.success(res, payment);
});

export const getPaymentByOrderId = asyncHandler(async (req, res) => {
    const payment = await paymentService.getByOrder(req.params.orderId);

    return ApiResponse.success(res, payment);
});

export const verifyPayment = asyncHandler(async (req, res) => {
    const payment = await paymentService.verify(req.params.id, req.body.transactionId);

    return ApiResponse.success(res, payment, "Payment verified successfully");
});

export const failPayment = asyncHandler(async (req, res) => {
    const payment = await paymentService.fail(req.params.id);

    return ApiResponse.success(res, payment, "Payment marked as failed");
});

export const refundPayment = asyncHandler(async (req, res) => {
    const payment = await paymentService.refund(req.params.id);

    return ApiResponse.success(res, payment, "Refund processed successfully");
});
