import { z } from "zod";

import { uuid, name, price } from "../../../shared/validators/common.schemas.js";

export const createMenuSchema = z.object({
    body: z.object({
        restaurant_id: uuid,

        category_id: uuid,

        name,

        description: z.string().max(2000).optional().nullable(),

        image_url: z.string().url().optional().nullable(),

        price,

        discount_price: z.number().nonnegative().optional().nullable(),

        is_veg: z.boolean().optional(),

        is_available: z.boolean().optional(),

        is_featured: z.boolean().optional(),

        preparation_time: z.number().int().positive().optional(),

        calories: z.number().int().nonnegative().optional(),
    }),
});

export const updateMenuSchema = z.object({
    body: z.object({
        name: name.optional(),

        description: z.string().max(2000).optional().nullable(),

        image_url: z.string().url().optional().nullable(),

        price: price.optional(),

        discount_price: z.number().nonnegative().optional().nullable(),

        is_veg: z.boolean().optional(),

        is_available: z.boolean().optional(),

        is_featured: z.boolean().optional(),

        preparation_time: z.number().int().positive().optional(),

        calories: z.number().int().nonnegative().optional(),
    }),
});

export const createCategorySchema = z.object({
    body: z.object({
        restaurant_id: uuid,

        name,

        description: z.string().max(1000).optional().nullable(),

        image_url: z.string().url().optional().nullable(),

        display_order: z.number().int().nonnegative().optional(),
    }),
});
