import { z } from "zod";

export const foodEntrySchema = z.object({
    name: z.string().min(1).max(60),
    calories: z.number().int().lte(1000),
    carbs: z.number().lte(1000).gte(0),
    fats: z.number().lte(1000).gte(0),
    protein: z.number().lte(1000).gte(0)
})