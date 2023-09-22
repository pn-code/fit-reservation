import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs";
import { bodyFatSchema } from "../../../validations/bodyFatValidator";
import { dateStringSchema } from "../../../validations/dateStringValidator";

interface BodyFatMeasurementData {
  bodyfat: number;
  createdAt: string;
}

export async function GET() {
  try {
    const user = await currentUser();

    if (user) {
      const allBF = await prisma.bodyFatMeasurement.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc", // Sort by the 'createdAt' field in ascending order
        },
      });

      return NextResponse.json(allBF);
    }

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (user) {
      const res: BodyFatMeasurementData = await req.json();

      const validateBF = bodyFatSchema.parse(res.bodyfat);
      const validateDateString = dateStringSchema.parse(res.createdAt);

      if (validateBF && validateDateString) {
        const newBodyFatMeasurement = await prisma.bodyFatMeasurement.create({
          data: {
            createdAt: res.createdAt,
            bodyfat: Number(res.bodyfat),
            userId: user.id,
          },
        });
        return NextResponse.json(newBodyFatMeasurement);
      }
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
