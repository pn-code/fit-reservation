import { z } from "zod";

export const calculatorValidator = z.object({
	age: z.number().gt(4),
	gender: z.union([z.literal("male"), z.literal("female")]),
	height: z.object({
		feet: z.number().lt(9).gt(2),
		inches: z.number().lt(12),
	}),
	weight: z.number().lt(1000).gt(60),
	activity: z.number().gt(0.5).lt(2),
	plan: z.number(),
});

export const calorieValidator = z.number();
