import { clerkClient } from "@clerk/nextjs/server";
import { GlobeIcon, HammerIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "../../../lib/client";
import TrainingPlanCard from "../../../components/TrainingPlanCard";

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

    const userPlans = await getUserPlans();

    return (
        <main className="w-full h-[calc(100vh-90px)] bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">{`${user.firstName} ${user.lastName}'s Plans`}</h1>
                <section className="flex gap-4">
                    <Link
                        className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg text-white p-2"
                        href="/plans/build"
                    >
                        <HammerIcon size={24} />
                        <span className="hidden sm:flex">Build</span>
                    </Link>
                    <Link
                        className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white p-2"
                        href="/plans/explore"
                    >
                        <GlobeIcon size={24} />
                        <span className="hidden sm:flex">Explore</span>
                    </Link>
                </section>
            </header>

            {/* User Plans Here */}
            <section>
                {userPlans.map((plan: any) => (
                    <TrainingPlanCard plan={plan} />
                ))}
            </section>
        </main>
    );
}
