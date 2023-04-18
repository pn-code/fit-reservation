import { z } from "zod";

export const foodIntakeSchema = z.object({
    name: z.string().min(1).max(30),
    calories: z.number().int().lte(9999),
    carbs: z.number().lte(500),
    fats: z.number().lte(500),
    protein: z.number().lte(500)
})