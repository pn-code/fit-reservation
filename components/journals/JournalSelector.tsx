"use client";

import { useState } from "react";

import DateSelector from "@/components/journals/DateSelector";
import { findFirstDate } from "@/helpers/findFirstDate";
import { convertDateInputToDate } from "@/helpers/convertDateInputToDate";
import NutritionJournal from "./nutrition/NutritionJournal";
import ExerciseJournal from "./exercise/ExerciseJournal";
import AddExerciseModal from "./exercise/AddExerciseModal";
import AddFoodModal from "./nutrition/AddFoodModal";

interface JournalSelectorProps {
    cardioEntries: any[];
    resistanceEntries: any[];
    foodEntries: any[];
    userId: string;
}

export default function JournalSelector({
    resistanceEntries,
    cardioEntries,
    foodEntries,
    userId,
}: JournalSelectorProps) {
    const [selectedDate, setSelectedDate] = useState<string>(findFirstDate());
    const [isAddFoodModalOpen, setIsAddFoodModalOpen] =
        useState<boolean>(false);
    const [isAddExerciseModalOpen, setIsAddExerciseModalOpen] =
        useState<boolean>(false);

    // Use this date as comparable to entry dates
    const useableDate = convertDateInputToDate(selectedDate);

    return (
        <div>
            <div className="mb-4 flex md:items-center w-full md:justify-between flex-col md:flex-row bg-white border border-primary p-4 rounded-sm shadow-md">
                <div className="flex gap-2 mb-2 md:mb-0">
                    <button
                        onClick={() => setIsAddFoodModalOpen(true)}
                        type="button"
                        className="btn btn--primary w-full md:w-fit"
                    >
                        Add Food
                    </button>
                    <button
                        onClick={() => setIsAddExerciseModalOpen(true)}
                        type="button"
                        className="btn btn--secondary w-full md:w-fit"
                    >
                        Add Exercise
                    </button>
                </div>
                <DateSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </div>

            <AddExerciseModal
                setIsOpen={setIsAddExerciseModalOpen}
                isOpen={isAddExerciseModalOpen}
                date={useableDate.toISOString()}
            />

            <AddFoodModal
                setIsOpen={setIsAddFoodModalOpen}
                isOpen={isAddFoodModalOpen}
                date={useableDate.toISOString()}
            />

            <div className="flex flex-col gap-4">
                <NutritionJournal
                    foodEntries={foodEntries}
                    date={useableDate}
                />
                <ExerciseJournal
                    resistanceEntries={resistanceEntries}
                    cardioEntries={cardioEntries}
                    date={useableDate}
                />
            </div>
        </div>
    );
}
