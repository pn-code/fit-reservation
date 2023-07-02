"use client";
import RatingComponent from "./RatingComponent";
import { getTimeAgo } from "../helpers/getTimeAgo";
import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit, Star } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Props {
    review: any;
}

export default function ReviewCard({ review }: Props) {
    const [reviewer, setReviewer] = useState("Loading...");
    const [comment, setComment] = useState(review.comment);
    const [rating, setRating] = useState(review.rating);
    const [isEditing, setIsEditing] = useState(false);

    const user = useUser();
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
                                onClick={() => setIsEditing((bool) => !bool)}
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

                {!isEditing ? (
                    <RatingComponent reviews={[review]} />
                ) : (
                    <section className="flex hover:cursor-pointer">
                        <Star
                            size={16}
                            stroke="#f5c71a"
                            fill={"#ffdf00"}
                            onClick={() => setRating(1)}
                        />
                        <Star
                            size={16}
                            stroke="#f5c71a"
                            fill={rating >= 2 ? "#ffdf00" : "transparent"}
                            onClick={() => setRating(2)}
                        />
                        <Star
                            size={16}
                            stroke="#f5c71a"
                            fill={rating >= 3 ? "#ffdf00" : "transparent"}
                            onClick={() => setRating(3)}
                        />
                        <Star
                            size={16}
                            stroke="#f5c71a"
                            fill={rating >= 4 ? "#ffdf00" : "transparent"}
                            onClick={() => setRating(4)}
                        />
                        <Star
                            size={16}
                            stroke="#f5c71a"
                            fill={rating == 5 ? "#ffdf00" : "transparent"}
                            onClick={() => setRating(5)}
                        />
                    </section>
                )}
            </header>

            {/* Comment */}

            {/* Show Comment as paragraph when not editing */}
            {!isEditing ? (
                <p className="text-sm">{review.comment}</p>
            ) : (
                <form className="flex flex-col gap-2">
                    <section className="flex flex-col gap-1">
                        <label htmlFor="comment">Edited Comment:</label>
                        <input
                            id="comment"
                            className="text-sm bg-gray-900 text-white"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder={review.comment}
                        />
                    </section>

                    <button className="bg-green-600 text-white py-1 rounded-md sm:w-52">
                        Update Review
                    </button>
                </form>
            )}

            {/* Show comment as an input when editing */}

            <span className="hidden sm:flex text-xs">
                {getTimeAgo(review.createdAt)}
            </span>
        </article>
    );
}
