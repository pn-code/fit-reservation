import { currentUser } from "@clerk/nextjs";
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

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
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

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
