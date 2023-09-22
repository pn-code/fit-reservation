import { currentUser } from "@clerk/nextjs";
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
