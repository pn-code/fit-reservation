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

export async function PUT(req: Request, { params }: Props) {
    try {
        const user = await currentUser();
        const data = await req.json();
        if (user) {
            const { id: userId } = user;

            const reviewToDelete = await prisma.review.updateMany({
                where: {
                    id: Number(params.reviewId),
                    userId: userId,
                },
                data: {
                    comment: data.comment,
                    rating: data.rating,
                    modifiedAt: new Date(),
                },
            });

            return NextResponse.json(reviewToDelete);
        }
    } catch (error) {
        console.log(error);
        return NextResponse.error();
    }
}
