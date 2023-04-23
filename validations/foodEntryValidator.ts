import { z } from "zod";

export const foodEntrySchema = z.object({
    name: z.string().min(1).max(60),
    calories: z.number().int().lte(9999),
    carbs: z.number().lte(500),
    fats: z.number().lte(500),
    protein: z.number().lte(500)
})