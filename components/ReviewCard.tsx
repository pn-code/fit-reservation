import React from "react";
import RatingComponent from "./RatingComponent";
import { getTimeAgo } from "../helpers/getTimeAgo";

interface Props {
    review: any;
}

export default function ReviewCard({ review }: Props) {
    return (
        <article className="flex flex-col gap-2">
            <header className="flex justify-between">
                <h4 className="text-amber-300">Username</h4>
                <RatingComponent reviews={[review]} />
            </header>

            <p className="text-sm">Comment</p>
            <span>{getTimeAgo(review.createdAt)}</span>
        </article>
    );
}
