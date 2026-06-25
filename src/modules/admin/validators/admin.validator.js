import { z } from "zod";

export const registerAdminSchema = z.object({
    body: z.object({
        role: z.enum(["admin", "super_admin"]).optional(),
    }),
});
