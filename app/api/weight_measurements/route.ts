import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function POST(req: Request) {
	try {
		const user = await currentUser();

		if (user) {
			const res = await req.json();

			const newWeightMeasurement = await prisma.weightMeasurement.create({
				data: {
					weight: res.weight,
					userId: user.id,
				},
			});

			return NextResponse.json(newWeightMeasurement);
		}
	} catch (error) {
		return console.error(error);
	}
}
