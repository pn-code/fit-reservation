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
      <article className="flex flex-col gap-2 border border-primary bg-white w-full py-4 px-4 rounded-sm hover:bg-slate-100 cursor-pointer duration-200">
        <header className="flex justify-between">
          <h3 className="text-[14px] sm:text-lg font-semibold">
            {plan.name} by <span className="text-accent">{author}</span>
          </h3>

          <section>
            <RatingComponent reviews={plan.reviews} />
          </section>
        </header>

        <p className="hidden sm:flex text-sm text-secondary">
          {plan.description.length < 100
            ? plan.description
            : `${plan.description.substring(0, 100)}...`}
        </p>
      </article>
    </Link>
  );
}
