import React from "react";
import { notFound } from "next/navigation";

import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
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
    <main className="w-full min-h-[calc(100vh-90px)] overflow-y-auto mb-12 bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
      <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
        <section className="flex gap-2 items-center">
          <h1 className="text-xl sm:text-3xl font-bold">{plan.name}</h1>
          <span className="hidden text-sm sm:flex font-normal">
            Saved by{" "}
            {plan.savedByUsers.length === 1
              ? "1 user"
              : `${plan.savedByUsers.length} users`}
          </span>
        </section>

        <section className="flex gap-4">
          <SavePlanButton
            planId={plan.id}
            isSaved={plan.savedByUsers.some(
              (savedUser: any) => savedUser.userId === user.id
            )}
          />
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

      {/* Actions */}
      {user.id === plan.userId && <PlanActions plan={plan} userId={user.id} />}

      <table className="table-auto w-full lg:w-[56%]">
        <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
          <tr className="p-2 whitespace-nowrap">
            <th>
              <div className="font-semibold text-left">Exercise</div>
            </th>
            <th>
              <div className="font-semibold text-left">Type</div>
            </th>
            <th>
              <div className="font-semibold text-left">Reps</div>
            </th>
            <th>
              <div className="font-semibold text-left">Duration</div>
            </th>
          </tr>
        </thead>

        <tbody className="text-sm divide-y divide-gray-100 w-full bg-gray-800">
          {plan.exercises.map((exercise: any, idx: number) => (
            <tr
              key={idx}
              className="w-full text-xs sm:text-[14px] bg-blue-900/20 hover:bg-indigo-600 cursor-pointer hover:text-white"
            >
              <td className="py-2 whitespace-nowrap">{exercise.name}</td>
              <td className="py-2 whitespace-nowrap">{exercise.type}</td>
              <td className="py-2 whitespace-nowrap">{`${exercise.sets} x ${exercise.reps}`}</td>
              <td className="py-2 whitespace-nowrap">{exercise.duration}m</td>
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
            <p className="text-sm">Be the first to leave a review!</p>
          ) : (
            plan.reviews.map((review: any, idx: number) => (
              <ReviewCard review={review} key={idx} />
            ))
          )}
        </section>

        {/* Hide Review Form if user has already submitted a review */}
        {!userAlreadySubmittedReview() && <PlanReviewForm planId={plan.id} />}
      </section>
    </main>
  );
}
