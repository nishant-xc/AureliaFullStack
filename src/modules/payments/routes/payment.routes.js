import { Router } from "express";

import {
    createPayment,
    getPaymentById,
    getPaymentByOrderId,
    verifyPayment,
    failPayment,
    refundPayment,
} from "../controllers/payment.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { paymentLimiter } from "../../../shared/middlewares/rateLimit.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createPaymentSchema, verifyPaymentSchema } from "../validators/payment.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Payment Routes
|--------------------------------------------------------------------------
*/

router.post("/", paymentLimiter, authenticate, validate(createPaymentSchema), createPayment);

router.get("/:id", authenticate, getPaymentById);

router.get("/order/:orderId", authenticate, getPaymentByOrderId);

router.patch(
    "/:id/verify",
    paymentLimiter,
    authenticate,
    validate(verifyPaymentSchema),
    verifyPayment
);

router.patch("/:id/fail", authenticate, failPayment);

router.patch("/:id/refund", authenticate, refundPayment);

export default router;
