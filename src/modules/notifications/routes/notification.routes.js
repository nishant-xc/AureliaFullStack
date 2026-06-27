import { Router } from "express";

import {
    create,
    getAll,
    getById,
    markAsRead,
    markAllAsRead,
    remove,
} from "../controllers/notification.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Notification Routes
|--------------------------------------------------------------------------
*/

/**
 * @openapi
 * /api/v1/notifications:
 *   post:
 *     tags:
 *       - Notifications
 *     summary: Create a notification
 *     description: Creates a notification for an authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - message
 *             properties:
 *               title:
 *                 type: string
 *                 example: Order Confirmed
 *               message:
 *                 type: string
 *                 example: Your order has been confirmed successfully.
 *     responses:
 *       201:
 *         description: Notification created successfully.
 *       401:
 *         description: Unauthorized.
 */

router.post("/", authenticate, create);

/**
 * @openapi
 * /api/v1/notifications:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get all notifications
 *     description: Returns all notifications for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", authenticate, getAll);

/**
 * @openapi
 * /api/v1/notifications/{id}:
 *   get:
 *     tags:
 *       - Notifications
 *     summary: Get notification by ID
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
 *         description: Notification retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Notification not found.
 */

router.get("/:id", authenticate, getById);

/**
 * @openapi
 * /api/v1/notifications/{id}/read:
 *   patch:
 *     tags:
 *       - Notifications
 *     summary: Mark notification as read
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
 *         description: Notification marked as read.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Notification not found.
 */

router.patch("/:id/read", authenticate, markAsRead);

/**
 * @openapi
 * /api/v1/notifications/read-all:
 *   patch:
 *     tags:
 *       - Notifications
 *     summary: Mark all notifications as read
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read.
 *       401:
 *         description: Unauthorized.
 */

router.patch("/read-all", authenticate, markAllAsRead);

/**
 * @openapi
 * /api/v1/notifications/{id}:
 *   delete:
 *     tags:
 *       - Notifications
 *     summary: Delete notification
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
 *         description: Notification deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Notification not found.
 */

router.delete("/:id", authenticate, remove);

export default router;
