import { Calculator, Dumbbell, FileBarChart } from "lucide-react";

export default function ToolsSection() {
    return (
        <section
            id="info"
            className="w-full flex flex-col gap-8 sm:gap-16 pt-5 justify-center items-center"
        >
            <h2 className="w-full text-2xl lg:text-3xl flex gap-2 flex-col font-bold lg:flex-row lg:items-end lg:justify-center">
                What&apos;s in FitHeroes?
                <span className="text-[16px] sm:text-xl text-gray-300 font-normal">
                    All the tools you need to elevate your fitness.
                </span>
            </h2>
            {/* CALCULATE */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[890px]">
                <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                    <Calculator size={120} />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold sm:text-2xl">CALCULATE</h2>
                    <span className="text-sm sm:text-xl text-amber-300">
                        Find your starting point.
                    </span>
                    <p className="text-sm sm:text-[16px] text-gray-400 mt-2 sm:text-left">
                        Using the industry standard equation for calculating
                        basal metabolic rate, Mifflin-St Jeor, use our
                        calculator to find your recommended daily caloric intake
                        depending on your goals.
                    </p>
                </div>
            </div>

            {/* PLAN */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[890px]">
                <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                    <Dumbbell size={120} />
                </div>
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold sm:text-2xl">PLAN</h2>
                    <span className="text-sm sm:text-xl text-amber-300">
                        Take control of your workouts.
                    </span>
                    <p className="text-sm sm:text-[16px] text-gray-400 sm:text-left">
                        Search through our comprehensive list of training plans
                        and pick one that is suited for your standards. Review
                        others&apos; training plans and create your own!
                    </p>
                </div>
            </div>

            {/* TRACK */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 items-center max-w-[890px]">
                <div className="flex justify-center items-center p-2 bg-indigo-600 w-[120px] h-[120px] sm:h-32 sm:w-32 rounded-xl">
                    <FileBarChart size={120} />
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold sm:text-2xl">TRACK</h2>
                    <span className="text-sm sm:text-xl text-amber-300">
                        Add success to your to do list.
                    </span>
                    <p className="text-sm sm:text-[16px] text-gray-400 sm:text-left">
                        Keep track of your nutritional intake and exercise with
                        our journal that is simple and easy to use. Training
                        plans can be easily added to the journal for tracking.
                    </p>
                </div>
            </div>
        </section>
    );
}
