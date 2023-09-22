import { currentUser } from "@clerk/nextjs";
import { prisma } from "../../../../lib/client";
import { NextResponse } from "next/server";

interface Props {
  params: { weightId: string };
}

export async function DELETE(req: Request, { params }: Props) {
  try {
    const user = await currentUser();
    if (user) {
      const { id: userId } = user;

      const weightToDelete = await prisma.weightMeasurement.deleteMany({
        where: {
          id: Number(params.weightId),
          userId: userId,
        },
      });

      return NextResponse.json(weightToDelete);
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
