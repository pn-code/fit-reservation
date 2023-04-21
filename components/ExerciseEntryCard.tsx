import { X } from "lucide-react";
import React from "react";

function ExerciseEntryCard() {
	return (
		<>
			<tr className="hover:bg-slate-200 cursor-pointer hover:text-indigo-600">
				<td>
                    exercise
					{/* {name.length > 30 ? name.substring(0, 30) + "..." : name} */}
				</td>
				<td>type</td>
				<td>3 x 10</td>
				<td>300</td>
				<td>
					<button>
						<X
							className="hover:bg-slate-300 ml-3 rounded-full"
							color="red"
						/>
					</button>
				</td>
			</tr>
		</>
	);
}

export default ExerciseEntryCard;
