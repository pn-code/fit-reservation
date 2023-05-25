"use client";

import axios from "axios";
import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface Props {
    planId: Number;
}

export default function PlanReviewForm({ planId }: Props) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmitReview = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/plans/reviews", {
                comment,
                rating,
                planId,
            });

            if (res.status === 200) {
                toast.success("Successfully posted review!");
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="flex flex-col gap-4">
                <header className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">Add a Review</h3>
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
                </header>

                <section className="flex flex-col gap-2">
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        disabled={loading}
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full text-black rounded-sm outline-blue-900/70 p-1 text-sm"
                    />
                </section>

                <section className="flex justify-end">
                    <button
                        disabled={loading}
                        onClick={handleSubmitReview}
                        type="button"
                        className="bg-blue-800 px-16 py-1 rounded-md hover:bg-blue-900 flex text-center disabled:bg-gray-500"
                    >
                        Submit
                    </button>
                </section>
            </form>
        </div>
    );
}
