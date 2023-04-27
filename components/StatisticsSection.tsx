"use client";
import axios from "axios";
import { Crown, Flame } from "lucide-react";
import { useEffect, useState } from "react";

function StatisticsSection() {
	const [weights, setWeights] = useState<WeightMeasurement[]>([]);
	const [bodyFats, setBodyFats] = useState<BodyFatMeasurement[]>([]);

	const currentWeight = weights.length > 0 ? weights[weights.length - 1].weight : "N/A"
	const currentBF = bodyFats.length > 0 ? bodyFats[bodyFats.length - 1].bodyfat : "N/A"

	useEffect(() => {
		const getWeightData = async () => {
			const res = await axios.get("/api/weight_measurements");
			setWeights(res.data);
		};

		const getBFData = async () => {
			const res = await axios.get("/api/bf_measurements");
			setBodyFats(res.data);
		};

		getWeightData();
		getBFData();
	}, []);

	return (
		<>
			<h2 className="text-2xl font-semibold">
				Your Stats
			</h2>
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
