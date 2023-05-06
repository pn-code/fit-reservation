import { z } from "zod";

export const exerciseEntrySchema = z.object({
    name: z.string().min(3).max(60),
    type: z.union([z.literal("resistance"), z.literal("cardio")]),
    weight: z.optional(z.number()),
    sets: z.optional(z.number()),
    reps: z.optional(z.number()),
    duration: z.optional(z.number()),
    calories: z.optional(z.number())
})