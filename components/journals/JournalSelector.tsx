"use client";

import DateSelector from "@/components/journals/DateSelector";
import { RotateCw } from "lucide-react";
import { useState } from "react";
import NutritionForm from "../NutritionForm";
import NutritionJournal from "../NutritionJournal";
import ExerciseForm from "../ExerciseForm";

export default function JournalSelector() {
    const [currentJournal, setCurrentJournal] = useState<string>("nutrition");

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
                        className="bg-indigo-700 px-2 rounded-md py-1 hover:bg-indigo-700/70"
                    >
                        {currentJournal.toUpperCase()}
                    </button>
                </h2>

                <DateSelector />
            </header>

            {currentJournal === "nutrition" ? (
                <NutritionForm />
            ) : (
                <ExerciseForm />
            )}
        </div>
    );
}

{
    /* <section className="flex flex-col gap-8">
    <article className="flex flex-col gap-2 flex-1">
        <header className="flex justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold text-amber-400 text-center">
                Nutrition Journal
            </h2>
            <Link href={`/journal/nutrition/user/${user?.id}`}>See more</Link>
        </header>
        <NutritionForm />
    </article>

    <article className="flex flex-col gap-2 flex-1">
        <header className="flex justify-between">
            <h2 className="text-lg sm:text-2xl font-semibold text-amber-400 text-center">
                Exercise Journal
            </h2>
            <Link href={`/journal/exercise/user/${user?.id}`}>See more</Link>
        </header>
        <ExerciseForm />
    </article>
</section>; */
}
