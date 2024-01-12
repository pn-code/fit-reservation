import Spinner from "@/components/Spinner";

export default function Loading() {
    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto py-6 rounded-md flex flex-col gap-4 shadow-md px-4 md:px-[4%]">
            <header className="w-full flex justify-between border-b-2 border-b-primary">
                <section className="w-full flex justify-between font-bold pb-2 items-center h-full">
                    <h1>Journal</h1>
                    <div className="flex gap-2 ">
                        <button className="btn btn--primary">
                            All Nutrition
                        </button>
                        <button className="btn btn--primary">
                            All Exercises
                        </button>
                    </div>
                </section>
            </header>

            <section className="w-full h-full flex justify-center mt-40">
                <Spinner size={16} />
            </section>
        </main>
    );
}
