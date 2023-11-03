"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

import RatingComponent from "@/components/plans/reviews/RatingComponent";

interface Props {
  plan: TrainingPlan;
}

export default function TrainingPlanCard({ plan }: Props) {
  const [author, setAuthor] = useState("Loading...");

  useEffect(() => {
    async function getUserNameById() {
      const userName = await axios.get(`/api/users/full_name/${plan.userId}`);
      setAuthor(userName.data.user);
    }

    getUserNameById();
  }, [plan.userId]);

  return (
    <Link href={`/plans/details/${plan.id}`}>
      <article className="flex flex-col gap-4 bg-blue-900/70 w-full py-4 px-4 rounded-md hover:bg-blue-900 cursor-pointer">
        <header className="flex justify-between">
          <h3 className="text-[14px] sm:text-lg font-semibold">
            {plan.name} by <span className="text-amber-300">{author}</span>
          </h3>

          <section>
            <RatingComponent reviews={plan.reviews} />
          </section>
        </header>

        <p className="hidden sm:flex sm:text-xs text-gray-300 font-thin">
          {plan.description.length < 100
            ? plan.description
            : `${plan.description.substring(0, 100)}...`}
        </p>
      </article>
    </Link>
  );
}
