import { Crown, Flame } from "lucide-react";
import React from "react";

function StatisticsSection() {
	return (
		<table className="w-full text-sm text-left text-slate-700">
			<tr className="flex gap-6 text-[18px] mb-3">
				<th className="w-32 flex items-center gap-2">
					<Crown color="gray" />
					Weight
				</th>
				<td className="font-semibold">200lbs</td>
			</tr>
			<tr className="flex gap-6 text-[18px]">
				<th className="w-32 flex items-center gap-2">
					<Flame color="red" fill="orange" /> Body Fat
				</th>
				<td className="font-semibold">20%</td>
			</tr>
		</table>
	);
}

export default StatisticsSection;
