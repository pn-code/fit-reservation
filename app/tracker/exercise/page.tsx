import Link from "next/link";
import ExerciseEntryClientComponent from "../../../components/ExerciseEntryClientComponent";
import TrackerHeader from "../../../components/TrackerHeader";
import { currentUser } from "@clerk/nextjs/app-beta";

async function ExercisePage() {
	const user = await currentUser();
    
	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<TrackerHeader title="Exercise" />
			<Link
				className="text-sm text-amber-400 hover:text-amber-300 hover:underline-offset-2 hover:underline"
				href={`/tracker/exercise/user/${user?.id}`}
			>
				See previous journals
			</Link>
			<ExerciseEntryClientComponent />
		</main>
	);
}

export default ExercisePage;
