import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/client";
import { currentUser } from "@clerk/nextjs";
import { reviewSchema } from "../../../../validations/reviewValidator";

export async function POST(req: Request) {
  const data = await req.json();
  const user = await currentUser();

  if (!reviewSchema.parse(data)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    if (user && data) {
      const review = await prisma.review.create({
        data: {
          userId: user.id,
          rating: data.rating,
          comment: data.comment,
          trainingPlanId: data.planId,
        },
      });

      return NextResponse.json(review);
    }

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
