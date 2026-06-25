import { z } from "zod";

import { email, password, phone, name } from "../../../shared/validators/common.schemas.js";

export const registerSchema = z.object({
    body: z.object({
        full_name: name,

        email,

        password,

        phone: phone.optional(),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        email,

        password,
    }),
});
