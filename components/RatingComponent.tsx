import { Star } from "lucide-react";
import React from "react";

interface Props {
    reviews: any;
}

export default function RatingComponent({ reviews }: Props) {
    const averageRating = reviews
        .map((review: any) => review.rating)
        .reduce((acc: number, curr: number) => acc + curr, 0);

    const ratingInStars = () => {
        if (!averageRating) return <p className="text-xs">Not Yet Rated</p>;
        if (averageRating <= 5 && averageRating >= 4.5)
            return (
                <section className="flex flex-col gap-2">
                    <span className="flex gap-1">
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                    </span>
                    <h4 className="text-xs text-right">
                        Rated {averageRating}/5
                    </h4>
                </section>
            );
        if (averageRating < 4.5 && averageRating >= 3.5)
            return (
                <section className="flex flex-col gap-2">
                    <span className="flex gap-1">
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                    </span>
                    <h4 className="text-xs text-right">
                        Rated {averageRating}/5
                    </h4>
                </section>
            );
        if (averageRating < 3.5 && averageRating >= 2.5)
            return (
                <section className="flex flex-col gap-2">
                    <span className="flex gap-1">
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                    </span>
                    <h4 className="text-xs text-right">
                        Rated {averageRating}/5
                    </h4>
                </section>
            );
        if (averageRating < 2.5 && averageRating >= 1.5)
            return (
                <section className="flex flex-col gap-2">
                    <span className="flex gap-1">
                        <Star fill="yellow" size={16} />
                        <Star fill="yellow" size={16} />
                    </span>
                    <h4 className="text-xs text-right">
                        Rated {averageRating}/5
                    </h4>
                </section>
            );
        if (averageRating < 1.5)
            return (
                <section className="flex flex-col gap-2">
                    <span className="flex gap-1">
                        <Star fill="yellow" size={16} />
                    </span>
                    <h4 className="text-xs text-right">
                        Rated {averageRating}/5
                    </h4>
                </section>
            );
    };

    return <div>{ratingInStars()}</div>;
}
