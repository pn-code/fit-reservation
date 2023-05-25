"use client";

import { Star } from "lucide-react";
import { useState } from "react";

export default function PlanReviewForm() {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    return (
        <div>
            <form className="flex flex-col">
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

                <section>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full text-black rounded-sm outline-blue-900/70 p-1 text-sm"
                    />
                </section>

                <section className="flex justify-end">
                    <button className="bg-blue-800 px-2 py-1 rounded-md hover:bg-blue-900">
                        Submit
                    </button>
                </section>
            </form>
        </div>
    );
}
