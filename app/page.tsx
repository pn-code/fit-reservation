import { Calculator, Dumbbell, FileBarChart } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
       		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <section className="h-screen">
            <header className="mt-[24%] sm:mt-56 sm:mb-14 w-full">
                <h1 className="text-center text-5xl font-bold tracking-tight sm:text-5xl sm:tracking-tight lg:text-[4rem] xl:text-[6rem] xl:tracking-tight 2xl:text-[6.5rem]">
                    The best way to <span>jumpstart</span> your
                    <span className="text-indigo-400"> epic</span>
                    <span className="text-blue-600"> fitness</span>
                    <span className="text-purple-600"> journey</span>
                </h1>
            </header>

            <section className="mt-10 sm:mt-10 w-full flex items-center justify-center gap-5 text-lg font-semibold">
                <Link
                    passHref={true}
                    href="/register"
                    className="hover:text-white py-2 px-8 bg-slate-900 hover:bg-slate-800 rounded-md"
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

            {/* FEATURES SECTION */}
            <section className="h-screen flex justify-center w-full mt-20">
                <section className="flex flex-col gap-8">
                <h1 className="font-black text-3xl sm:text-5xl sm:mb-10">
                    USE OUR TOOLS TO:
                </h1>
                {/* CALCULATE */}
                <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear lg:w-[575px]">
                    <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-52 sm:w-52 rounded-xl">
                        <Calculator size={100}/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold sm:text-5xl mb-2">
                            CALCULATE
                        </h2>
                        <span className="text-sm sm:text-2xl">
                            Find your starting point.
                        </span>
                    </div>
                </div>

                {/* PLAN */}
                <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
                    <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-52 sm:w-52 rounded-xl">
                        <Dumbbell size={100}/>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold sm:text-5xl mb-2">
                            PLAN
                        </h2>
                        <span className="text-sm sm:text-2xl">
                            Take control of your workouts.
                        </span>
                    </div>
                </div>

                {/* TRACK */}
                <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
                    <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-52 sm:w-52 rounded-xl">
                        <FileBarChart size={100}/>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold sm:text-5xl mb-2">
                            TRACK
                        </h2>
                        <span className="text-sm sm:text-2xl">
                            Add success to your to do list.
                        </span>
                    </div>
                </div>
                </section>
            </section>
        </main>
    );
}
