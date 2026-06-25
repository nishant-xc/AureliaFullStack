import { z } from "zod";

import { name, phone } from "../../../shared/validators/common.schemas.js";

export const createAddressSchema = z.object({
    body: z.object({
        full_name: name,

        phone,

        address_line_1: z.string().min(5).max(255),

        address_line_2: z.string().max(255).optional().nullable(),

        landmark: z.string().max(255).optional().nullable(),

        city: z.string().min(2).max(100),

        state: z.string().min(2).max(100),

        country: z.string().min(2).max(100),

        postal_code: z.string().min(3).max(20),

        latitude: z.number().optional().nullable(),

        longitude: z.number().optional().nullable(),

        address_type: z.enum(["HOME", "WORK", "OTHER"]).optional(),

        is_default: z.boolean().optional(),
    }),
});

export const updateAddressSchema = z.object({
    body: z.object({
        full_name: name.optional(),

        phone: phone.optional(),

        address_line_1: z.string().min(5).max(255).optional(),

        address_line_2: z.string().max(255).optional().nullable(),

        landmark: z.string().max(255).optional().nullable(),

        city: z.string().min(2).max(100).optional(),

        state: z.string().min(2).max(100).optional(),

        country: z.string().min(2).max(100).optional(),

        postal_code: z.string().min(3).max(20).optional(),

        latitude: z.number().optional().nullable(),

        longitude: z.number().optional().nullable(),

        address_type: z.enum(["HOME", "WORK", "OTHER"]).optional(),

        is_default: z.boolean().optional(),
    }),
});
