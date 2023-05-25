import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";

export async function POST(req: Request) {
    const data = await req.json();
    const user = await currentUser();

    try {
        if (user && data) {
            const review = await prisma.review.create({
                data: {
                    userId: user.id,
                    rating: data.rating,
                    comment: data.comment,
                    trainingPlanId: data.planId
                }
            });

            return NextResponse.json(review);
        } else {
            return NextResponse.error();
        }
    } catch (error) {
        return NextResponse.error();
    }
}
