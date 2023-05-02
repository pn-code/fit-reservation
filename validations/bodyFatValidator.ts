import { z } from "zod";

export const bodyFatSchema = z.number().min(2).max(60);