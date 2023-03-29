import React from "react";

const CalculatorModal = () => {
    return (
        <form>
            {/* Unit Button Sections */}
            <section>
                <button>US Units</button>
                <button>Metric Units</button>
            </section>

            {/* Input Section */}
            <section>
                <div>
                    <label htmlFor="">Age</label>
                    <input type="text" />
                </div>

                <div>
                    <label>Gender</label>
                    <input type="radio" />
                    <label htmlFor="">male</label>
                    <input type="radio" />
                    <label htmlFor="">female</label>
                </div>

                <div>
                    <label htmlFor="">Height</label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Weight</label>
                    <input type="text" />
                </div>

                <div>
                    <label htmlFor="">Activity Level</label>
                    <select name="" id="">
                        <option value="">SELECT AN OPTION</option>
                        <option value={1.2}>little to no exercise</option>
                        <option value={1.375}>light exercise 1-3 days/week</option>
                        <option value={1.55}>moderate exercise 3-5 days/week</option>
                        <option value={1.725}>hard exercise 6-7 days/week</option>
                        <option value={1.9}>very hard exercise & physical job OR 2x training</option>
                    </select>
                </div>
            </section>

            {/* Action Buttons Section */}
            <section>
                <button>Calculate</button>
                <button>Apply to Profile</button>
            </section>

            {/* Display Calories Section */}
            <section>

            </section>
        </form>
    );
};

export default CalculatorModal;
