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
                    setBodyFats((prev: unknown[]) => [...prev, res.data]);
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
        <form className="text-sm flex gap-4 flex-col justify-center items-center bg-gray-800 px-4 py-2 rounded-md">
            <section className="flex gap-2 items-center">
                <label htmlFor="weight">Date: </label>
                <input
                    className="w-32"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    type="date"
                    id="date"
                />
            </section>
            <section className="flex gap-2 items-center">
                <label htmlFor="bf">Current Body Fat (%):</label>
                <input
                    className="w-16"
                    onChange={(e) => setBodyFat(Number(e.target.value))}
                    value={bodyFat}
                    type="number"
                    id="bf"
                    placeholder="Body Fat Percentage"
                />
            </section>

            <button
                onClick={submitCurrentBodyFat}
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
            >
                Submit
            </button>
        </form>
    );
}
