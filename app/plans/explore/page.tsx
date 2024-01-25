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
    <main className="w-full h-[calc(100vh-64px)] mb-12 md:mb-0 overflow-y-auto py-6 flex flex-col gap-4 px-4 lg:px-[4%]">
      <header className="flex justify-between font-bold bg-white border border-primary p-4 rounded-sm shadow-md items-center">
        <h1 className="text-xl sm:text-3xl">Explore Plans</h1>
        <Link
          className="btn btn--primary"
          href={`/plans/${user?.id}`}
        >
          My Plans
        </Link>
      </header>

      <DisplayPlans currentPlans={plans} />
    </main>
  );
}
