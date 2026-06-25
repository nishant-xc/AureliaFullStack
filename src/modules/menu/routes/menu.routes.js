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

router.post("/items", authenticate, validate(createMenuSchema), menuController.create);

router.get("/items", menuController.getAll);

router.get("/items/:slug", menuController.getBySlug);

router.get("/categories/:categoryId/items", menuController.getByCategory);

router.put("/items/:id", authenticate, validate(updateMenuSchema), menuController.update);

router.delete("/items/:id", authenticate, menuController.delete);

export default router;
