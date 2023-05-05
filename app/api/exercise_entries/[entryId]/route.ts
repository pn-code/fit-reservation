import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../lib/client";
import { NextResponse } from "next/server";

interface Params {
    params: { entryId: string };
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        const user = await currentUser();

        const entryId = params.entryId;

        if (isNaN(Number(entryId))) return NextResponse.error();

        if (!user) throw Error("This action is forbidden.");

        // Check to see if this entry is this user's
        const foundEntryOwner = await prisma.exerciseEntry.findFirst({
            where: { id: Number(entryId) },
            select: {
                userId: true,
            },
        });

        if (foundEntryOwner?.userId != user.id) return NextResponse.error();

        const exerciseEntry = await prisma.exerciseEntry.delete({
            where: {
                id: Number(entryId),
            },
        });

        return NextResponse.json(exerciseEntry);
    } catch (error) {
        console.error(error);
    }
}
