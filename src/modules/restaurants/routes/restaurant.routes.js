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

router.get("/", getAll);

router.get("/:slug", getBySlug);

/*
|--------------------------------------------------------------------------
| Protected Routes (Owner Only)
|--------------------------------------------------------------------------
*/

router.post("/", authenticate, authorize(ROLES.OWNER), validate(createRestaurantSchema), create);

router.put("/:id", authenticate, authorize(ROLES.OWNER), validate(updateRestaurantSchema), update);

router.delete("/:id", authenticate, authorize(ROLES.OWNER), remove);

export default router;
