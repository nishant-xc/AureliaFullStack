import { Router } from "express";

import { register, profile, dashboard } from "../controllers/admin.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { requireAdmin } from "../admin.middleware.js";

import { registerAdminSchema } from "../validators/admin.validator.js";

const router = Router();

/**
 * @openapi
 * /api/v1/admin/register:
 *   post:
 *     tags:
 *       - Admin
 *     summary: Register a new admin
 *     description: Registers a new administrator account.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Admin registered successfully.
 *       400:
 *         description: Validation failed.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

router.post("/register", authenticate, validate(registerAdminSchema), register);

/**
 * @openapi
 * /api/v1/admin/profile:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin profile
 *     description: Returns the authenticated administrator profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin profile retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

router.get("/profile", authenticate, requireAdmin, profile);

/**
 * @openapi
 * /api/v1/admin/dashboard:
 *   get:
 *     tags:
 *       - Admin
 *     summary: Get admin dashboard
 *     description: Returns dashboard statistics for administrators.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard retrieved successfully.
 *       401:
 *         description: Unauthorized.
 *       403:
 *         description: Forbidden.
 */

router.get("/dashboard", authenticate, requireAdmin, dashboard);

export default router;
