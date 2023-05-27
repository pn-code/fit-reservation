import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../lib/client";
import { NextResponse } from "next/server";

interface Props {
    params: { planId: string };
}

export async function DELETE(req: Request, { params }: Props) {
    try {
        const user = await currentUser();

        if (user) {
            const { id: userId } = user;

            const planToDelete = await prisma.trainingPlan.deleteMany({
                where: {
                    id: Number(params.planId),
                    userId: userId,
                },
            });
            return NextResponse.json(planToDelete);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
