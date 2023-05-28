import { z } from "zod";

export const UserSchema = z.object({
    id: z.string().min(5),
    planId: z.number()
})