import Link from "next/link";

import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "@/lib/client";
import AllExerciseEntries from "@/components/journals/exercise/AllExerciseEntries";

export const metadata = {
    title: "All Exercise Journals | FitHeroes",
};

async function fetchUserExerciseJournals(userId: string) {
    const journals = await prisma.exerciseEntry.findMany({
        where: { userId: userId },
        orderBy: {
            date: "desc",
        },
    });
    return journals;
}

export default async function UserExerciseJournals() {
    const user = await currentUser();
    const entries = await fetchUserExerciseJournals(user?.id as string);

    return (
        <main className="w-full min-h-[calc(100vh-90px)] py-6 rounded-md flex flex-col gap-4 shadow-md px-4 lg:px-[4%]">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-primary items-center">
                <h1 className="text-xl sm:text-3xl">
                    {`${user?.firstName || "User"}'s Exercise Journals`}
                </h1>
                <Link
                    className="btn btn--primary"
                    passHref={true}
                    href="/journal"
                >
                    Back
                </Link>
            </header>

            {entries.length === 0 && <span>No journals were found.</span>}

            {/* Render Journals */}
            <AllExerciseEntries entries={entries} />
        </main>
    );
}
