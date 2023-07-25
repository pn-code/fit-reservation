import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "../../../lib/client";
import DisplayPlans from "../../../components/DisplayPlans";

export const metadata = {
    title: "Explore Plans | FitHeroes",
};

export default async function ExplorePlans() {
    const user = await currentUser();

    const fetchPlans = async (): Promise<TrainingPlan[]> => {
        const plans = await prisma.trainingPlan.findMany({
            include: { reviews: true },
        });
        return plans;
    };

    const plans = await fetchPlans();

    return (
        <main className="w-full h-[calc(100vh-90px)] mb-12 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Explore Plans</h1>
                <Link
                    className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-3"
                    href={`/plans/${user?.id}`}
                >
                    My Plans
                </Link>
            </header>

            <DisplayPlans currentPlans={plans} />
        </main>
    );
}
