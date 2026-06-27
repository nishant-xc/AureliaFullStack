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

/**
 * @openapi
 * /api/v1/customer/orders:
 *   get:
 *     tags:
 *       - Customer Orders
 *     summary: Get all customer orders
 *     description: Returns all orders placed by the authenticated customer.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Customer orders retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", authenticate, getOrders);

/**
 * @openapi
 * /api/v1/customer/orders/{id}:
 *   get:
 *     tags:
 *       - Customer Orders
 *     summary: Get customer order by ID
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
 * /api/v1/customer/orders/{id}/timeline:
 *   get:
 *     tags:
 *       - Customer Orders
 *     summary: Get order timeline
 *     description: Returns the timeline of status updates for an order.
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
 *         description: Order timeline retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */

router.get("/:id/timeline", authenticate, getTimeline);

/**
 * @openapi
 * /api/v1/customer/orders/{id}/tracking:
 *   get:
 *     tags:
 *       - Customer Orders
 *     summary: Get live order tracking
 *     description: Returns the latest tracking information for an order.
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
 *         description: Order tracking retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */

router.get("/:id/tracking", authenticate, getTracking);

export default router;
