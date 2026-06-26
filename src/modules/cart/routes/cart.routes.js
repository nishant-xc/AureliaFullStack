import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { addItemSchema } from "../validators/cart.validator.js";

import cartController from "../controllers/cart.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/cart:
 *   post:
 *     tags:
 *       - Cart
 *     summary: Add item to cart
 *     description: Adds a menu item to the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menu_item_id
 *               - quantity
 *             properties:
 *               menu_item_id:
 *                 type: string
 *                 format: uuid
 *                 example: 550e8400-e29b-41d4-a716-446655440000
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item added to cart successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/", authenticate, validate(addItemSchema), cartController.addItem);

/**
 * @openapi
 * /api/v1/cart:
 *   get:
 *     tags:
 *       - Cart
 *     summary: Get cart
 *     description: Returns all items in the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", authenticate, cartController.getCart);

/**
 * @openapi
 * /api/v1/cart/{id}:
 *   delete:
 *     tags:
 *       - Cart
 *     summary: Remove item from cart
 *     description: Removes a cart item from the authenticated user's cart.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 550e8400-e29b-41d4-a716-446655440000
 *     responses:
 *       200:
 *         description: Cart item removed successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Cart item not found.
 */

router.delete("/:id", authenticate, cartController.removeItem);

export default router;
