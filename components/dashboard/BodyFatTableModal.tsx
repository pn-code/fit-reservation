"use state";

import formatDateString from "@/helpers/dates/formatDateString";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface BodyFatTableModalProps {
    bodyfats: BodyFatMeasurement[];
    setBodyfats: Dispatch<SetStateAction<BodyFatMeasurement[]>>;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BodyFatTableModal({
    bodyfats,
    setBodyfats,
    isOpen,
    setIsOpen,
}: BodyFatTableModalProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const deleteBodyFat = async (id: number) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/bf_measurements/${id}`);

            if (res.status == 200) {
                setBodyfats((prev: BodyFatMeasurement[]) =>
                    [...prev].filter((bodyfats) => bodyfats.id !== id)
                );
                toast.success("Successfully deleted bodyfat!");
            }
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("An error has occurred during deletion.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bg-black/80 top-0 left-0 w-full h-full md:h-screen z-50 flex justify-center pt-14 md:pt-24">
            <div className="bg-white h-[75vh] w-[340px] md:w-[500px] p-4 my-4 md:px-8 rounded border border-primary overflow-y-auto">
                <header className="flex justify-between items-center mb-2">
                    <h2>View all bodyfats</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="btn btn--primary"
                    >
                        X
                    </button>
                </header>

                <table className="w-full">
                    <thead className="text-left">
                        <tr>
                            <th>Date</th>
                            <th>Body Fat</th>
                            <th className="flex justify-end mr-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bodyfats.map((bodyfatObj: BodyFatMeasurement) => (
                            <tr
                                key={bodyfatObj.id}
                                className="hover:bg-slate-100"
                            >
                                <td>
                                    {formatDateString(bodyfatObj.createdAt)}
                                </td>
                                <td>{bodyfatObj.bodyfat.toFixed(1)}</td>
                                <td className="flex justify-end">
                                    <button
                                        disabled={loading}
                                        onClick={() =>
                                            deleteBodyFat(bodyfatObj.id)
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
