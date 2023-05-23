import { clerkClient } from "@clerk/nextjs/server";
import Link from "next/link";

export const metadata = {
    title: "Plans | FitHeroes",
};

interface Props {
    params: { userId: string };
}

export default async function Plans({ params }: Props) {
    const user = await clerkClient.users.getUser(params.userId);

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">{`${user.firstName} ${user.lastName}'s  Plans`}</h1>
                <Link
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
                    href="/plans/explore"
                >
                    Explore Plans
                </Link>
            </header>

            {/* User Plans Here */}
        </main>
    );
}
