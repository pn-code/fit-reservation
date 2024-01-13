"use client";

import formatDateString from "@/helpers/dates/formatDateString";
import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface BodyWeightTableModalProps {
    weights: WeightMeasurement[];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    setWeights: Dispatch<SetStateAction<WeightMeasurement>>;
}

export default function BodyWeightTableModal({
    weights,
    isOpen,
    setIsOpen,
    setWeights,
}: BodyWeightTableModalProps) {
    const [loading, setLoading] = useState<boolean>(false);

    const deleteWeight = async (id: number) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/weight_measurements/${id}`);

            if (res.status == 200) {
                setWeights((prev) =>
                    [...prev].filter((weight) => weight.id !== id)
                );
                toast.success("Successfully deleted weight!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error has occurred during deletion.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute bg-black/80 top-0 left-0 w-full h-full md:h-screen z-50 flex justify-center pt-5">
            <div className="bg-white h-[75vh] w-[340px] md:w-[500px] p-4 my-4 md:px-8 rounded border border-primary overflow-y-auto">
                <header className="flex justify-between items-center mb-2">
                    <h2>View all weights</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="text-start">Date</th>
                            <th className="text-start">Weight</th>
                            <th className="flex justify-end mr-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weights.map((weightObj: WeightMeasurement) => (
                            <tr
                                key={weightObj.id}
                                className="hover:bg-slate-100"
                            >
                                <td>{formatDateString(weightObj.createdAt)}</td>
                                <td>{weightObj.weight.toFixed(1)}</td>
                                <td className="flex justify-end">
                                    <button
                                        disabled={loading}
                                        onClick={() =>
                                            deleteWeight(weightObj.id)
                                        }
                                        type="button"
                                        className="btn btn--danger"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
