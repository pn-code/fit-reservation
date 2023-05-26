import { z } from "zod";

export const planSchema = z.object({
    name: z.string().min(1).max(20),
    description: z.string().min(1).max(600),
    exercises: z.array(z.object({
        name: z.string().min(1).max(20),
        reps: z.number().min(0),
        sets: z.number().min(0),
        type: z.string().min(1),
        duration: z.number().min(0)
    }))
})