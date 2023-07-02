import { Calculator, Dumbbell, FileBarChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full h-full py-20 px-10 gap-6 sm:h-[calc(100vh-82px)] flex text-white items-center justify-center flex-col sm:flex-row bg-slate-900">
            {/* LEFT SIDE: HERO TEXT */}
            <section className="h-full bg-slate-900 sm:pt-6 md:pt-10 xl:pt-28 flex-1">
                <header className="sm:mt-20 w-full">
                    <h1 className="text-4xl sm:text-6xl font-bold text-center mb-6">FitHeroes</h1>
                    <p className="text-center text-3xl font-semibold tracking-tight sm:text-4xl sm:tracking-tight">
                        The best way to <span>jumpstart</span> your
                        <span className="text-indigo-400"> epic</span>
                        <span className="text-blue-600"> fitness</span>
                        <span className="text-purple-600"> journey</span>
                    </p>
                </header>

                <section className="mt-10 w-full flex items-center justify-center gap-5 text-lg font-semibold">
                    <Link
                        passHref={true}
                        href="/register"
                        className="hover:text-white py-2 px-8 bg-indigo-600 hover:bg-indigo-700 rounded-md"
                    >
                        Start
                    </Link>
                    <Link
                        passHref={true}
                        className="text-black/90 hover:text-black py-2 px-8 bg-slate-200 hover:bg-slate-50 rounded-md"
                        href={"/login"}
                    >
                        Login
                    </Link>
                </section>
            </section>

            {/* RIGHT SIDE: FEATURES SECTION */}
            <section className="flex flex-1 justify-center items-center w-full bg-gray-900 rounded-md mt-8 sm:mt-0">
                <section className="flex flex-col gap-8">
                    <h1 className="font-black text-xl sm:text-3xl">
                        USE OUR TOOLS TO:
                    </h1>
                    {/* CALCULATE */}
                    <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear lg:w-[575px]">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
                            <Calculator size={50} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl mb-2">
                                CALCULATE
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Find your starting point.
                            </span>
                        </div>
                    </div>

                    {/* PLAN */}
                    <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
                            <Dumbbell size={50} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl mb-2">
                                PLAN
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Take control of your workouts.
                            </span>
                        </div>
                    </div>

                    {/* TRACK */}
                    <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
                            <FileBarChart size={50} />
                        </div>

                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl mb-2">
                                TRACK
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Add success to your to do list.
                            </span>
                        </div>
                    </div>
                </section>
            </section>
        </main>
    );
}
