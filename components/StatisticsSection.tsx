"use client";
import { Crown, Flame, LucideZap} from "lucide-react";

interface Props {
    currentWeight: number | null;
    currentBF: number | null;
    calorieGoal: number | null;
}

function StatisticsSection({ currentWeight, currentBF, calorieGoal }: Props) {
    return (
        <section className="flex flex-col gap-4 sm:flex-1">
            <h2 className="text-2xl font-semibold">Your Stats</h2>
            <table className="w-full text-sm text-left">
                <tbody>
                    <tr className="flex gap-6 text-[18px] mb-3">
                        <th className="w-32 flex items-center gap-2">
                            <Crown color="gray" />
                            Weight
                        </th>
                        <td className="font-semibold">{currentWeight} lbs</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex gap-6 text-[18px]">
                        <th className="w-32 flex items-center gap-2">
                            <Flame color="red" fill="orange" /> Body Fat
                        </th>
                        <td className="font-semibold">{currentBF} %</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="flex gap-6 text-[18px] mt-3">
                        <th className="w-32 flex items-center gap-2">
                            <LucideZap color="gray" fill="yellow" /> Calorie Goal
                        </th>
                        <td className="font-semibold">{calorieGoal} cal</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}

export default StatisticsSection;
