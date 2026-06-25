import { Router } from "express";

import { register, profile, dashboard } from "../controllers/admin.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { requireAdmin } from "../admin.middleware.js";

import { registerAdminSchema } from "../validators/admin.validator.js";

const router = Router();

router.post("/register", authenticate, validate(registerAdminSchema), register);

router.get("/profile", authenticate, requireAdmin, profile);

router.get("/dashboard", authenticate, requireAdmin, dashboard);

export default router;
