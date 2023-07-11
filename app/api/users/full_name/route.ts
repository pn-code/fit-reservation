import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { NextResponse } from "next/server";
import { nameSchema } from "../../../../validations/nameValidator";
import { User } from "@clerk/nextjs/dist/api";

export async function GET() {
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
}

export async function PUT(req: Request) {
    const user = await currentUser();
    const data = await req.json();

    const isFirstNameValid = nameSchema.parse(data.firstName);
    const isLastNameValid = nameSchema.parse(data.lastName);

    if (isFirstNameValid && isLastNameValid) {
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
    } else {
        console.error("User inputs for names failed validation.");
        return NextResponse.error();
    }
}
