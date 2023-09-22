import { currentUser } from "@clerk/nextjs";
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
