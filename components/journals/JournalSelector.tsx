"use client";

import { useState } from "react";

import DateSelector from "@/components/journals/DateSelector";
import NutritionForm from "@/components/journals/nutrition/NutritionForm";
import ExerciseForm from "@/components/journals/exercise/ExerciseForm";
import { findFirstDate } from "@/helpers/findFirstDate";
import { convertDateInputToDate } from "@/helpers/convertDateInputToDate";

export default function JournalSelector() {
  const [currentJournal, setCurrentJournal] = useState<string>("nutrition");
  const [selectedDate, setSelectedDate] = useState<string>(findFirstDate());

  const convertedDate = convertDateInputToDate(selectedDate);

  const handleChangeJournal = () => {
    setCurrentJournal((prev) =>
      prev === "nutrition" ? "exercise" : "nutrition"
    );
  };

  return (
    <div>
      <header className="flex items-center w-full justify-between">
        <h2 className="text-lg font-semibold">
          <button
            onClick={handleChangeJournal}
            className="btn btn--secondary"
          >
            {currentJournal.toUpperCase()}
          </button>
        </h2>

        <DateSelector
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </header>

      {currentJournal === "nutrition" ? (
        <NutritionForm selectedDate={convertedDate} />
      ) : (
        <ExerciseForm selectedDate={convertedDate} />
      )}
    </div>
  );
}
