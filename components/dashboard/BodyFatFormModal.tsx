import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import { bodyFatSchema } from "@/validations/bodyFatValidator";

interface BodyFatFormModalProps {
    setBodyFats: any;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BodyFatFormModal({
    setBodyFats,
    isOpen,
    setIsOpen,
}: BodyFatFormModalProps) {
    const today = new Date().toISOString().split("T")[0];

    const [bodyFat, setBodyFat] = useState<number>(15);
    const [date, setDate] = useState(today);
    const [loading, setLoading] = useState(false);

    const submitCurrentBodyFat = async () => {
        try {
            setLoading(true);
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
                    setBodyFats((prev: BodyFatMeasurement[]) =>
                        [...prev, res.data].sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                    );
                } else {
                    throw Error;
                }
                setIsOpen(false);
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
        <div className="absolute bg-black/80 top-0 left-0 w-full h-[90vh] md:h-full z-50 flex justify-center pt-5">
            <form className="bg-white w-[340px] md:w-[500px] p-4 my-4 md:px-8 rounded border border-primary h-fit flex flex-col gap-4">
                <header className="flex justify-between items-center gap-4">
                    <h2>Add Bodyfat Measurement</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>
                <section className="w-full flex flex-col gap-4 md:flex-row md:justify-between">
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
                        <label className="font-bold" htmlFor="bf">
                            Body Fat (%):
                        </label>
                        <input
                            className="w-full sm:w-24"
                            onChange={(e) => setBodyFat(Number(e.target.value))}
                            value={bodyFat}
                            type="number"
                            id="bf"
                            placeholder="Body Fat Percentage"
                        />
                    </section>
                </section>

                <button
                    disabled={loading}
                    onClick={submitCurrentBodyFat}
                    type="button"
                    className="btn btn--primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
