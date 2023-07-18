import { Calculator, Dumbbell, FileBarChart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-20 px-4 sm:px-40 gap-6 sm:h-[calc(100vh-82px)] flex text-white items-center justify-center flex-col md:flex-row bg-slate-900">
            {/* LEFT SIDE: HERO TEXT */}
            <section className="h-full flex flex-col justify-center bg-slate-900 flex-1 gap-10">
                <header className="w-full flex flex-col gap-10">
                    <h1 className="text-5xl sm:text-7xl font-semibold">
                        Achieve new heights
                    </h1>
                    <p className="text-gray-200/90 text-lg tracking-tight sm:text-xl sm:tracking-tight">
                        FitHeroes delivers a comprehensive collection of highly
                        effective tools utilized by fitness trainers and
                        industry experts, right to your doorstep. Experience
                        accelerated progress, optimize your workouts, and
                        successfully attain your fitness objectives.
                    </p>
                </header>

                <section className="w-full flex gap-5 text-lg font-semibold">
                    <Link
                        passHref={true}
                        href="/register"
                        className="min-w-[120px] w-[40%] min-h-[70px] flex justify-center items-center hover:text-white px-8 bg-indigo-600 hover:bg-indigo-700 rounded-sm"
                    >
                        Get Started
                    </Link>
                    {/* <Link
                        passHref={true}
                        className="min-w-[120px] w-[40%] min-h-[70px] flex justify-center items-center hover:text-white px-8 bg-transparent hover:bg-gray-800 rounded-sm"
                        href={"/login"}
                    >
                        How it works
                    </Link> */}
                </section>

                <div className="flex items-center gap-6">
                    <p className="text-gray-200/90 mr-2">
                        Going above and beyond the defined standards
                    </p>
                    <Image
                        className="rounded-sm"
                        src={"/assets/company1.png"}
                        height={42}
                        width={42}
                        alt=""
                    />
                    <Image
                        className="rounded-sm"
                        src={"/assets/company2.png"}
                        height={42}
                        width={42}
                        alt=""
                    />
                </div>
            </section>

            {/* RIGHT SIDE: HERO IMAGE */}
            <section className="hidden lg:flex flex-1 justify-center items-center w-full bg-gray-900 rounded-md mt-8 sm:mt-0">
                <Image
                    className="rounded-sm"
                    src={"/assets/HERO.png"}
                    height={1000}
                    width={720}
                    alt=""
                />
            </section>
        </main>
    );
}

// <section className="flex flex-col gap-8">
// <h1 className="font-black text-xl sm:text-3xl">
// USE OUR TOOLS TO:
// </h1>
// {/* CALCULATE */}
// <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear lg:w-[575px]">
// <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
//     <Calculator size={50} />
// </div>
// <div>
//     <h2 className="text-xl font-bold sm:text-2xl mb-2">
//         CALCULATE
//     </h2>
//     <span className="text-sm sm:text-xl">
//         Find your starting point.
//     </span>
// </div>
// </div>

// {/* PLAN */}
// <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
// <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
//     <Dumbbell size={50} />
// </div>
// <div>
//     <h2 className="text-xl font-bold sm:text-2xl mb-2">
//         PLAN
//     </h2>
//     <span className="text-sm sm:text-xl">
//         Take control of your workouts.
//     </span>
// </div>
// </div>

// {/* TRACK */}
// <div className="flex gap-8 sm:gap-16 hover:scale-105 duration-200 ease-linear">
// <div className="flex justify-center items-center p-2 bg-indigo-600 w-[70px] h-[70px] sm:h-20 sm:w-20 rounded-xl">
//     <FileBarChart size={50} />
// </div>

// <div>
//     <h2 className="text-xl font-bold sm:text-2xl mb-2">
//         TRACK
//     </h2>
//     <span className="text-sm sm:text-xl">
//         Add success to your to do list.
//     </span>
// </div>
// </div>
// </section>
