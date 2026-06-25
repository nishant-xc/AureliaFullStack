import { Router } from "express";

import { authenticate } from "../../../shared/middlewares/auth.middleware.js";

import { validate } from "../../../shared/validators/validate.js";

import { createAddressSchema, updateAddressSchema } from "../validators/address.validator.js";

import { create, getAll, getById, update, remove } from "../controllers/address.controller.js";

const router = Router();

router.post("/", authenticate, validate(createAddressSchema), create);

router.get("/", authenticate, getAll);

router.get("/:id", authenticate, getById);

router.put("/:id", authenticate, validate(updateAddressSchema), update);

router.delete("/:id", authenticate, remove);

export default router;
