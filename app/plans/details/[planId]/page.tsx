import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "../../../../lib/client";
import BackNavigationButton from "../../../../components/BackNavigationButton";
import ReviewCard from "../../../../components/ReviewCard";
import RatingComponent from "../../../../components/RatingComponent";
import PlanReviewForm from "../../../../components/PlanReviewForm";

export const revalidate = 60;

interface Props {
    params: { planId: number };
}

export default async function PlanDetails({ params }: Props) {
    const user = await currentUser();

    const fetchTrainingPlan = async (): Promise<any> => {
        const plan = await prisma.trainingPlan.findFirst({
            where: { id: Number(params.planId) },
            include: { exercises: true, reviews: true },
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
        <main className="w-full min-h-[calc(100vh-90px)] bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">{plan.name}</h1>
                <section className="flex gap-4">
                    <BackNavigationButton />
                </section>
            </header>

            {/* Plan Author */}
            <section className="flex justify-between">
                <p>
                    Created by{" "}
                    <span className="text-amber-300">
                        {`${planAuthor.firstName} ${planAuthor.lastName}`}
                    </span>
                </p>
                {/* Average Rating */}
                <RatingComponent reviews={plan.reviews} />
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

            {/* Reviews */}
            <section className="flex flex-col gap-2">
                <header className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Reviews</h3>
                </header>

                <section className="flex-col gap-4">
                    {plan.reviews.length === 0 ? (
                        <p className="text-sm">
                            Be the first to leave a review!
                        </p>
                    ) : (
                        plan.reviews.map((review: any, idx: number) => (
                            <ReviewCard review={review} key={idx}/>
                        ))
                    )}
                </section>

                <PlanReviewForm planId={plan.id} />
            </section>
        </main>
    );
}
