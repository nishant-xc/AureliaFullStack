import { Router } from "express";

import { createCategory, getCategories, getCategory } from "../controllers/category.controller.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Category Routes
|--------------------------------------------------------------------------
*/

router.post("/", createCategory);

router.get("/restaurant/:restaurantId", getCategories);

router.get("/:id", getCategory);

export default router;
