import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function GET(req: Request) {
	try {
		const user = await currentUser();

		if (!user) throw Error;

		const calorieGoal = await prisma.calorieGoal.findFirst({
			where: {
				userId: user.id
			}
		})

		return NextResponse.json(calorieGoal)

	} catch{
		return NextResponse.json({ error: "Ran into an error..." });
	}
}

export async function PUT(req: Request) {
	try {
		const user = await currentUser();
		const { goal } = await req.json();

		if (!user || !goal) throw Error;

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
	} catch (error) {
		return NextResponse.json({ error: "Ran into an error..." });
	}
}
