import React from "react";
import {
    Calculator,
    CheckCircle,
    Dumbbell,
    FileBarChart,
    Shield,
} from "lucide-react";
import Image from "next/image";
import { XCircle } from "lucide-react";

export default function Info() {
    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="flex justify-between font-bold pb-2 items-center">
                    <h1 className="text-3xl">How It Works</h1>
                </section>
            </header>

            <div className="flex flex-col lg:flex-row justify-between gap-16 sm:gap-20 items-center">
                <section className="flex flex-col gap-8 sm:gap-16">
                    <h1 className="font-black text-xl sm:text-3xl">
                        USE OUR TOOLS TO:
                    </h1>
                    {/* CALCULATE */}
                    <div className="flex gap-8 sm:gap-16 items-center max-w-[800px]">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                            <Calculator size={120} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                CALCULATE
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Find your starting point.
                            </span>
                            <p className="text-sm text-gray-400">
                                Using the industry standard equation for
                                calculating basal metabolic rate, Mifflin-St
                                Jeor, use our calculator to find your
                                recommended daily caloric intake depending on
                                your current goals.
                            </p>
                        </div>
                    </div>

                    {/* PLAN */}
                    <div className="flex gap-8 sm:gap-16 items-center max-w-[800px] ">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                            <Dumbbell size={120} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                PLAN
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Take control of your workouts.
                            </span>
                            <p className="text-sm text-gray-400">
                                Search through our comprehensive list of
                                training plans and pick one that is suited for
                                your standards. Review others&apos; training plans
                                and create your own!
                            </p>
                        </div>
                    </div>

                    {/* TRACK */}
                    <div className="flex gap-8 sm:gap-16 items-center max-w-[800px] ">
                        <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                            <FileBarChart size={120} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <h2 className="text-xl font-bold sm:text-2xl">
                                TRACK
                            </h2>
                            <span className="text-sm sm:text-xl">
                                Add success to your to do list.
                            </span>
                            <p className="text-sm text-gray-400">
                                Keep track of your nutritional intake and
                                exercise with our journal that is simple and
                                easy to use. Saved training plans can be easily
                                added to the journal for tracking.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg hidden lg:flex">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            Features Preview
                            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                How we compare
                            </p>
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Company
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    BMR Calculator
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Nutrition Journal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Exercise Journal
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Training Programs
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Cronometer */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/company1.png"
                                            alt="cronometer"
                                            height={32}
                                            width={32}
                                        />{" "}
                                        <span>Cronometer</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                            </tr>

                            {/* WW */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/company3.png"
                                            alt="weight watchers"
                                            height={32}
                                            width={32}
                                        />
                                        <span>Weight Watchers</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                            </tr>

                            {/* Noom */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/company4.png"
                                            alt="noom"
                                            height={32}
                                            width={32}
                                        />
                                        <span>Noom</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                            </tr>

                            {/* Noom */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/company5.png"
                                            alt="lose it"
                                            height={32}
                                            width={32}
                                        />
                                        <span>Lose It</span>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                            </tr>

                            {/* MyFitnessPal */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/assets/company2.png"
                                            alt="my fitness pal"
                                            height={32}
                                            width={32}
                                        />
                                        <span>MyFitnessPal</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <XCircle
                                        className="text-red-500"
                                        size={32}
                                    />
                                </td>
                            </tr>

                            {/* FitHeroes */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Shield
                                            size={32}
                                            color="white"
                                        />
                                        <span>FitHeroes</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <CheckCircle
                                        className="text-green-500"
                                        size={32}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
