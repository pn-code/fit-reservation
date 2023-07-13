import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { foodEntrySchema } from "../../../validations/foodEntryValidator";
import getLocalTimezones from "../../../helpers/getLocalTimezone";

export async function GET() {
	try {
		const user = await currentUser();
		const localTime = getLocalTimezones();

		if (user) {
			const foodEntries = await prisma.foodEntry.findMany({
				where: {
					userId: user.id,
					date: {
						gte: localTime.startOfDay,
						lt: localTime.endOfDay,
					},
				},
			});

			return NextResponse.json(foodEntries);
		} 
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}

export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (user) {
			const res = await req.json();
			const validateFoodEntry = foodEntrySchema.parse(res);

			if (validateFoodEntry) {
				const newFoodEntry = await prisma.foodEntry.create({
					data: {
						name: res.name,
						calories: res.calories,
						carbs: res.carbs,
						fats: res.fats,
						protein: res.protein,
						userId: user.id,
					},
				});

				return NextResponse.json(newFoodEntry);
			}
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
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
		const foundEntryOwner = await prisma.foodEntry.findFirst({
			where: { id: res.id },
			select: {
				userId: true,
			},
		});

		if (foundEntryOwner?.userId != user.id) return NextResponse.error();

		const foodEntry = await prisma.foodEntry.delete({
			where: {
				id: res.id,
			},
		});

		return NextResponse.json(foodEntry);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
	}
}
