import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../lib/client";
import { NextResponse } from "next/server";

interface Props {
    params: { bodyFatId: string };
}

export async function DELETE(req: Request, { params }: Props) {
    try {
        const user = await currentUser();
        if (user) {
            const { id: userId } = user;

            const bodyFatToDelete = await prisma.bodyFatMeasurement.deleteMany({
                where: {
                    id: Number(params.bodyFatId),
                    userId: userId,
                },
            });

            return NextResponse.json(bodyFatToDelete);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
