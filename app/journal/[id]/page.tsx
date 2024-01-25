import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import getFoodEntries from "@/helpers/food-entries/getFoodEntries";
import getCardioEntries from "@/helpers/exercise-entries/cardio/getCardioEntries";
import getResistanceEntries from "@/helpers/exercise-entries/resistance/getResistanceEntries";
import AllJournalEntries from "@/components/journals/AllJournalEntries";

export const metadata = {
    title: "Journal: All | FitHeroes",
};

export default async function AllUserJournals() {
    const user = await currentUser();

    const foodEntries = await getFoodEntries();
    const cardioEntries = await getCardioEntries();
    const resistanceEntries = await getResistanceEntries();

    return (
        <main className="w-full min-h-[calc(100vh-64px)] mb-20 sm:mb-0 py-6 rounded-md flex flex-col gap-4 px-1 lg:px-[4%]">
            <header className="flex items-center justify-between font-bold bg-white border border-primary p-4 rounded-sm shadow-md">
                <h1 className="text-xl sm:text-3xl">
                    {`${user?.firstName || "User"}'s Nutrition Journals`}
                </h1>
                <Link
                    className="btn btn--primary"
                    passHref={true}
                    href="/journal"
                >
                    Back
                </Link>
            </header>

            {/* Render Journals */}
            <AllJournalEntries
                foodEntries={foodEntries}
                cardioEntries={cardioEntries}
                resistanceEntries={resistanceEntries}
            />
        </main>
    );
}
