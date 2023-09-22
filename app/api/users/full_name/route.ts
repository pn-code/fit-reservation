import { clerkClient, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { nameSchema } from "../../../../validations/nameValidator";
import type { User } from "@clerk/nextjs/api";

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

    // If user could not be found
    return NextResponse.json(
      { error: "Unable to complete action" },
      { status: 403 }
    );
  } catch (error: any) {
    console.error(error.message);
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
    }

    return NextResponse.json({ error: "Unable to validate" }, { status: 403 });

  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
