import { Router } from "express";

import {
    getOrders,
    getOrderById,
    getTimeline,
    getTracking,
} from "../controllers/customerOrder.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Customer Orders
|--------------------------------------------------------------------------
*/

router.get("/", authenticate, getOrders);

router.get("/:id", authenticate, getOrderById);

router.get("/:id/timeline", authenticate, getTimeline);

router.get("/:id/tracking", authenticate, getTracking);

export default router;
