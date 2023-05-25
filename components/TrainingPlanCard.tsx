import React from "react";
import { getUserNameFromUserId } from "../helpers/getUserNameFromUserId";

interface Props {
    plan: TrainingPlan;
}

export default async function TrainingPlanCard({ plan }: Props) {
    const authorFullName = await getUserNameFromUserId(plan.userId);

    return (
        <article>
            <header>
                <h3>{plan.name}</h3> by <span>{authorFullName}</span>
            </header>
        </article>
    );
}
