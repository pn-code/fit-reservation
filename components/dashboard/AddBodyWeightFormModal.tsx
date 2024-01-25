"use client";

import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { weightSchema } from "@/validations/weightValidator";
import { useRouter } from "next/navigation";

interface AddBodyWeightFormModalProps {
    setWeights: any;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddBodyWeightFormModal({
    setWeights,
    isOpen,
    setIsOpen,
}: AddBodyWeightFormModalProps) {
    const today = new Date().toISOString().split("T")[0];

    const [weight, setWeight] = useState<number>(160);
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitCurrentWeight = async () => {
        try {
            setLoading(true);
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
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                    );
                }
                setIsOpen(false);
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error("We ran into an error...");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/80 top-0 left-0 w-full h-full md:h-screen z-50 flex justify-center pt-14 md:pt-24">
            <form className="bg-white w-[340px] md:w-[380px] p-4 my-4 md:px-8 rounded border border-primary h-fit">
                <header className="flex justify-between items-center gap-4">
                    <h2>Add Weight Measurement</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>

                <section className="w-full flex flex-col mt-4 gap-4 md:flex-row">
                    <section className="w-full flex flex-col gap-2">
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
                    <section className="w-full flex flex-col gap-2 items-end">
                        <label className="font-bold" htmlFor="weight">
                            Weight (lbs):
                        </label>
                        <input
                            className="w-full sm:w-24"
                            onChange={(e) => setWeight(Number(e.target.value))}
                            value={weight}
                            type="number"
                            id="weight"
                            placeholder="weight"
                        />
                    </section>
                </section>

                <div className="flex justify-end gap-4 mt-4">
                    <button
                        onClick={submitCurrentWeight}
                        type="button"
                        disabled={loading}
                        className="btn btn--primary"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
