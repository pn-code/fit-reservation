import { z } from "zod";

export const reviewSchema = z.object({
    comment: z.string().max(500),
    rating: z.number().min(1).max(5),
    planId: z.number().min(1),
});
