import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { exerciseEntrySchema } from "../../../validations/exerciseEntryValidator";

export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (user) {
			const res = await req.json();
			const validateExerciseEntry = exerciseEntrySchema.parse(res);

			if (validateExerciseEntry) {
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

			return NextResponse.error()
		}
	} catch (error) {
		return console.error(error);
	}
}

export async function DELETE(req: Request) {
	try {
		const user = await currentUser();
		const res = await req.json();

		if (!user) throw Error("This action is forbidden.");

		// Check to see if this entry is this user's
		const foundEntryOwner = await prisma.exerciseEntry.findFirst({
			where: { id: res.id },
			select: {
				userId: true,
			},
		});

		if (foundEntryOwner?.userId != user.id) return NextResponse.error();

		const exerciseEntry = await prisma.exerciseEntry.delete({
			where: {
				id: res.id,
			},
		});

		return NextResponse.json(exerciseEntry);
	} catch (error) {
		console.error(error);
	}
}
