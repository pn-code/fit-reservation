import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Plans | FitHeroes",
};

export default async function ExplorePlans() {
    const user = await currentUser();

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Explore Plans</h1>
                <Link
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
                    href={`/plans/${user?.id}`}
                >
                    My Plans
                </Link>
            </header>

            {/* Plans Here */}
        </main>
    );
}
