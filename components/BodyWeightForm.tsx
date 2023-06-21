import { useState } from "react";
import { weightSchema } from "../validations/weightValidator";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
    setWeights: any;
}

export default function BodyWeightForm({ setWeights }: Props) {
    const [weight, setWeight] = useState<number>(160);

    const submitCurrentWeight = async () => {
        try {
            const validateWeight = weightSchema.parse(weight);

            if (validateWeight) {
                const res = await axios.post("/api/weight_measurements", {
                    weight,
                });

                if (res.status === 200) {
                    toast.success(
                        `Current weight has been updated to ${weight} lbs.`
                    );
                    setWeights((prev: unknown[]) => [...prev, res.data]);
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
        <form className="text-sm flex gap-4 justify-center items-center bg-gray-800 px-4 py-2 rounded-md">
            <label htmlFor="weight">Current Weight (lbs):</label>
            <input
                className="w-16"
                onChange={(e) => setWeight(Number(e.target.value))}
                value={weight}
                type="number"
                id="weight"
                placeholder="weight"
            />
            <button
                onClick={submitCurrentWeight}
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-4 py-2 hover:underline"
            >
                Submit
            </button>
        </form>
    );
}
