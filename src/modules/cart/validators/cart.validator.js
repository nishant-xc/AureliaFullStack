import { z } from "zod";

import { uuid } from "../../../shared/validators/common.schemas.js";

export const addItemSchema = z.object({
    body: z.object({
        menu_item_id: uuid,

        quantity: z.number().int().positive().optional(),

        special_instructions: z.string().max(500).optional().nullable(),
    }),
});
