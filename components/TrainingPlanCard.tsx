"use client";
import Link from "next/link";
import RatingComponent from "./RatingComponent";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    plan: TrainingPlan;
}

export default function TrainingPlanCard({ plan }: Props) {
    const [author, setAuthor] = useState("Loading...");

    useEffect(() => {
        async function getUserNameById() {
            const userName = await axios.get(
                `/api/users/full_name/${plan.userId}`
            );
            setAuthor(userName.data.user);
        }

        getUserNameById();
    }, [plan.userId]);

    return (
        <Link href={`/plans/details/${plan.id}`}>
            <article className="flex flex-col gap-4 bg-blue-900/70 w-full py-4 px-4 rounded-md hover:bg-blue-900 cursor-pointer">
                <header className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">
                        {plan.name} by{" "}
                        <span className="text-amber-300">{author}</span>
                    </h3>

                    <section>
                        <RatingComponent reviews={plan.reviews} />
                    </section>
                </header>

                <section>
                    <h3>Description:</h3>
                    <p className="text-sm">
                        {plan.description.substring(0, 30)}...
                    </p>
                </section>
            </article>
        </Link>
    );
}
