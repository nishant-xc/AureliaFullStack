import { Router } from "express";

import {
    getOrders,
    getOrderById,
    acceptOrder,
    preparingOrder,
    readyOrder,
    outForDeliveryOrder,
    deliveredOrder,
    cancelOrder,
} from "../controllers/restaurantOrder.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

router.get("/", authenticate, getOrders);

router.get("/:id", authenticate, getOrderById);

router.patch("/:id/accept", authenticate, acceptOrder);

router.patch("/:id/preparing", authenticate, preparingOrder);

router.patch("/:id/ready", authenticate, readyOrder);

router.patch("/:id/out-for-delivery", authenticate, outForDeliveryOrder);

router.patch("/:id/delivered", authenticate, deliveredOrder);

router.patch("/:id/cancel", authenticate, cancelOrder);

export default router;
