import { Router } from "express";

import { register, login, me } from "../controllers/auth.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { authLimiter } from "../../../shared/middlewares/rateLimit.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

router.post("/register", authLimiter, validate(registerSchema), register);

router.post("/login", authLimiter, validate(loginSchema), login);

router.get("/me", authenticate, me);

export default router;
