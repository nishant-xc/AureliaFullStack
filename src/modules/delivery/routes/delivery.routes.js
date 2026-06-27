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

/**
 * @openapi
 * /api/v1/delivery/register:
 *   post:
 *     tags:
 *       - Delivery
 *     summary: Register as a delivery partner
 *     description: Registers the authenticated user as a delivery partner.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - vehicle_type
 *             properties:
 *               vehicle_type:
 *                 type: string
 *                 example: Bike
 *               vehicle_number:
 *                 type: string
 *                 example: BR01AB1234
 *     responses:
 *       201:
 *         description: Delivery partner registered successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/register", authenticate, validate(registerDeliverySchema), register);

/**
 * @openapi
 * /api/v1/delivery/online:
 *   patch:
 *     tags:
 *       - Delivery
 *     summary: Go online
 *     description: Marks the delivery partner as available.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery partner is now online.
 *       401:
 *         description: Unauthorized.
 */

router.patch("/online", authenticate, goOnline);

/**
 * @openapi
 * /api/v1/delivery/offline:
 *   patch:
 *     tags:
 *       - Delivery
 *     summary: Go offline
 *     description: Marks the delivery partner as unavailable.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delivery partner is now offline.
 *       401:
 *         description: Unauthorized.
 */

router.patch("/offline", authenticate, goOffline);

/**
 * @openapi
 * /api/v1/delivery/location:
 *   patch:
 *     tags:
 *       - Delivery
 *     summary: Update delivery partner location
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - latitude
 *               - longitude
 *             properties:
 *               latitude:
 *                 type: number
 *                 example: 25.5941
 *               longitude:
 *                 type: number
 *                 example: 85.1376
 *     responses:
 *       200:
 *         description: Location updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.patch("/location", authenticate, validate(updateLocationSchema), updateLocation);

/**
 * @openapi
 * /api/v1/delivery/assign/{orderId}:
 *   post:
 *     tags:
 *       - Delivery
 *     summary: Assign delivery partner to an order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Delivery partner assigned successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Order not found.
 */

router.post("/assign/:orderId", authenticate, assign);

/**
 * @openapi
 * /api/v1/delivery/assignment/{orderId}:
 *   get:
 *     tags:
 *       - Delivery
 *     summary: Get delivery assignment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Delivery assignment retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Assignment not found.
 */

router.get("/assignment/:orderId", authenticate, getAssignment);

export default router;
