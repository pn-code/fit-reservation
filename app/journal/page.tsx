import Link from "next/link";
import { redirect } from "next/navigation";

import JournalSelector from "@/components/journals/JournalSelector";
import { currentUser } from "@clerk/nextjs";

export const metadata = {
  title: "Journal | FitHeroes",
};

const JournalPage = async () => {
  const user = await currentUser();

  if (!user) return redirect("/");

  return (
    <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto py-6 rounded-md flex flex-col gap-4 shadow-md px-4 md:px-[4%]">
      <header className="w-full flex justify-between border-b-2 border-b-primary">
        <section className="w-full flex justify-between font-bold pb-2 items-center h-full">
          <h1>Journal</h1>
          <div className="flex gap-2 ">
            <Link
              className="btn btn--primary"
              href={`/journal/nutrition/user/${user.id}`}
            >
              All Nutrition
            </Link>
            <Link
              className="btn btn--primary"
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
