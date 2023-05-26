import { z } from "zod";

export const exerciseSchema = z.object({
    name: z.string().min(1).max(20),
    reps: z.number().min(0),
    sets: z.number().min(0),
    type: z.string().min(1),
    duration: z.number().min(0),
});
