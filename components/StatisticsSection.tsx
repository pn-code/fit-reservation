"use client";
import { Crown, Flame } from "lucide-react";

interface Props {
    currentWeight: number;
    currentBF: number;
}

function StatisticsSection({ currentWeight, currentBF }: Props) {
    return (
        <>
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
            </table>
        </>
    );
}

export default StatisticsSection;
