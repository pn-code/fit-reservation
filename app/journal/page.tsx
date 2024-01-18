import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import JournalSelector from "@/components/journals/JournalSelector";
import getFoodEntries from "@/helpers/getFoodEntries";
import getResistanceEntries from "@/helpers/exercise-entries/resistance/getResistanceEntries";
import getCardioEntriesByDate from "@/helpers/exercise-entries/cardio/getCardioEntriesByDate";
import getCardioEntries from "@/helpers/exercise-entries/cardio/getCardioEntries";

export const metadata = {
    title: "Journal | FitHeroes",
};

const JournalPage = async () => {
    const user = await currentUser();

    if (!user) return redirect("/");

    const foodEntries = await getFoodEntries();
    const resistanceEntries = await getResistanceEntries();
    const cardioEntries = await getCardioEntries();

    return (
        <main className="w-full min-h-[calc(100vh-64px)] pb-20 overflow-y-auto py-6 flex flex-col gap-4 px-1 md:px-[4%]">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md flex justify-between flex-col md:flex-row ">
                <div className="flex flex-col">
                    <h1>Journal</h1>
                    <p className="tracking-tighter text-secondary">
                        Keep track of progress
                    </p>
                </div>
            </header>

            <JournalSelector
                foodEntries={foodEntries}
                cardioEntries={cardioEntries}
                resistanceEntries={resistanceEntries}
                userId={user.id}
            />
        </main>
    );
};

export default JournalPage;
