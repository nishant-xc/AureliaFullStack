import { Router } from "express";

import { createCoupon, validateCoupon } from "../controllers/coupon.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { couponLimiter } from "../../../shared/middlewares/rateLimit.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createCouponSchema, validateCouponSchema } from "../validators/coupon.validator.js";

const router = Router();

/**
 * @openapi
 * /api/v1/coupons:
 *   post:
 *     tags:
 *       - Coupons
 *     summary: Create a coupon
 *     description: Creates a new discount coupon.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - discount
 *               - expiry_date
 *             properties:
 *               code:
 *                 type: string
 *                 example: WELCOME50
 *               discount:
 *                 type: number
 *                 example: 50
 *               expiry_date:
 *                 type: string
 *                 format: date
 *                 example: "2027-12-31"
 *     responses:
 *       201:
 *         description: Coupon created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/", authenticate, validate(createCouponSchema), createCoupon);

/**
 * @openapi
 * /api/v1/coupons/validate:
 *   post:
 *     tags:
 *       - Coupons
 *     summary: Validate a coupon
 *     description: Validates a coupon code before checkout.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 example: WELCOME50
 *     responses:
 *       200:
 *         description: Coupon is valid.
 *       400:
 *         description: Coupon is invalid or expired.
 *       401:
 *         description: Unauthorized.
 */

router.post(
    "/validate",
    couponLimiter,
    authenticate,
    validate(validateCouponSchema),
    validateCoupon
);

export default router;
