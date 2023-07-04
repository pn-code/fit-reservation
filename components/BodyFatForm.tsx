import React, { useState } from "react";
import { bodyFatSchema } from "../validations/bodyFatValidator";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
    setBodyFats: any;
}

export default function BodyFatForm({ setBodyFats }: Props) {
    const today = new Date().toISOString().split("T")[0];

    const [bodyFat, setBodyFat] = useState<number>(15);
    const [date, setDate] = useState(today);

    const submitCurrentBodyFat = async () => {
        try {
            const validateBodyFat = bodyFatSchema.parse(bodyFat);

            if (validateBodyFat) {
                const formattedDate = new Date(date).toISOString();

                const res = await axios.post("/api/bf_measurements", {
                    bodyfat: bodyFat,
                    createdAt: formattedDate,
                });

                if (res.status === 200) {
                    toast.success(
                        `Current body fat has been updated to ${bodyFat} %.`
                    );
                    setBodyFats((prev: unknown[]) =>
                        [...prev, res.data].sort(
                            (a, b) =>
                                new Date(a.createdAt).getTime() -
                                new Date(b.createdAt).getTime()
                        )
                    );
                } else {
                    throw Error;
                }
            }
        } catch (error) {
            console.error(error);
            toast.error("We ran into an error...");
        }
    };

    return (
        <form className="w-full text-sm flex gap-4 flex-col justify-center items-center bg-gray-800 px-4 py-2 rounded-md">
            <section className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between">
                <section className="w-full flex flex-col sm:flex-row gap-2 items-center">
                    <label className="font-bold" htmlFor="weight">
                        Date:{" "}
                    </label>
                    <input
                        className="w-full sm:w-32"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        type="date"
                        id="date"
                        max={today}
                    />
                </section>
                <section className="w-full flex flex-col sm:flex-row gap-2 items-center sm:justify-end">
                    <label className="font-bold" htmlFor="bf">
                        Body Fat (%):
                    </label>
                    <input
                        className="w-full sm:w-16"
                        onChange={(e) => setBodyFat(Number(e.target.value))}
                        value={bodyFat}
                        type="number"
                        id="bf"
                        placeholder="Body Fat Percentage"
                    />
                </section>
            </section>

            <button
                onClick={submitCurrentBodyFat}
                type="button"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 sm:py-2 hover:underline"
            >
                Submit
            </button>
        </form>
    );
}
