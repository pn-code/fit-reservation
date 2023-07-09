import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { planSchema } from "../../../validations/planValidator";

// Allow users to grab plans related to them
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const user = await currentUser();

        if (user) {
            // grab data from db
            const relatedPlans = await prisma.trainingPlan.findMany({
                where: {
                    OR: [
                        { userId: user.id },
                        {
                            savedByUsers: {
                                some: { userId: user.id },
                            },
                        },
                    ],
                },
                include: {
                    exercises: true,
                },
            });

            // return as json to user
            return NextResponse.json(relatedPlans);
        }
    } catch (error) {
        console.error(error);
        return NextResponse.error();
    }
}

export async function POST(req: Request) {
    const data = await req.json();
    const user = await currentUser();

    try {
        planSchema.parse(data);

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
