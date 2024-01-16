import React from "react";
import ExerciseEntryCard from "./ExerciseEntryCard";

interface ResistanceJournalProps {
    resistanceEntries: ExerciseEntry[];
}

export default function ResistanceJournal({
    resistanceEntries,
}: ResistanceJournalProps) {
    return (
        <section className="flex flex-col gap-4 py-5 w-full bg-white border border-primary p-4 rounded-sm shadow-md">
            <h3 className="font-semibold text-xl tracking-tight">
                Resistance Journal
            </h3>
            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full text-xs md:text-sm">
                    <thead className="h-8 uppercase bg-primary text-white">
                        <tr className="p-2 whitespace-nowrap">
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Exercise
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Sets
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Reps
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Weight
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    Action
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-primary border border-primary">
                        {resistanceEntries?.map((entry: ExerciseEntry) => (
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
                        ))}
                    </tbody>
                </table>

                {resistanceEntries && !resistanceEntries.length && (
                    <p className="text-center w-full pt-4">
                        You currently have no resistance entries.
                    </p>
                )}
            </div>
        </section>
    );
}
