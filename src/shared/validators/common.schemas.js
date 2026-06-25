import { z } from "zod";

export const uuid = z.string().uuid();

export const email = z.string().email();

export const password = z.string().min(8).max(100);

export const phone = z.string().min(10).max(15);

export const slug = z.string().min(2).max(220);

export const name = z.string().min(2).max(200);

export const price = z.number().nonnegative();
