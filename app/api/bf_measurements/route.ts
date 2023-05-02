import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { bodyFatSchema } from "../../../validations/bodyFatValidator";

interface BodyFatMeasurementInput {
    bodyfat: number;
    userId: string;
}

export async function GET(req: Request) {
    try {
        const user = await currentUser();

        if (user) {
            const allBF = await prisma.bodyFatMeasurement.findMany({
                where: {
                    userId: user.id,
                },
            });

            return NextResponse.json(allBF);
        }
    } catch (error) {
        return console.error(error);
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (user) {
            const res = await req.json();

            const validateBF = bodyFatSchema.parse(res.bodyfat);

            if (validateBF) {
                const newBodyFatMeasurement =
                    await prisma.bodyFatMeasurement.create({
                        data: {
                            bodyfat: Number(res.bodyfat),
                            userId: user.id,
                        } as BodyFatMeasurementInput,
                    });
                return NextResponse.json(newBodyFatMeasurement);
            }
        }
    } catch (error) {
        return console.error(error);
    }
}
