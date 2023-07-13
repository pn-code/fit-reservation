import { NextResponse } from "next/server";
import { prisma } from "../../../lib/client";
import { currentUser } from "@clerk/nextjs/app-beta";
import { weightSchema } from "../../../validations/weightValidator";
import { dateStringSchema } from "../../../validations/dateStringValidator";

export async function GET() {
    try {
        const user = await currentUser();

        if (user) {
            const allWeights = await prisma.weightMeasurement.findMany({
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: "desc", // Sort by the 'createdAt' field in ascending order
                },
            });

            return NextResponse.json(allWeights);
        }
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(req: Request) {
    try {
        const user = await currentUser();

        if (user) {
            const res = await req.json();

            const validateWeight = weightSchema.parse(res.weight);
            const validateDateString = dateStringSchema.parse(res.createdAt);

            if (validateWeight && validateDateString) {
                const newWeightMeasurement =
                    await prisma.weightMeasurement.create({
                        data: {
                            weight: res.weight,
                            userId: user.id,
                            createdAt: res.createdAt,
                        },
                    });

                return NextResponse.json(newWeightMeasurement);
            }
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
