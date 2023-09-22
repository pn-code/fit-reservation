import { currentUser } from "@clerk/nextjs";
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
        const foundEntryOwner = await prisma.foodEntry.findFirst({
            where: { id: Number(entryId) },
            select: {
                userId: true,
            },
        });

        if (foundEntryOwner?.userId != user.id) return NextResponse.error();

        const foodEntry = await prisma.foodEntry.delete({
            where: {
                id: Number(entryId),
            },
        });

        return NextResponse.json(foodEntry);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
