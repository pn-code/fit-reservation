import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { nameSchema } from "../../../../validations/nameValidator";
import { User } from "@clerk/nextjs/dist/api";

export async function GET() {
    try {
    const user = await currentUser();
        if (user) {
            const allUsers = await clerkClient.users.getUserList();

            // Only return id and name
            const modifiedUsers = allUsers.map((user: User) => ({
                id: user.id,
                fullName: `${user.firstName} ${user.lastName}`,
            }));

            return NextResponse.json(modifiedUsers);
        }
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        const user = await currentUser();
        const data = await req.json();

        const isFirstNameValid = nameSchema.parse(data.firstName);
        const isLastNameValid = nameSchema.parse(data.lastName);

        if (isFirstNameValid && isLastNameValid) {
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
        } else {
            console.error("User inputs for names failed validation.");
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
