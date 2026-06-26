import { Router } from "express";

import { create, getAll, getBySlug, update, remove } from "../controllers/restaurant.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import authorize from "../../../shared/middlewares/authorize.middleware.js";

import { ROLES } from "../../../shared/constants/roles.js";

import { validate } from "../../../shared/validators/validate.js";

import {
    createRestaurantSchema,
    updateRestaurantSchema,
} from "../validators/restaurant.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/**
 * @openapi
 * /api/v1/restaurants:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: Get all restaurants
 *     description: Returns a list of all available restaurants.
 *     responses:
 *       200:
 *         description: Restaurants retrieved successfully.
 */

router.get("/", getAll);

/**
 * @openapi
 * /api/v1/restaurants/{slug}:
 *   get:
 *     tags:
 *       - Restaurants
 *     summary: Get restaurant by slug
 *     description: Returns details of a single restaurant using its unique slug.
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         example: pizza-hut-patna
 *     responses:
 *       200:
 *         description: Restaurant retrieved successfully.
 *       404:
 *         description: Restaurant not found.
 */

router.get("/:slug", getBySlug);

/*
|--------------------------------------------------------------------------
| Protected Routes (Owner Only)
|--------------------------------------------------------------------------
*/

/**
 * @openapi
 * /api/v1/restaurants:
 *   post:
 *     tags:
 *       - Restaurants
 *     summary: Create a new restaurant
 *     description: Creates a new restaurant. Only users with the OWNER role can access this endpoint.
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
 *               - address
 *               - city
 *               - state
 *               - country
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza Hut
 *               address:
 *                 type: string
 *                 example: Fraser Road
 *               city:
 *                 type: string
 *                 example: Patna
 *               state:
 *                 type: string
 *                 example: Bihar
 *               country:
 *                 type: string
 *                 example: India
 *     responses:
 *       201:
 *         description: Restaurant created successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden. Owner access required.
 *       400:
 *         description: Validation failed.
 */

router.post("/", authenticate, authorize(ROLES.OWNER), validate(createRestaurantSchema), create);

/**
 * @openapi
 * /api/v1/restaurants/{id}:
 *   put:
 *     tags:
 *       - Restaurants
 *     summary: Update a restaurant
 *     description: Updates an existing restaurant. Only the restaurant owner can perform this action.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pizza Hut Premium
 *               address:
 *                 type: string
 *                 example: Boring Road
 *               city:
 *                 type: string
 *                 example: Patna
 *               state:
 *                 type: string
 *                 example: Bihar
 *               country:
 *                 type: string
 *                 example: India
 *     responses:
 *       200:
 *         description: Restaurant updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Restaurant not found.
 */

router.put("/:id", authenticate, authorize(ROLES.OWNER), validate(updateRestaurantSchema), update);

/**
 * @openapi
 * /api/v1/restaurants/{id}:
 *   delete:
 *     tags:
 *       - Restaurants
 *     summary: Delete a restaurant
 *     description: Deletes an existing restaurant. Only the restaurant owner can perform this action.
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
 *         description: Restaurant deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Restaurant not found.
 */

router.delete("/:id", authenticate, authorize(ROLES.OWNER), remove);

export default router;
