import Spinner from "../../../components/Spinner";

export default function Loading() {
    return (
        <main className="w-full h-screen bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex flex-col w-full gap-2">
                <h1 className="text-3xl font-bold border-b-indigo-600 border-b-2">
                    Tracker Overview
                </h1>
            </header>

            <section className="w-full h-full flex justify-center mt-40">
                <Spinner size={16}/>
            </section>
        </main>
    );
}
