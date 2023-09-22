import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs";
import { planSchema } from "../../../validations/planValidator";

// Allow users to grab plans related to them
export async function GET() {
  try {
    const user = await currentUser();

    if (user) {
      const relatedPlans = await prisma.trainingPlan.findMany({
        where: {
          OR: [
            { userId: user.id },
            {
              savedByUsers: {
                some: { userId: user.id },
              },
            },
          ],
        },
        include: {
          exercises: true,
        },
      });

      return NextResponse.json(relatedPlans);
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

export async function POST(req: Request) {
  const data = await req.json();
  const user = await currentUser();

  try {
    planSchema.parse(data);

    if (user && data) {
      const trainingPlan = await prisma.trainingPlan.create({
        data: {
          userId: user.id,
          name: data.name,
          description: data.description,
          exercises: {
            create: data.exercises,
          },
        },
        include: {
          exercises: true,
        },
      });

      return NextResponse.json(trainingPlan);
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
