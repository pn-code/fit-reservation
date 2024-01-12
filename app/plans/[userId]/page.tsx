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
        <main className="w-full min-h-[calc(100vh-90px)] overflow-y-auto mb-12 py-6 rounded-md flex flex-col gap-4 shadow-md px-4 md:px-[4%]">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-primary items-center">
                <h1 className="text-xl sm:text-3xl font-bold">{`${user.firstName} ${user.lastName}'s Plans`}</h1>
                <section className="flex gap-4">
                    <Link
                        className="btn btn--primary flex gap-2"
                        href="/plans/build"
                    >
                        <HammerIcon size={20} />
                        <span className="font-semibold">Build</span>
                    </Link>
                    <Link
                        className="btn btn--secondary flex gap-2"
                        href="/plans/explore"
                    >
                        <GlobeIcon size={20} />
                        <span className="font-semibold">Explore</span>
                    </Link>
                </section>
            </header>

            {/* User Plans */}
            <section className="flex flex-col gap-2">
                {userPlans.map((plan: any) => (
                    <TrainingPlanCard plan={plan} key={plan.id} />
                ))}
                {userPlans.length === 0 && (
                    <p className="text-sm">
                        Nothing to see here. Create your first plan to see it
                        here.
                    </p>
                )}
            </section>

            {/* Saved Plans */}
            <section className="flex flex-col gap-2">
                <h1 className="text-xl sm:text-3xl font-bold pb-2 border-b-2 border-b-primary">
                    Saved Plans
                </h1>
                {savedPlans.map((plan: any) => (
                    <TrainingPlanCard plan={plan} key={plan.id} />
                ))}
                {savedPlans.length === 0 && (
                    <p className="text-sm">
                        Nothing to see here. Create your first plan to see it
                        here.
                    </p>
                )}
            </section>
        </main>
    );
}
