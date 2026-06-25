import { Router } from "express";

import {
    create,
    getRestaurantReviews,
    getById,
    update,
    remove,
} from "../controllers/review.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createReviewSchema, updateReviewSchema } from "../validators/review.validator.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get("/restaurant/:restaurantId", getRestaurantReviews);

router.get("/:id", getById);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post("/", authenticate, validate(createReviewSchema), create);

router.put("/:id", authenticate, validate(updateReviewSchema), update);

router.delete("/:id", authenticate, remove);

export default router;
