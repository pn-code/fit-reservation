import React from "react";

const Tracker = () => {
    return (
        <div className="mt-[6%] w-full bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
            <header>
                <h1 className="text-3xl font-bold border-b-2 border-b-[#F15B2A]">
                    Track Your Progress
                </h1>
            </header>

            {/* Nutrition */}
            <section className="bg-gray-100 text-black rounded-sm">
                <header>
                    <h2 className="text-lg font-semibold underline mb-2 ">
                        Nutrition
                    </h2>
                    <form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
                        <label htmlFor="">Food</label>
                        <input type="text" />
                        <label htmlFor="">Calories</label>
                        <input type="text" />
                        <button className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md">
                            Add Item
                        </button>
                    </form>
                </header>
            </section>

            {/* Exercise */}
            <section className="bg-gray-100 text-black rounded-sm">
                <header>
                    <h2 className="text-lg font-semibold underline mb-2 ">
                        Exercise
                    </h2>
                    <form className="flex flex-col gap-4 md:flex-row bg-gray-100 py-2 md:items-center">
                        <label htmlFor="">Exercise</label>
                        <input type="text" />
                        <label htmlFor="">Weight</label>
                        <input className="w-16" type="text" />
                        <label htmlFor="">Reps</label>
                        <input className="w-16" type="text" />
                        <button className="bg-[#05204A] text-[#fafafa] px-4 py-2 rounded-md">
                            Add Item
                        </button>
                    </form>
                </header>
            </section>
        </div>
    );
};

export default Tracker;
