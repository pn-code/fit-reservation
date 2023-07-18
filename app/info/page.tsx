import React from "react";
import { Calculator, Dumbbell, FileBarChart } from "lucide-react";

export default function Info() {
    return (
        <main className="w-full min-h-[calc(100vh-100px)] pb-20 overflow-y-auto bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="w-full flex justify-between lg:border-b-2 lg:border-b-indigo-600">
                <section className="flex justify-between font-bold pb-2 items-center">
                    <h1 className="text-3xl">How It Works</h1>
                </section>
            </header>

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
                            Using the industry standard equation for calculating
                            basal metabolic rate, Mifflin-St Jeor, use our
                            calculator to find your recommended daily caloric
                            intake depending on your current goals.
                        </p>
                    </div>
                </div>

                {/* PLAN */}
                <div className="flex gap-8 sm:gap-16 items-center max-w-[800px] ">
                    <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                        <Dumbbell size={120} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold sm:text-2xl">PLAN</h2>
                        <span className="text-sm sm:text-xl">
                            Take control of your workouts.
                        </span>
                        <p className="text-sm text-gray-400">
                            Search through our comprehensive list of training
                            plans and pick one that is suited for your
                            standards. Review others' training plans and create
                            your own!
                        </p>
                    </div>
                </div>

                {/* TRACK */}
                <div className="flex gap-8 sm:gap-16 items-center max-w-[800px] ">
                    <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                        <FileBarChart size={120} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold sm:text-2xl">TRACK</h2>
                        <span className="text-sm sm:text-xl">
                            Add success to your to do list.
                        </span>
                        <p className="text-sm text-gray-400">
                            Keep track of your nutritional intake and exercise
                            with our journal that is simple and easy to use.
                            Saved training plans can be easily added to the
                            journal for tracking.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
