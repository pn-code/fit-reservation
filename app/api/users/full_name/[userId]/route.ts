import { clerkClient } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

interface Params {
    params: { userId: string };
}

export async function GET(req: Request, { params }: Params) {
    const user = await clerkClient.users.getUser(params.userId);
    const { firstName, lastName } = user;

    return NextResponse.json({ user: `${firstName} ${lastName}` });
}
