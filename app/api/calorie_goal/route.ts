import { currentUser } from "@clerk/nextjs/dist/app-beta";
import { prisma } from "../../../lib/client";
import { NextResponse } from "next/server";
import { calorieValidator } from "../../../validations/calculatorValidator";

export async function PUT(req: Request) {
	try {
		const user = await currentUser();
		const { goal } = await req.json();

		if (!user || !goal) throw Error;

		const validateGoal = calorieValidator.parse(goal);

		if (validateGoal) {
			const updateCalorieGoal = await prisma.calorieGoal.upsert({
				where: {
					userId: user.id,
				},
				create: {
					userId: user.id,
					goal,
				},
				update: {
					goal,
				},
			});

			return NextResponse.json(updateCalorieGoal);
		}
		return NextResponse.error()
	} catch (error) {
		console.error(error);
	}
}
