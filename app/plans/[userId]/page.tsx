import { GlobeIcon, HammerIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/client";
import TrainingPlanCard from "@/components/plans/TrainingPlanCard";

export const metadata = {
    title: "Plans | FitHeroes",
};

interface Props {
    params: { userId: string };
}

export default async function Plans({ params }: Props) {
    const user = await clerkClient.users.getUser(params.userId);

    if (!user) {
        notFound();
    }

    async function getUserPlans(): Promise<any> {
        const userPlans = await prisma.trainingPlan.findMany({
            where: { userId: params.userId },
            include: { reviews: true },
        });
        return userPlans;
    }

    async function getSavedPlans(): Promise<any> {
        const savedPlans = await prisma.trainingPlan.findMany({
            where: {
                NOT: { userId: user.id },
                savedByUsers: {
                    some: {
                        userId: user.id,
                    },
                },
            },
            include: { reviews: true },
        });
        return savedPlans;
    }

    const userPlans = await getUserPlans();
    const savedPlans = await getSavedPlans();

    return (
        <main className="w-full min-h-[calc(100vh-64px)] h-full overflow-y-auto py-6 rounded-md flex flex-col gap-4 px-1 md:px-[4%] mb-20 md:mb-0">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md flex flex-col md:flex-row md:justify-between">
                <div className="flex flex-col">
                    <h1>{`${user.firstName} ${user.lastName}'s Plans`}</h1>
                    <p className="text-secondary tracking-tighter">
                        View created and/or saved plans
                    </p>
                </div>
                <section className="flex gap-2 mt-2">
                    <Link
                        className="btn btn--primary flex gap-2 w-full"
                        href="/plans/build"
                    >
                        <HammerIcon size={20} />
                        <span className="font-semibold">Build</span>
                    </Link>
                    <Link
                        className="btn btn--secondary flex gap-2 w-full"
                        href="/plans/explore"
                    >
                        <GlobeIcon size={20} />
                        <span className="font-semibold">Explore</span>
                    </Link>
                </section>
            </header>

            <div className="flex flex-col gap-4 md:flex-row">
                {/* User Plans */}
                <section className="flex flex-col gap-2 w-full">
                    <h3 className="bg-white border border-primary p-4 rounded-sm shadow-md flex text-xl font-bold tracking-tighter pb-4">
                        Created Plans
                    </h3>
                    {userPlans.map((plan: any) => (
                        <TrainingPlanCard plan={plan} key={plan.id} />
                    ))}
                    {userPlans.length === 0 && (
                        <p className="text-sm">
                            Nothing to see here. Create your first plan to see
                            it here.
                        </p>
                    )}
                </section>

                {/* Saved Plans */}
                <section className="flex flex-col gap-2 w-full">
                    <h3 className="bg-white border border-primary p-4 rounded-sm shadow-md flex text-xl font-bold tracking-tighter pb-4">
                        Saved Plans
                    </h3>
                    {savedPlans.map((plan: any) => (
                        <TrainingPlanCard plan={plan} key={plan.id} />
                    ))}
                    {savedPlans.length === 0 && (
                        <p className="text-sm">
                            Nothing to see here. Save a plan to see
                            it here.
                        </p>
                    )}
                </section>
            </div>
        </main>
    );
}
