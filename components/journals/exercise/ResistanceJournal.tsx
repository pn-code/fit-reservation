"use client";
import { useEffect, useState } from "react";
import ExerciseEntryCard from "./ExerciseEntryCard";
import { getSingleDayEntries } from "@/helpers/getSingleDayEntries";
import toast from "react-hot-toast";

interface ResistanceJournalProps {
    resistanceEntries: ExerciseEntry[];
    date: Date;
}

export default function ResistanceJournal({
    resistanceEntries,
    date,
}: ResistanceJournalProps) {
    const [resistanceEntriesToShow, setResistanceEntriesToShow] = useState<
        ExerciseEntry[]
    >([]);

    useEffect(() => {
        const fetchEntriesByDate = (date: Date) => {
            try {
                const currentEntries = getSingleDayEntries(
                    new Date(date),
                    resistanceEntries
                );
                setResistanceEntriesToShow(currentEntries);
            } catch (error) {
                toast.error("Please enter a valid date.");
                console.error(error);
            }
        };

        fetchEntriesByDate(date);
    }, [date, resistanceEntries]);
    return (
        <section className="flex flex-col gap-4 py-5 w-full bg-white border border-primary p-4 rounded-sm shadow-md">
            <h3 className="font-semibold text-xl tracking-tight">
                Resistance Journal
            </h3>
            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full text-xs md:text-sm">
                    <thead className="h-8 uppercase bg-primary text-white border border-primary">
                        <tr className="p-2 whitespace-nowrap">
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Exercise
                                </div>
                            </th>
                            <th className="md:hidden">
                                <div className="p-2 font-semibold text-left">
                                    Details
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left hidden md:table-cell">
                                    Sets
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left hidden md:table-cell">
                                    Reps
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left hidden md:table-cell">
                                    Weight
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left"></div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-primary border border-primary">
                        {resistanceEntriesToShow?.map(
                            (entry: ExerciseEntry) => (
                                <ExerciseEntryCard
                                    id={entry.id}
                                    name={entry.name}
                                    type={entry.type}
                                    duration={entry.duration}
                                    weight={entry.weight}
                                    sets={entry.sets}
                                    reps={entry.reps}
                                    calories={entry.calories}
                                    key={entry.id}
                                />
                            )
                        )}
                    </tbody>
                </table>

                {resistanceEntriesToShow && !resistanceEntriesToShow.length && (
                    <p className="text-center w-full pt-4">
                        You currently have no resistance entries.
                    </p>
                )}
            </div>
        </section>
    );
}
