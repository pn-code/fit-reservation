import Link from "next/link";

export default function page() {
    return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Checkout Canceled</h1>
            </header>

            <section className="flex flex-col gap-4">
                <h2 className="text-2xl text-amber-400 font-semibold">Order Successfully Canceled</h2>
                <Link
                    className="px-4 py-2 rounded-md bg-gray-500 text-white text-lg w-fit"
                    href="/"
                >
                    Return Home
                </Link>
            </section>
        </main>
    );
}
