import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function POST(req: Request) {
    const data = await req.json();
    const user = await currentUser();

    try {
        if (user && data) {
            const trainingPlan = await prisma.trainingPlan.create({
                data: {
                    userId: user.id,
                    name: data.name,
                    description: data.description,
                    exercises: {
                        create: data.exercises,
                    },
                },
                include: {
                    exercises: true,
                },
            });

            return NextResponse.json(trainingPlan);
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        return NextResponse.error();
    }
}
