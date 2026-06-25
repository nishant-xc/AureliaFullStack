import { z } from "zod";

import { uuid, price } from "../../../shared/validators/common.schemas.js";

export const createPaymentSchema = z.object({
    body: z.object({
        order_id: uuid,
        amount: price,
        method: z.enum(["COD", "RAZORPAY", "STRIPE"]),
    }),
});

export const verifyPaymentSchema = z.object({
    body: z.object({
        transactionId: z.string().min(3).max(255),
    }),
});
