import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../../lib/client";
import { NextResponse } from "next/server";

interface Props {
    params: { planId: number };
}

export async function POST(req: Request, { params }: Props) {
    try {
        const user = await currentUser();

        if (user) {
            const { id: userId } = user;

            const newUser = await prisma.savedByUser.create({
                data: {
                    userId: userId,
                    trainingPlanId: Number(params.planId),
                },
            });

            return NextResponse.json(newUser);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}

export async function DELETE(req: Request, { params }: Props) {
    try {
        const user = await currentUser();

        if (user) {
            const { id: userId } = user;

            const userToRemove = await prisma.savedByUser.deleteMany({
                where: {
                    userId: userId,
                    trainingPlanId: Number(params.planId)
                }
            });

            return NextResponse.json(userToRemove);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}