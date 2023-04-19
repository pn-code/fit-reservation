"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface MacroChartProps {
	carbs: number;
	fats: number;
	protein: number;
}

export default function MacroChart({ carbs, fats, protein }: MacroChartProps) {
	const data = {
		labels: ["Carbohydrates", "Fats", "Protein"],
		datasets: [
			{
				label: "grams",
				data: [carbs, fats, protein],
				backgroundColor: [
					"rgba(255, 255, 86, 0.2)",
					"rgba(50, 50, 255, 0.2)",
					"rgba(255, 20, 20, 0.2)",
				],
				borderColor: [
					"rgba(255, 206, 86, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 99, 132, 1)",
				],
				borderWidth: 1,
			},
		],
	};

	return <Doughnut data={data} />;
}
