import { z } from "zod";

export const registerDeliverySchema = z.object({
    body: z.object({
        full_name: z.string().min(2).max(200),

        phone: z.string().min(10).max(15),

        vehicle_type: z.string().min(2).max(100),

        vehicle_number: z.string().min(2).max(50),
    }),
});

export const updateLocationSchema = z.object({
    body: z.object({
        latitude: z.number().min(-90).max(90),

        longitude: z.number().min(-180).max(180),
    }),
});
