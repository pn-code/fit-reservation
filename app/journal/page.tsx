import JournalSelector from "@/components/journals/JournalSelector";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Journal | FitHeroes",
};

const JournalPage = async () => {
    const user = await currentUser();

    if (!user) return redirect("/");

    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="w-full flex justify-between font-bold pb-2 items-center h-full">
                    <h1 className="text-xl sm:text-3xl">Journal</h1>
                    <div>
                        <Link
                            className="text-sm font-semibold p-2 underline hover:text-slate-300"
                            href={`/journal/nutrition/user/${user.id}`}
                        >
                            All Nutrition
                        </Link>
                        <Link
                            className="text-sm font-semibold p-2 underline hover:text-slate-300"
                            href={`/journal/exercise/user/${user.id}`}
                        >
                            All Exercises
                        </Link>
                    </div>
                </section>
            </header>

            <JournalSelector />
        </main>
    );
};

export default JournalPage;
