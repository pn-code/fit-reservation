import JournalSelector from "@/components/journals/JournalSelector";

export const metadata = {
    title: "Journal | FitHeroes",
};

const JournalPage = async () => {
    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="flex justify-between font-bold pb-2 items-center h-full">
                    <h1 className="text-xl sm:text-3xl">Journal</h1>
                </section>
            </header>

            <JournalSelector/>
        </main>
    );
};

export default JournalPage;
