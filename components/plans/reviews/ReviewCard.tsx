"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Delete, Edit, Star } from "lucide-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import RatingComponent from "@/components/plans/reviews/RatingComponent";
import { getTimeAgo } from "@/helpers/getTimeAgo";
import { useUser } from "@clerk/nextjs";

interface Props {
    review: any;
}

export default function ReviewCard({ review }: Props) {
    const [reviewer, setReviewer] = useState("Loading...");
    const [comment, setComment] = useState(review.comment);
    const [rating, setRating] = useState(review.rating);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

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
    }, [review.userId]);

    const deleteReview = async () => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/plans/reviews/${review.id}`);
            if (res.status === 200) {
                toast.success("Successfully deleted review");
            }
        } catch (error) {
            console.error("Ran into an error");
            toast.error("Something went wrong!");
        } finally {
            router.refresh();
            setLoading(false);
        }
    };

    const updateReview = async () => {
        try {
            setLoading(true);
            // Check to see if the inputs are the same as the current review
            const sameComment = review.comment.trim() === comment.trim();
            const sameRating = review.rating === rating;

            if (sameComment && sameRating) {
                throw new Error(
                    "Cannot update review without providing new information."
                );
            }

            // API call to get information
            const res = await axios.put(`/api/plans/reviews/${review.id}`, {
                comment,
                rating,
            });

            console.log(res);
            if (res.status === 200) {
                toast.success("Successfully updated review");
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("An error occurred");
            }
        } finally {
            router.refresh();
            setLoading(false);
            setIsEditing(false);
        }
    };

    return (
        <article className="flex flex-col gap-2 py-2 border-b border-secondary w-full">
            <header className="flex justify-between">
                <section className="flex gap-2 items-center">
                    <h4 className="text-primary font-bold">{reviewer}</h4>
                    {user.user?.id === review.userId && (
                        <section className="flex gap-1">
                            <button
                                type="button"
                                onClick={() => setIsEditing((bool) => !bool)}
                                disabled={loading}
                                className="hover:bg-slate-100 cursor-pointer py-1 px-2 rounded-sm disabled:bg-gray-400 flex gap-2 items-center border border-primary"
                            >
                                <Edit color="#71eb81" size={20} />
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={deleteReview}
                                disabled={loading}
                                className="hover:bg-slate-100 cursor-pointer py-1 px-2 rounded-sm disabled:bg-gray-400 flex gap-2 items-center border border-primary"
                            >
                                <Delete color="#ed426d" />
                                Delete
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
                        <textarea
                            id="comment"
                            className="text-sm bg-gray-900 text-white p-2 sm:w-[600px]"
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            placeholder={review.comment}
                        />
                    </section>

                    <button
                        type="button"
                        onClick={updateReview}
                        className="bg-green-600 text-white py-1 rounded-md sm:w-52"
                    >
                        Update Review
                    </button>
                </form>
            )}

            {/* Show comment as an input when editing */}
            {review.createdAt.getTime() !== review.modifiedAt.getTime() ? (
                <span className="hidden sm:flex text-xs">
                    Last modified {getTimeAgo(review.modifiedAt)}
                </span>
            ) : (
                <span className="hidden sm:flex text-xs">
                    Posted {getTimeAgo(review.createdAt)}
                </span>
            )}
        </article>
    );
}
