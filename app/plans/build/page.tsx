import Link from "next/link";

import { currentUser } from "@clerk/nextjs/app-beta";
import BuildPlanForm from "@/components/plans/BuildPlanForm";

export const metadata = {
  title: "Build Plan | FitHeroes",
};

export default async function BuildPlan() {
  const user = await currentUser();

  return (
    <main className="w-full min-h-[calc(100vh)] pb-20 overflow-y-auto py-6 rounded-md flex flex-col gap-4 shadow-md px-4 lg:px-[4%]">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-primary items-center">
        <section>
          <h1 className="text-xl sm:text-3xl">Build Plan</h1>
          <h2 className="text-secondary">Customize your experience</h2>
        </section>
        <Link
          className="btn btn--primary"
          href={`/plans/${user?.id}`}
        >
          My Plans
        </Link>
      </header>

      <BuildPlanForm />
    </main>
  );
}
