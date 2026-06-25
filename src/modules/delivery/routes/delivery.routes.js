import { Router } from "express";

import {
    register,
    goOnline,
    goOffline,
    updateLocation,
    assign,
    getAssignment,
} from "../controllers/delivery.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { registerDeliverySchema, updateLocationSchema } from "../validators/delivery.validator.js";

const router = Router();

router.post("/register", authenticate, validate(registerDeliverySchema), register);

router.patch("/online", authenticate, goOnline);

router.patch("/offline", authenticate, goOffline);

router.patch("/location", authenticate, validate(updateLocationSchema), updateLocation);

router.post("/assign/:orderId", authenticate, assign);

router.get("/assignment/:orderId", authenticate, getAssignment);

export default router;
