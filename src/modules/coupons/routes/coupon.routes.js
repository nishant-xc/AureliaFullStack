import { Router } from "express";

import { createCoupon, validateCoupon } from "../controllers/coupon.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { couponLimiter } from "../../../shared/middlewares/rateLimit.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createCouponSchema, validateCouponSchema } from "../validators/coupon.validator.js";

const router = Router();

router.post("/", authenticate, validate(createCouponSchema), createCoupon);

router.post(
    "/validate",
    couponLimiter,
    authenticate,
    validate(validateCouponSchema),
    validateCoupon
);

export default router;
