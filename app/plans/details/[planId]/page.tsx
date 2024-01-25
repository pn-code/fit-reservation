import React from "react";
import { notFound } from "next/navigation";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { prisma } from "@/lib/client";
import BackNavigationButton from "@/components/navigation/BackNavigationButton";
import ReviewCard from "@/components/plans/reviews/ReviewCard";
import RatingComponent from "@/components/plans/reviews/RatingComponent";
import PlanReviewForm from "@/components/plans/reviews/PlanReviewForm";
import PlanActions from "@/components/plans/PlanActions";
import SavePlanButton from "@/components/plans/SavePlanButton";

export const revalidate = 60;

interface Props {
    params: { planId: number };
}

export default async function PlanDetails({ params }: Props) {
    const user = await currentUser();

    const fetchTrainingPlan = async (): Promise<any> => {
        const plan = await prisma.trainingPlan.findFirst({
            where: { id: Number(params.planId) },
            include: {
                exercises: true,
                reviews: {
                    orderBy: { modifiedAt: "desc" },
                },
                savedByUsers: true,
            },
        });
        return plan;
    };

    const plan = await fetchTrainingPlan();

    if (!user) {
        notFound();
    }

    // Get author name
    const planAuthor = await clerkClient.users.getUser(plan.userId);

    // Look to see if user has submitted a review already.
    const userAlreadySubmittedReview = () => {
        return plan.reviews.some((review: any) => review.userId === user.id);
    };

    return (
        <main className="w-full min-h-[calc(100vh-64px)] overflow-y-auto mb-12 md:mb-0 py-6 rounded-md flex flex-col gap-4 px-4 md:px-[4%]">
            <header className="bg-white border p-4 rounded-sm shadow-md flex flex-col md:flex-row justify-between font-bold pb-2 border-primary md:items-center">
                <section className="flex gap-2 items-center mb-4">
                    <h1>{plan.name}</h1>
                    <span className="text-sm flex font-normal">
                        Saved by{" "}
                        {plan.savedByUsers.length === 1
                            ? "1 user"
                            : `${plan.savedByUsers.length} users`}
                    </span>
                </section>

                <section className="w-full md:w-fit flex gap-4">
                    <SavePlanButton
                        planId={plan.id}
                        isSaved={plan.savedByUsers.some(
                            (savedUser: any) => savedUser.userId === user.id
                        )}
                    />
                    <BackNavigationButton />
                </section>
            </header>

            <div className="flex flex-col gap-4 bg-white border border-primary p-4 rounded-sm shadow-md">
                {/* Plan Author */}
                <section className="flex justify-between">
                    <p className="text-lg font-semibold">
                        <strong>
                            Created by:{" "}
                            <span className="text-accent">
                                {`${planAuthor.firstName} ${planAuthor.lastName}`}
                            </span>
                        </strong>
                    </p>
                    {/* Average Rating */}
                    <RatingComponent reviews={plan.reviews} />
                </section>

                {/* Description */}
                <section>
                    <h3 className="text-lg font-semibold">Description:</h3>
                    <p>{plan.description}</p>
                </section>

                {/* Actions */}
                {user.id === plan.userId && (
                    <PlanActions plan={plan} userId={user.id} />
                )}
            </div>

            <div className="flex flex-col lg:flex-row gap-4 md:gap-12 lg:gap-[4%]">
                <table className="table-auto w-full">
                    <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase bg-primary border border-primary text-white">
                        <tr className="p-2 whitespace-nowrap border border-primary">
                            <th>
                                <div className="font-semibold text-left p-2">
                                    Exercise
                                </div>
                            </th>
                            <th>
                                <div className="font-semibold text-left p-2">
                                    Type
                                </div>
                            </th>
                            <th>
                                <div className="font-semibold text-left p-2">
                                    Reps
                                </div>
                            </th>
                            <th>
                                <div className="font-semibold text-left p-2">
                                    Duration
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-secondary w-full bg-white border border-primary">
                        {plan.exercises.map((exercise: any, idx: number) => (
                            <tr
                                key={idx}
                                className="w-full text-xs sm:text-[14px] bg-white hover:bg-slate-100 cursor-pointer duration-200"
                            >
                                <td className="p-2 whitespace-nowrap">
                                    {exercise.name}
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                    {exercise.type}
                                </td>
                                <td className="p-2 whitespace-nowrap">{`${exercise.sets} x ${exercise.reps}`}</td>
                                <td className="p-2 whitespace-nowrap">
                                    {exercise.duration}m
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Reviews */}
                <section className="flex flex-col gap-2 w-full">
                    <header className="flex justify-between items-center bg-white border border-primary p-4 rounded-sm shadow-md">
                        <h3 className="text-lg font-semibold">Reviews</h3>
                    </header>

                    <section className="flex flex-col gap-2 ">
                        {plan.reviews.length === 0 ? (
                            <p className="text-sm">
                                Be the first to leave a review!
                            </p>
                        ) : (
                            plan.reviews.map((review: any, idx: number) => (
                                <ReviewCard review={review} key={idx} />
                            ))
                        )}
                    </section>

                    {/* Hide Review Form if user has already submitted a review */}
                    {!userAlreadySubmittedReview() && (
                        <PlanReviewForm planId={plan.id} />
                    )}
                </section>
            </div>
        </main>
    );
}
