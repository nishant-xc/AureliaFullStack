import { z } from "zod";

export const checkoutSchema = z.object({
    body: z.object({
        payment_method: z.enum(["COD", "RAZORPAY", "STRIPE"]).optional(),

        notes: z.string().max(1000).optional().nullable(),

        coupon_code: z.string().max(100).optional().nullable(),
    }),
});
