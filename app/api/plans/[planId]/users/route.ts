import { currentUser } from "@clerk/nextjs";
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

export async function DELETE(req: Request, { params }: Props) {
  try {
    const user = await currentUser();

    if (user) {
      const { id: userId } = user;

      const userToRemove = await prisma.savedByUser.deleteMany({
        where: {
          userId: userId,
          trainingPlanId: Number(params.planId),
        },
      });

      return NextResponse.json(userToRemove);
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
