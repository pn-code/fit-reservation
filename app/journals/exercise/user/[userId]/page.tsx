import { currentUser } from "@clerk/nextjs/app-beta";

export default async function UserExerciseJournals() {
    const user = await currentUser()
	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
			<header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
				<h1 className="text-3xl">{user?.firstName} Journals</h1>
			</header>
		</main>
	);
}
