import { Calculator, Dumbbell, FileBarChart } from "lucide-react";

export default function ToolsSection() {
    return (
        <section
            id="info"
            className="w-full flex flex-col gap-8 sm:gap-16 py-12 md:py-20 px-12 md:px-[4%] text-center md:text-left"
        >
            <h2 className="w-full text-4xl flex gap-2 flex-col font-bold">
                Leverage our fitness tools
                <span className="text-[16px] sm:text-xl text-gray-700 font-normal">
                    Featuring all you&apos;ll need to elevate your fitness.
                </span>
            </h2>

            <div className="flex flex-col lg:flex-row lg:justify-between gap-20 md:gap-4">
                {/* CALCULATE */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[520px]">
                    <div className="flex justify-center items-center px-8 bg-slate-900 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                        <Calculator size={60} color="white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold sm:text-2xl">
                            CALCULATE
                        </h2>
                        <span className="text-xl text-amber-500">
                            Find your starting point.
                        </span>
                        <p className="text-[16px] text-slate-700 mt-2 sm:text-left">
                            Quickly identify your recommended daily caloric
                            intake depending on your goals.
                        </p>
                    </div>
                </div>

                {/* PLAN */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[520px]">
                    <div className="flex justify-center items-center px-8 bg-slate-900 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                        <Dumbbell size={60} color="white" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold sm:text-2xl">PLAN</h2>
                        <span className="text-xl text-amber-500">
                            Take control of your workouts.
                        </span>
                        <p className="text-[16px] text-slate-700 sm:text-left">
                            Search through our comprehensive list of training
                            plans and pick one that is suited for your
                            standards.
                        </p>
                    </div>
                </div>

                {/* TRACK */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[520px]">
                    <div className="flex justify-center items-center px-8 bg-slate-900 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                        <FileBarChart size={60} color="white" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl font-bold sm:text-2xl">TRACK</h2>
                        <span className="text-xl text-amber-500">
                            Add success to your to do list.
                        </span>
                        <p className="text-[16px] text-slate-700 sm:text-left">
                            Keep track of your nutritional intake and exercise
                            with our journal that is simple and easy to use.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
