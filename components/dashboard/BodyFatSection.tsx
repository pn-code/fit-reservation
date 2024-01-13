"use client";

import React, { useState } from "react";
import LineChart from "./LineChart";
import formatDateString from "@/helpers/dates/formatDateString";
import BodyFatFormModal from "./BodyFatFormModal";
import BodyFatTableModal from "./BodyFatTableModal";

interface BodyFatSectionProps {
    userBodyfats: BodyFatMeasurement[];
}

export default function BodyFatSection({ userBodyfats }: BodyFatSectionProps) {
    const [bodyfats, setBodyfats] =
        useState<BodyFatMeasurement[]>(userBodyfats);
    const [isBodyfatTableOpen, setIsBodyfatTableOpen] =
        useState<boolean>(false);
    const [isAddBodyfatModalOpen, setIsAddBodyfatModalOpen] =
        useState<boolean>(false);

    const currentBodyfat = bodyfats[bodyfats.length - 1];
    const formattedBodyFats =
        userBodyfats.length > 0
            ? userBodyfats.map((data) => ({
                  x: formatDateString(data.createdAt),
                  y: data.bodyfat,
              }))
            : [];

    return (
        <section className="h-fit w-full rounded-md flex flex-col gap-2 flex-1 mt-5">
            <header className="container flex justify-between sm:items-center">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold tracking-tighter">
                        Body Fat Measurements
                    </h3>
                    <span className="text-secondary text-sm tracking-tighter">
                        Last Recorded Body Fat:{" "}
                        {currentBodyfat
                            ? `${currentBodyfat.bodyfat} %`
                            : "No Records"}
                    </span>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setIsBodyfatTableOpen(true)}
                        type="button"
                        className="btn btn--primary"
                    >
                        View
                    </button>
                    <button
                        onClick={() => setIsAddBodyfatModalOpen(true)}
                        type="button"
                        className="btn hover:bg-slate-200"
                    >
                        Add
                    </button>
                </div>
            </header>

            <LineChart
                title="Your Body Fat"
                label="Body Fat (%)"
                userData={formattedBodyFats}
                pointColor="rgb(222, 155, 129)"
                borderColor="rgb(232, 151, 70)"
            />

            <BodyFatTableModal
                bodyfats={bodyfats}
                isOpen={isBodyfatTableOpen}
                setIsOpen={setIsBodyfatTableOpen}
                setBodyfats={setBodyfats}
            />

            <BodyFatFormModal
                setBodyFats={setBodyfats}
                isOpen={isAddBodyfatModalOpen}
                setIsOpen={setIsAddBodyfatModalOpen}
            />
        </section>
    );
}
