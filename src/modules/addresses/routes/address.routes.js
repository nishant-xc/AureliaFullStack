import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createAddressSchema, updateAddressSchema } from "../validators/address.validator.js";

import { create, getAll, getById, update, remove } from "../controllers/address.controller.js";

const router = Router();

/**
 * @openapi
 * /api/v1/addresses:
 *   post:
 *     tags:
 *       - Addresses
 *     summary: Create a new address
 *     description: Adds a new delivery address for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - phone
 *               - address_line
 *               - city
 *               - state
 *               - postal_code
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Nishant Tiwari
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address_line:
 *                 type: string
 *                 example: Fraser Road
 *               city:
 *                 type: string
 *                 example: Patna
 *               state:
 *                 type: string
 *                 example: Bihar
 *               postal_code:
 *                 type: string
 *                 example: "800001"
 *     responses:
 *       201:
 *         description: Address created successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 */

router.post("/", authenticate, validate(createAddressSchema), create);

/**
 * @openapi
 * /api/v1/addresses:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get all addresses
 *     description: Returns all saved addresses for the authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Addresses retrieved successfully.
 *       401:
 *         description: Unauthorized.
 */

router.get("/", authenticate, getAll);

/**
 * @openapi
 * /api/v1/addresses/{id}:
 *   get:
 *     tags:
 *       - Addresses
 *     summary: Get address by ID
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
 *         description: Address retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Address not found.
 */

router.get("/:id", authenticate, getById);

/**
 * @openapi
 * /api/v1/addresses/{id}:
 *   put:
 *     tags:
 *       - Addresses
 *     summary: Update an address
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
 *         description: Address updated successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Address not found.
 */

router.put("/:id", authenticate, validate(updateAddressSchema), update);

/**
 * @openapi
 * /api/v1/addresses/{id}:
 *   delete:
 *     tags:
 *       - Addresses
 *     summary: Delete an address
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
 *         description: Address deleted successfully.
 *       401:
 *         description: Unauthorized.
 *       404:
 *         description: Address not found.
 */

router.delete("/:id", authenticate, remove);

export default router;
