import { prisma } from "@/lib/client";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await currentUser();

        if (user) {
            const exerciseEntries = await prisma.exerciseEntry.findMany({
                where: {
                    userId: user.id,
                    type: "resistance",
                },
            });

            return NextResponse.json(exerciseEntries, { status: 200 });
        }

        // If user could not be found
        return NextResponse.json(
            { error: "Unable to complete action" },
            { status: 403 }
        );
    } catch (error) {
        return NextResponse.error();
    }
}
