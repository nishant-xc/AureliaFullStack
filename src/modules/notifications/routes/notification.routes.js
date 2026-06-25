import { Router } from "express";

import {
    create,
    getAll,
    getById,
    markAsRead,
    markAllAsRead,
    remove,
} from "../controllers/notification.controller.js";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Notification Routes
|--------------------------------------------------------------------------
*/

router.post("/", authenticate, create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.patch("/:id/read", authenticate, markAsRead);

router.patch("/read-all", authenticate, markAllAsRead);

router.delete("/:id", authenticate, remove);

export default router;
