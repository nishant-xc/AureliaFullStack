import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { checkoutSchema } from "../validators/order.validator.js";

import orderController from "../controllers/order.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/orders/checkout:
 *   post:
 *     tags:
 *       - Orders
 *     summary: Checkout and place an order
 *     description: Creates a new order from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address_id
 *               - payment_method
 *             properties:
 *               address_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               payment_method:
 *                 type: string
 *                 enum:
 *                   - CASH_ON_DELIVERY
 *                   - CARD
 *                   - UPI
 *                 example: UPI
 *               coupon_code:
 *                 type: string
 *                 example: WELCOME50
 *     responses:
 *       201:
 *         description: Order placed successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Cart or address not found.
 */

router.post("/checkout", authenticate, validate(checkoutSchema), orderController.checkout);

export default router;
