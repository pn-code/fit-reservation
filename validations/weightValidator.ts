import { z } from "zod";

export const weightSchema = z.number().min(70).max(1000);
