import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../../lib/client";
import { NextResponse } from "next/server";

interface Props {
    params: { reviewId: string };
}

export async function DELETE(req: Request, { params }: Props) {
    try {
        const user = await currentUser();
        if (user) {
            const { id: userId } = user;

            const reviewToDelete = await prisma.review.deleteMany({
                where: {
                    id: Number(params.reviewId),
                    userId: userId,
                },
            });

            return NextResponse.json(reviewToDelete);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
