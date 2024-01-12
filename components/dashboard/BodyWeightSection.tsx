"use client";

import { useState } from "react";
import LineChart from "./LineChart";
import formatDateString from "@/helpers/dates/formatDateString";
import BodyWeightTableModal from "./BodyWeightTableModal";
import AddBodyWeightFormModal from "./AddBodyWeightFormModal";

interface BodyWeightSectionProps {
    userWeights: WeightMeasurement[];
}

export default function BodyWeightSection({
    userWeights,
}: BodyWeightSectionProps) {
    const [weights, setWeights] = useState<WeightMeasurement[]>(userWeights);
    const [isWeightTableOpen, setIsWeightTableOpen] = useState<boolean>(false);
    const [isAddWeightModalOpen, setIsAddWeightModalOpen] =
        useState<boolean>(false);

    const currentWeight = weights[weights.length - 1];

    const formatWeights = (weights: WeightMeasurement[]) =>
        weights.length > 0
            ? weights?.map((data) => ({
                  x: formatDateString(data.createdAt),
                  y: data.weight,
              }))
            : [];

    const formattedWeights = formatWeights(weights);

    return (
        <section className="h-fit w-full rounded-md flex flex-col gap-2 flex-1 mt-5">
            <header className="flex justify-between sm:items-center sm:flex-row flex-col">
                <div className="flex gap-2 items-center justify-between md:justify-start">
                    <h3 className="text-lg font-bold">Weight Measurements</h3>

                    <div className="flex gap-2 md:gap-4"></div>
                    <button
                        onClick={() => setIsWeightTableOpen(true)}
                        type="button"
                        className="btn btn--primary"
                    >
                        View
                    </button>
                    <button
                        onClick={() => setIsAddWeightModalOpen(true)}
                        type="button"
                        className="btn hover:bg-slate-200"
                    >
                        Add
                    </button>
                </div>

                <span className="text-secondary">
                    Last Recorded Body Weight:{" "}
                    {currentWeight
                        ? `${currentWeight.weight} lbs`
                        : "No Records"}
                </span>
            </header>

            <LineChart
                title="Your Body Weight"
                label="Weight (lbs)"
                userData={formattedWeights}
                pointColor="rgb(163, 245, 157)"
                borderColor="rgb(87, 224, 76)"
            />

            <BodyWeightTableModal
                weights={weights}
                isOpen={isWeightTableOpen}
                setIsOpen={setIsWeightTableOpen}
                setWeights={setWeights}
            />

            <AddBodyWeightFormModal
                setWeights={setWeights}
                isOpen={isAddWeightModalOpen}
                setIsOpen={setIsAddWeightModalOpen}
            />
        </section>
    );
}
