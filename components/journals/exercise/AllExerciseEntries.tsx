"use client";

interface AllExerciseEntriesProps {
    date: string;
    sortedJournals: any;
}

export default function AllExerciseEntries({
    date,
    sortedJournals,
}: AllExerciseEntriesProps) {
    return (
        <div className="w-full sm:w-[75%] lg:w-[50%] ">
            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full border border-primary bg-white">
                    <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-white bg-primary">
                        <tr className="p-2 whitespace-nowrap">
                            <th className="w-44 p-2">
                                <div className="font-semibold text-left">
                                    Exercise Name
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-left">
                                    Exercise Details
                                </div>
                            </th>
                        </tr>
                    </thead>
                    {!sortedJournals[date] ? (
                        <p className="p-2 text-sm">No Entries Found</p>
                    ) : (
                        sortedJournals[date].map(
                            (item: ExerciseEntry) => (
                                <tbody className="text-sm" key={item.id}>
                                    <tr className="text-[14px] bg-white cursor-pointer hover:bg-slate-100">
                                        <td className="p-2 whitespace-nowrap">
                                            {item.name}
                                        </td>

                                        {item.type == "resistance" ? (
                                            <td className="p-2 whitespace-nowrap">{`${item.sets} x ${item.reps} at ${item.weight}lbs`}</td>
                                        ) : (
                                            <td className="p-2 whitespace-nowrap">
                                                {item.duration} mins
                                            </td>
                                        )}
                                    </tr>
                                </tbody>
                            )
                        )
                    )}
                </table>
            </div>
        </div>
    );
}
