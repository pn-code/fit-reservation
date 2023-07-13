import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../../lib/client";
import { NextRequest, NextResponse } from "next/server";

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
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params }: Params) {
    try {
        const user = await currentUser();
        const entryId = params.entryId;
        const data = await req.json();

        if (isNaN(Number(entryId))) return NextResponse.error();
        if (!user) throw Error("This action is forbidden.");

        const exerciseEntry = await prisma.exerciseEntry.updateMany({
            data: {
                sets: data.sets,
                reps: data.reps,
                weight: data.weight,
                calories: data.calories || 0,
                duration: data.duration
            },
            where: {
                id: Number(entryId),
                userId: user.id
            },
        });

        return NextResponse.json(exerciseEntry);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
