import { z } from "zod";

export const createReviewSchema = z.object({
    body: z.object({
        restaurant_id: z.uuid(),

        order_id: z.uuid(),

        rating: z.number().int().min(1).max(5),

        review: z.string().min(3).max(1000),
    }),
});

export const updateReviewSchema = z.object({
    body: z.object({
        rating: z.number().int().min(1).max(5),

        review: z.string().min(3).max(1000),
    }),
});
