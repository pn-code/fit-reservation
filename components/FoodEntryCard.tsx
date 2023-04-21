import React from "react";

interface FoodEntryCardProps {
	name: string;
	calories: number;
	carbs: number;
	fats: number;
	protein: number;
}

function FoodEntryCard({
	name,
	calories,
	carbs,
	fats,
	protein,
}: FoodEntryCardProps) {
	return (
		<tr>
			<td>{name.length > 30 ? name.substring(0, 30) + "..." : name}</td>
			<td>{calories}</td>
			<td>{carbs}</td>
			<td>{fats}</td>
			<td>{protein}</td>
		</tr>
	);
}

export default FoodEntryCard;
