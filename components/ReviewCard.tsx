"use client";
import RatingComponent from "./RatingComponent";
import { getTimeAgo } from "../helpers/getTimeAgo";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
    review: any;
}

export default function ReviewCard({ review }: Props) {
    const user = useUser();
    const [reviewer, setReviewer] = useState("Loading...");
    const router = useRouter();

    useEffect(() => {
        async function getUserNameById() {
            const userName = await axios.get(
                `/api/users/full_name/${review.userId}`
            );
            setReviewer(userName.data.user);
        }

        getUserNameById();
    }, []);

    const deleteReview = async () => {
        try {
            const res = await axios.delete(`/api/plans/reviews/${review.id}`);
            if (res.status === 200) {
                toast.success("Successfully deleted review");
            }
        } catch (error) {
            console.error("Ran into an error");
            toast.error("Something went wrong!");
        } finally {
            router.refresh();
        }
    };

    return (
        <article className="flex flex-col gap-2 border-b-2 border-b-white py-2">
            <header className="flex justify-between">
                <section className="flex gap-2 items-center">
                    <h4 className="text-amber-300">{reviewer}</h4>
                    {user.user?.id === review.userId && (
                        <section className="flex gap-1">
                            <button
                                type="button"
                                className="hover:bg-blue-800 cursor-pointer p-1 rounded-md"
                            >
                                <Edit color="#71eb81" />
                            </button>
                            <button
                                type="button"
                                onClick={deleteReview}
                                className="hover:bg-blue-800 cursor-pointer p-1 rounded-md"
                            >
                                <Delete color="#ed426d" />
                            </button>
                        </section>
                    )}
                </section>

                <RatingComponent reviews={[review]} />
            </header>

            {!review.comment ? "" : <p className="text-sm">{review.comment}</p>}

            <span className="hidden sm:flex text-xs">
                {getTimeAgo(review.createdAt)}
            </span>
        </article>
    );
}
