import Link from "next/link";
import RatingComponent from "./RatingComponent";

interface Props {
    plan: TrainingPlan;
}

export default function TrainingPlanCard({ plan }: Props) {
    return (
        <Link href={`/plans/details/${plan.id}`}>
            <article className="flex flex-col gap-4 bg-blue-900/70 w-full py-4 px-1 rounded-md hover:bg-blue-900 cursor-pointer">
                <header className="flex justify-between items-center">
                    <h3 className="inline">{plan.name}</h3>

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
