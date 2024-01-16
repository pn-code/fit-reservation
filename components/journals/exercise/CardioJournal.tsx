import Link from "next/link";
import ExerciseEntryCard from "./ExerciseEntryCard";

interface CardioJournalProps {
    cardioEntries: ExerciseEntry[];
}

export default function CardioJournal({ cardioEntries }: CardioJournalProps) {
    return (
        <section className="flex flex-col gap-4 py-5 w-full bg-white border border-primary p-4 rounded-sm shadow-md">
            <h3 className="font-bold text-xl tracking-tight">Cardio Journal</h3>

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
                                <div className="p-2 font-semibold text-left md:table-cell hidden">
                                    Duration
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left md:table-cell hidden">
                                    Distance
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left hidden md:table-cell">
                                    Calories
                                </div>
                            </th>
                            <th>
                                <div className="p-2 font-semibold text-left">
                                    
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="text-sm divide-y divide-primary border border-primary">
                        {cardioEntries?.map((entry: ExerciseEntry) => (
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

                {!cardioEntries.length && (
                    <p className="text-center w-full pt-4">
                        You currently have no cardio entries.
                    </p>
                )}
            </div>
        </section>
    );
}
