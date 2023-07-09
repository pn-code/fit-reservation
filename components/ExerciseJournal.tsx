"use client";
import ExerciseEntryCard from "./ExerciseEntryCard";
import Spinner from "./Spinner";

interface Props {
    exercises: ExerciseEntry[];
    deleteExerciseEntry: any;
    loadingExercises: boolean;
}

export default function ExerciseJournal({
    exercises,
    deleteExerciseEntry,
    loadingExercises,
}: Props) {
    return (
        <section className="flex flex-col items-center gap-4 py-5 w-full">
            {/* When loading exercises */}
            {loadingExercises && <Spinner />}

            {/* When no exercises could be found. */}
            {exercises.length === 0 && !loadingExercises && (
                <p className="font-semibold text-sm">
                    Currently has no entries.
                </p>
            )}

            {/* Successfully loaded exercises  */}
            {exercises.length > 0 && !loadingExercises && (
                <div className="w-full sm:w-[75%]">
                    <div className="overflow-x-auto w-full">
                        <table className="table-auto w-full">
                            <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-yellow-50 bg-blue-900/60">
                                <tr className="p-2 whitespace-nowrap">
                                    <th>
                                        <div className="font-semibold text-left">
                                            Exercise
                                        </div>
                                    </th>
                                    <th className="hidden sm:table-cell">
                                        <div className="font-semibold text-left">
                                            Type
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Sets
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Reps
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Weight
                                        </div>
                                    </th>
                                    <th className="hidden sm:table-cell">
                                        <div className="font-semibold text-left">
                                            Calories
                                        </div>
                                    </th>
                                    <th>
                                        <div className="font-semibold text-left">
                                            Action
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="text-sm divide-y divide-gray-100">
                                {exercises?.map((entry) => (
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
                                        deleteExerciseEntry={
                                            deleteExerciseEntry
                                        }
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </section>
    );
}
