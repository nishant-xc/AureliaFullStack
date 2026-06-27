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

/**
 * @openapi
 * /api/v1/restaurant/orders:
 *   get:
 *     tags:
 *       - Restaurant Orders
 *     summary: Get all restaurant orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant orders retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", authenticate, getOrders);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}:
 *   get:
 *     tags:
 *       - Restaurant Orders
 *     summary: Get restaurant order by ID
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
 *         description: Order retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */

router.get("/:id", authenticate, getOrderById);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/accept:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Accept order
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
 *         description: Order accepted successfully.
 */

router.patch("/:id/accept", authenticate, acceptOrder);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/preparing:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Mark order as preparing
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
 *         description: Order marked as preparing.
 */

router.patch("/:id/preparing", authenticate, preparingOrder);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/ready:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Mark order as ready
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
 *         description: Order marked as ready.
 */

router.patch("/:id/ready", authenticate, readyOrder);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/out-for-delivery:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Mark order as out for delivery
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
 *         description: Order marked as out for delivery.
 */

router.patch("/:id/out-for-delivery", authenticate, outForDeliveryOrder);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/delivered:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Mark order as delivered
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
 *         description: Order marked as delivered.
 */

router.patch("/:id/delivered", authenticate, deliveredOrder);

/**
 * @openapi
 * /api/v1/restaurant/orders/{id}/cancel:
 *   patch:
 *     tags:
 *       - Restaurant Orders
 *     summary: Cancel order
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
 *         description: Order cancelled successfully.
 */

router.patch("/:id/cancel", authenticate, cancelOrder);

export default router;
