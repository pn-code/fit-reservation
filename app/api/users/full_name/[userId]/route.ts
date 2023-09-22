import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
  params: { userId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const user = await clerkClient.users.getUser(params.userId);
    const { firstName, lastName } = user;

    return NextResponse.json({ user: `${firstName} ${lastName}` });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
