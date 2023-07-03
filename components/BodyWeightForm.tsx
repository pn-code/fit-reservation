import { useState } from "react";
import { weightSchema } from "../validations/weightValidator";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
    setWeights: any;
}

export default function BodyWeightForm({ setWeights }: Props) {
    const today = new Date().toISOString().split("T")[0];

    const [weight, setWeight] = useState<number>(160);
    const [date, setDate] = useState(today);

    const submitCurrentWeight = async () => {
        try {
            const validateWeight = weightSchema.parse(weight);
            if (validateWeight) {
                const formattedDate = new Date(date).toISOString();
                const res = await axios.post("/api/weight_measurements", {
                    weight,
                    createdAt: formattedDate,
                });

                if (res.status === 200) {
                    toast.success(
                        `Successfully added new weight to user data.`
                    );
                    setWeights((prev: unknown[]) =>
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
        <form className="w-full text-sm flex flex-col gap-4 justify-center items-center bg-gray-800 px-4 py-2 rounded-md">
            <section className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between">
            <section className="w-full flex flex-col sm:flex-row gap-2 items-center">
                <label className="font-bold" htmlFor="weight">Date: </label>
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
                <label className="font-bold" htmlFor="weight">Weight (lbs):</label>
                <input
                    className="w-full sm:w-16"
                    onChange={(e) => setWeight(Number(e.target.value))}
                    value={weight}
                    type="number"
                    id="weight"
                    placeholder="weight"
                />
            </section>
            </section>
            <button
                onClick={submitCurrentWeight}
                type="button"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 sm:py-2 hover:underline"
            >
                Submit
            </button>
        </form>
    );
}
