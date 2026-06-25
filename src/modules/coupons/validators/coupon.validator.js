import { z } from "zod";

export const createCouponSchema = z.object({
    body: z.object({
        code: z.string().min(3).max(50),

        title: z.string().min(2).max(200),

        description: z.string().max(1000).optional().nullable(),

        discount_type: z.enum(["percentage", "fixed"]),

        discount_value: z.number().positive(),

        max_discount: z.number().nonnegative().optional().nullable(),

        minimum_order_amount: z.number().nonnegative().optional().nullable(),

        usage_limit: z.number().int().positive().optional().nullable(),

        per_user_limit: z.number().int().positive().optional().nullable(),

        starts_at: z.string().datetime().optional().nullable(),

        expires_at: z.string().datetime().optional().nullable(),

        is_active: z.boolean().optional(),
    }),
});

export const validateCouponSchema = z.object({
    body: z.object({
        code: z.string().min(3).max(50),

        order_amount: z.number().positive(),
    }),
});
