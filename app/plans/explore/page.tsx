import Link from "next/link";

import { currentUser } from "@clerk/nextjs/app-beta";
import { prisma } from "@/lib/client";
import DisplayPlans from "@/components/plans/DisplayPlans";
import SearchBar from "@/components/plans/SearchBar";

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
    <main className="w-full h-[calc(100vh-90px)] mb-12 overflow-y-auto py-6 rounded-md flex flex-col gap-4 shadow-md px-4 lg:px-[4%]">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-primary items-center">
        <h1 className="text-xl sm:text-3xl">Explore Plans</h1>
        <Link
          className="bg-primary hover:bg-indigo-700 rounded-lg text-white sm:px-4 sm:py-3 px-2 py-1"
          href={`/plans/${user?.id}`}
        >
          My Plans
        </Link>
      </header>

      <DisplayPlans currentPlans={plans} />
    </main>
  );
}
