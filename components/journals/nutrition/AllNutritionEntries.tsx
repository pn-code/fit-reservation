interface AllNutritionEntriesProps {
    sortedFoodJournals: any;
    date: string;
}

export default function AllNutritionEntries({
    sortedFoodJournals,
    date,
}: AllNutritionEntriesProps) {
    return (
        <div className="w-full sm:w-[75%] lg:w-[50%] ">
            <div className="overflow-x-auto w-full">
                <table className="table-auto w-full border border-primary bg-white">
                    <thead className="h-8 text-xs sm:text-[16px] font-semibold uppercase text-white bg-primary">
                        <tr className="p-2 whitespace-nowrap">
                            <th className="w-40 sm:w-56 p-2">
                                <div className="font-semibold text-left">
                                    Name
                                </div>
                            </th>
                            <th className="p-2">
                                <div className="font-semibold text-left">
                                    Calories
                                </div>
                            </th>
                            <th className="hidden sm:table-cell p-2">
                                <div className="font-semibold text-left">
                                    Carbs
                                </div>
                            </th>
                            <th className="hidden sm:table-cell p-2">
                                <div className="font-semibold text-left">
                                    Fats
                                </div>
                            </th>
                            <th className="hidden sm:table-cell p-2">
                                <div className="font-semibold text-left">
                                    Protein
                                </div>
                            </th>
                            <th className="sm:hidden p-2">
                                <div className="font-semibold text-left">
                                    C/F/P
                                </div>
                            </th>
                        </tr>
                    </thead>

                    {!sortedFoodJournals[date] ? (
                        <p className="p-2 text-sm">
                            No Nutrition Entries Found
                        </p>
                    ) : (
                        sortedFoodJournals[date].map((item: FoodEntry) => (
                            <tbody
                                className="text-sm divide-y divide-gray-100"
                                key={item.id}
                            >
                                <tr className="text-[14px] bg-white cursor-pointer hover:bg-slate-100 duration-150">
                                    <td className="p-2 whitespace-nowrap">
                                        {item.name.length > 20
                                            ? `${item.name.substring(0, 20)}...`
                                            : item.name}
                                    </td>

                                    <td className="p-2 whitespace-nowrap">
                                        {item.calories}
                                    </td>
                                    <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                                        {item.carbs} g
                                    </td>
                                    <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                                        {item.fats} g
                                    </td>
                                    <td className="p-2 whitespace-nowrap hidden sm:table-cell">
                                        {item.protein} g
                                    </td>
                                    <td className="sm:hidden">{`${item.carbs}/${item.fats}/${item.protein}`}</td>
                                </tr>
                            </tbody>
                        ))
                    )}
                </table>
            </div>
        </div>
    );
}
