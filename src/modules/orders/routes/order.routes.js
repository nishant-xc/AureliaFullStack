import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { checkoutSchema } from "../validators/order.validator.js";

import orderController from "../controllers/order.controller.js";

const router = Router();

router.post("/checkout", authenticate, validate(checkoutSchema), orderController.checkout);

export default router;
