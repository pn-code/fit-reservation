import React from "react";

interface PageProps {
    plan: TrainingPlan | null;
}

export default function PlanTable({ plan }: PageProps) {
    if (!plan) return null;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                    {plan.name} Preview
                    <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                        {plan.description}
                    </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Exercise Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Sets
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reps
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {plan.exercises?.map((exercise) => (
                        <tr key={exercise.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                                {exercise.name}
                            </th>
                            <td className="px-6 py-4">{exercise.type}</td>
                            <td className="px-6 py-4">{exercise.sets}</td>
                            <td className="px-6 py-4">{exercise.reps}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
