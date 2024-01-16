"use client";

import { SetStateAction, useState } from "react";

import DateSelector from "@/components/journals/DateSelector";
import { findFirstDate } from "@/helpers/findFirstDate";
import { convertDateInputToDate } from "@/helpers/convertDateInputToDate";
import NutritionJournal from "./nutrition/NutritionJournal";
import ExerciseJournal from "./exercise/ExerciseJournal";
import AddExerciseModal from "./exercise/AddExerciseModal";
import AddFoodModal from "./nutrition/AddFoodModal";

interface JournalSelectorProps {
    cardioEntries: ExerciseEntry[];
    resistanceEntries: ExerciseEntry[];
    foodEntries: FoodEntry[];
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

    return (
        <div>
            <div className="mb-4 flex items-center w-full justify-between bg-white border border-primary p-4 rounded-sm shadow-md">
                <div className="flex gap-2">
                    <button
                        onClick={() => setIsAddFoodModalOpen(true)}
                        type="button"
                        className="btn btn--primary"
                    >
                        Add Food
                    </button>
                    <button
                        onClick={() => setIsAddExerciseModalOpen(true)}
                        type="button"
                        className="btn btn--secondary"
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
            />

            <AddFoodModal
                setIsOpen={setIsAddFoodModalOpen}
                isOpen={isAddFoodModalOpen}
            />

            <div className="flex flex-col gap-4">
                <NutritionJournal foodEntries={foodEntries} userId={userId} />
                <ExerciseJournal
                    resistanceEntries={resistanceEntries}
                    cardioEntries={cardioEntries}
                    userId={userId}
                />
            </div>
        </div>
    );
}
