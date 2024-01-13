import Spinner from "@/components/Spinner";

export default function Loading() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 mb-12 md:mb-0 flex flex-col px-4 md:px-[4%] relative">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md">
                <h1 className="font-bold">Dashboard</h1>
                <p className="text-secondary tracking-tighter">
                    View your progress
                </p>
            </header>

            <section className="w-full h-full flex justify-center mt-40">
                <Spinner size={16} />
            </section>
        </main>
    );
}
