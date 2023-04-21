import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (user) {
			const res = await req.json();

			const newExerciseEntry = await prisma.exerciseEntry.create({
				data: {
					name: res.name,
					type: res.type,
					duration: res.duration,
					sets: res.sets,
					reps: res.reps,
                    weight: res.weight,
                    calories: res.calories,
					userId: user.id,
				},
			});

			return NextResponse.json(newExerciseEntry);
		}
	} catch (error) {
		return console.error(error);
	}
}
