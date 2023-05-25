"use client"
import RatingComponent from "./RatingComponent";
import { getTimeAgo } from "../helpers/getTimeAgo";
import { clerkClient } from "@clerk/nextjs/app-beta";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
    review: any;
}

export default function ReviewCard({ review }: Props) {
    const [reviewer, setReviewer] = useState("Loading...")

    useEffect(() => {
        async function getUserNameById() {
            const userName = await axios.get(`/api/users/full_name/${review.userId}`)
            setReviewer(userName.data.user)
        }

        getUserNameById()
    }, [])

    return (
        <article className="flex flex-col gap-2 border-b-2 border-b-white pb-4">
            <header className="flex justify-between">
                <section className="flex gap-2 items-center">
                    <h4 className="text-amber-300">{reviewer}</h4>
                    <span className="hidden sm:flex text-xs">
                        {getTimeAgo(review.createdAt)}
                    </span>
                </section>

                <RatingComponent reviews={[review]} />
            </header>

            {!review.comment ? "" : <p className="text-sm">{review.comment}</p>}
        </article>
    );
}
