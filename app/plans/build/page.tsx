import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";
import BuildPlanForm from "../../../components/BuildPlanForm";

export const metadata = {
    title: "Build Plan | FitHeroes",
};

export default async function BuildPlan() {
    const user = await currentUser();

    return (
        <main className="w-full min-h-[calc(100vh)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Build Plan</h1>
                <Link
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
                    href={`/plans/${user?.id}`}
                >
                    My Plans
                </Link>
            </header>

            <BuildPlanForm />
        </main>
    );
}
