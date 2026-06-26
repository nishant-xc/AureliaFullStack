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

/**
 * @openapi
 * /api/v1/payments:
 *   post:
 *     tags:
 *       - Payments
 *     summary: Create a payment
 *     description: Initiates a payment for an order.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - order_id
 *               - payment_method
 *             properties:
 *               order_id:
 *                 type: string
 *                 format: uuid
 *               payment_method:
 *                 type: string
 *                 enum: [UPI, CARD, CASH_ON_DELIVERY]
 *     responses:
 *       201:
 *         description: Payment created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/", paymentLimiter, authenticate, validate(createPaymentSchema), createPayment);

/**
 * @openapi
 * /api/v1/payments/{id}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Payment not found.
 */

router.get("/:id", authenticate, getPaymentById);

/**
 * @openapi
 * /api/v1/payments/order/{orderId}:
 *   get:
 *     tags:
 *       - Payments
 *     summary: Get payment by order ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Payment not found.
 */

router.get("/order/:orderId", authenticate, getPaymentByOrderId);

/**
 * @openapi
 * /api/v1/payments/{id}/verify:
 *   patch:
 *     tags:
 *       - Payments
 *     summary: Verify payment
 *     description: Marks a payment as verified.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Payment verified successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.patch(
    "/:id/verify",
    paymentLimiter,
    authenticate,
    validate(verifyPaymentSchema),
    verifyPayment
);

/**
 * @openapi
 * /api/v1/payments/{id}/fail:
 *   patch:
 *     tags:
 *       - Payments
 *     summary: Mark payment as failed
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment marked as failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Payment not found.
 */

router.patch("/:id/fail", authenticate, failPayment);

/**
 * @openapi
 * /api/v1/payments/{id}/refund:
 *   patch:
 *     tags:
 *       - Payments
 *     summary: Refund payment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Payment refunded successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Payment not found.
 */

router.patch("/:id/refund", authenticate, refundPayment);

export default router;
