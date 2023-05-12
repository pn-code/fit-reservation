import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const user = await currentUser();
    const data = await req.json();

    try {
        if (user) {
            await clerkClient.users.updateUser(user?.id, {
                firstName: data.firstName,
                lastName: data.lastName,
            });
        }

        return NextResponse.json({
            firstName: data.firstName,
            lastName: data.lastName,
        });
    } catch (error) {
        console.error(error, "Could not update user's names");
        return NextResponse.error();
    }
}
