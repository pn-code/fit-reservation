import { currentUser } from "@clerk/nextjs/dist/app-beta";
import { prisma } from "../../../lib/client";
import { NextResponse } from "next/server";

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
        console.error(error);
    }
}
