import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full h-[calc(100vh-82px)] bg-gradient-to-b from-[#172554] to-blue-900 flex flex-col gap-4 shadow-md text-white/90 px-10">
            <header className="mt-40 sm:mt-56 sm:mb-14 w-full">
                <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
                    The best way to <span>jumpstart</span> your
                    <span className="text-indigo-400"> epic</span>
                    <span className="text-blue-600"> fitness</span>
                    <span className="text-purple-600"> journey</span>
                </h1>
            </header>

            <section className="w-full flex items-center justify-center gap-5 text-lg font-semibold">
                <Link
                    className="hover:text-white py-2 px-8 bg-slate-900 hover:bg-slate-800 rounded-full"
                    href={"/register"}
                >
                    Start Now
                </Link>
                <Link
                    className="text-black/90 hover:text-black py-2 px-8 bg-slate-200 hover:bg-slate-50 rounded-full"
                    href={"/login"}
                >
                    Login
                </Link>
            </section>
        </main>
    );
}
