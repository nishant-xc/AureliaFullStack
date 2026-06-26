import { Router } from "express";

import menuController from "../controllers/menu.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createMenuSchema, updateMenuSchema } from "../validators/menu.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------

Menu Item Routes
*/

/**
 * @openapi
 * /api/v1/menu/items:
 *   post:
 *     tags:
 *       - Menu
 *     summary: Create a menu item
 *     description: Creates a new menu item for a restaurant.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *                 example: Margherita Pizza
 *               description:
 *                 type: string
 *                 example: Classic cheese pizza with fresh basil.
 *               price:
 *                 type: number
 *                 example: 299
 *     responses:
 *       201:
 *         description: Menu item created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/items", authenticate, validate(createMenuSchema), menuController.create);

/**
 * @openapi
 * /api/v1/menu/items:
 *   get:
 *     tags:
 *       - Menu
 *     summary: Get all menu items
 *     description: Returns all available menu items.
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully.
 */

router.get("/items", menuController.getAll);

/**
 * @openapi
 * /api/v1/menu/items/{slug}:
 *   get:
 *     tags:
 *       - Menu
 *     summary: Get menu item by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: margherita-pizza
 *     responses:
 *       200:
 *         description: Menu item retrieved successfully.
 *       404:
 *         description: Menu item not found.
 */

router.get("/items/:slug", menuController.getBySlug);

/**
 * @openapi
 * /api/v1/menu/categories/{categoryId}/items:
 *   get:
 *     tags:
 *       - Menu
 *     summary: Get menu items by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu items retrieved successfully.
 *       404:
 *         description: Category not found.
 */

router.get("/categories/:categoryId/items", menuController.getByCategory);

/**
 * @openapi
 * /api/v1/menu/items/{id}:
 *   put:
 *     tags:
 *       - Menu
 *     summary: Update a menu item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Menu item updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Menu item not found.
 */

router.put("/items/:id", authenticate, validate(updateMenuSchema), menuController.update);

/**
 * @openapi
 * /api/v1/menu/items/{id}:
 *   delete:
 *     tags:
 *       - Menu
 *     summary: Delete a menu item
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
 *         description: Menu item deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Menu item not found.
 */

router.delete("/items/:id", authenticate, menuController.delete);

export default router;
