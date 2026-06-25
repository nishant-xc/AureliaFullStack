import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { addItemSchema } from "../validators/cart.validator.js";

import cartController from "../controllers/cart.controller.js";

const router = Router();

router.post("/", authenticate, validate(addItemSchema), cartController.addItem);

router.get("/", authenticate, cartController.getCart);

router.delete("/:id", authenticate, cartController.removeItem);

export default router;
