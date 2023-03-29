"use client";
import React, { useState } from "react";

const CalculatorModal = () => {
    const [age, setAge] = useState(25);
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState({ feet: 5, inches: 10 });
    const [weight, setWeight] = useState(160);
    const [activity, setActivity] = useState(1.2);

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
                    <label htmlFor="age">Age</label>
                    <input
                        onChange={(e) => setAge(Number(e.target.value))}
                        value={age}
                        id="age"
                        type="number"
                    />
                </div>

                <div>
                    <label>Gender</label>
                    <input id="male" onClick={() => setGender("male")} name="gender" type="radio" />
                    <label htmlFor="male">male</label>
                    <input id="female" onClick={() => setGender("female")} value="female" name="gender" type="radio" />
                    <label htmlFor="female">female</label>
                </div>

                <div>
                    <label>Height</label>
                    <input
                        onChange={(e) =>
                            setHeight((height) => ({
                                ...height,
                                feet: Number(e.target.value),
                            }))
                        }
                        value={height.feet}
                        type="number"
                    />
                    <input
                        onChange={(e) =>
                            setHeight((height) => ({
                                ...height,
                                inches: Number(e.target.value),
                            }))
                        }
                        value={height.feet}
                        type="number"
                    />
                </div>

                <div>
                    <label htmlFor="weight">Weight</label>
                    <input
                        onChange={(e) => setWeight(Number(e.target.value))}
                        value={weight}
                        id="weight"
                        type="number"
                    />
                </div>

                <div>
                    <label htmlFor="activity">Activity Level</label>
                    <select
                        onChange={(e) => setActivity(Number(e.target.value))}
                        value={activity}
                        name="activity"
                        id="activity"
                    >
                        <option value={1.2}>little to no exercise</option>
                        <option value={1.375}>
                            light exercise 1-3 days/week
                        </option>
                        <option value={1.55}>
                            moderate exercise 3-5 days/week
                        </option>
                        <option value={1.725}>
                            hard exercise 6-7 days/week
                        </option>
                        <option value={1.9}>
                            very hard exercise & physical job OR 2x training
                        </option>
                    </select>
                </div>
            </section>

            {/* Action Buttons Section */}
            <section>
                <button>Calculate</button>
                <button>Apply to Profile</button>
            </section>

            {/* Display Calories Section */}
            <section></section>
        </form>
    );
};

export default CalculatorModal;
