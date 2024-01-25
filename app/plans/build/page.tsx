import Link from "next/link";

import { currentUser } from "@clerk/nextjs";
import BuildPlanForm from "@/components/plans/BuildPlanForm";

export const metadata = {
  title: "Build Plan | FitHeroes",
};

export default async function BuildPlan() {
  const user = await currentUser();

  return (
    <main className="w-full min-h-[calc(100vh-64px)] pb-20 overflow-y-auto py-6 rounded-md flex flex-col gap-4 shadow-md px-4 lg:px-[4%]">
      <header className="bg-white border border-primary p-4 rounded-sm shadow-md flex justify-between">
        <section>
          <h1 className="text-xl sm:text-3xl">Build Plan</h1>
          <p className="text-secondary tracking-tighter">Customize your experience</p>
        </section>

        <Link
          className="btn btn--primary font-bold"
          href={`/plans/${user?.id}`}
        >
          My Plans
        </Link>
      </header>

      <BuildPlanForm />
    </main>
  );
}
