import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "../../../../lib/client";

interface Props {
    params: { planId: number };
}

export default async function PlanDetails({ params }: Props) {
    const user = await currentUser();

    const fetchTrainingPlan = async (): Promise<any> => {
        const plan = await prisma.trainingPlan.findFirst({
            where: { id: Number(params.planId) },
            include: { exercises: true },
        });
        return plan;
    };

    const plan = await fetchTrainingPlan();

    if (!user) {
        notFound();
    }

    // Get author name
    const planAuthor = await clerkClient.users.getUser(plan.userId);

    return (
        <main className="w-full h-[calc(100vh-90px)] bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">{plan.name}</h1>
                <section className="flex gap-4">
                    <Link
                        className="flex justify-center items-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg text-white p-2"
                        href={`/plans/${user.id}`}
                    >
                        My Plans
                    </Link>
                    <Link
                        className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white p-2"
                        href="/plans/explore"
                    >
                        Explore
                    </Link>
                </section>
            </header>

            {/* Plan Author */}
            <section>
                <p>
                    Created by{" "}
                    <span className="text-amber-300">
                        {`${planAuthor.firstName} ${planAuthor.lastName}`}
                    </span>
                </p>
            </section>

            {/* Description */}
            <section>
                <h3 className="text-lg font-semibold">Description:</h3>
                <p className="text-sm">{plan.description}</p>
            </section>

            <table className="table-auto w-full">
                <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                    <tr className="p-2 whitespace-nowrap">
                        <th>
                            <div className="font-semibold text-left">
                                Exercise
                            </div>
                        </th>
                        <th>
                            <div className="font-semibold text-left">Type</div>
                        </th>
                        <th>
                            <div className="font-semibold text-left">Reps</div>
                        </th>
                        <th>
                            <div className="font-semibold text-left">
                                Duration
                            </div>
                        </th>
                    </tr>
                </thead>

                <tbody className="text-sm divide-y divide-gray-100 w-full">
                    {plan.exercises.map((exercise: any, idx: number) => (
                        <tr
                            key={idx}
                            className="w-full text-xs sm:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white"
                        >
                            <td className="py-2 whitespace-nowrap">
                                {exercise.name}
                            </td>
                            <td className="py-2 whitespace-nowrap">
                                {exercise.type}
                            </td>
                            <td className="py-2 whitespace-nowrap">{`${exercise.sets} x ${exercise.reps}`}</td>
                            <td className="py-2 whitespace-nowrap">
                                {exercise.duration}m
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
