import { z } from "zod";

import { name, email, phone } from "../../../shared/validators/common.schemas.js";

export const createRestaurantSchema = z.object({
    body: z.object({
        name,

        description: z.string().max(1000).optional(),

        email: email.optional(),

        phone: phone.optional(),

        address: z.string().min(5).max(500),

        city: z.string().min(2).max(100),

        state: z.string().min(2).max(100),

        country: z.string().min(2).max(100),
    }),
});

export const updateRestaurantSchema = z.object({
    body: z.object({
        name: name.optional(),

        description: z.string().max(1000).optional(),

        email: email.optional(),

        phone: phone.optional(),

        address: z.string().min(5).max(500).optional(),

        city: z.string().min(2).max(100).optional(),

        state: z.string().min(2).max(100).optional(),

        country: z.string().min(2).max(100).optional(),
    }),
});
