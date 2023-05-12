"use client";

import axios from "axios";
import { Edit, X } from "lucide-react";
import { useState } from "react";

export default function UpdateUsernameComponent() {
    const [isUpdating, setIsUpdating] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const updateUserNames = async () => {
        await axios.put("/api/users/full_name", {
            firstName,
            lastName,
        });
    };

    return (
        <section className="flex flex-col gap-4 w-full">
            <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <section>
                    <h2 className="text-2xl font-semibold text-amber-300">
                        Update Name
                    </h2>
                    <p>In case your name does not look right.</p>
                </section>
                <button
                    onClick={() => setIsUpdating((prev) => !prev)}
                    className="text-gray-100 group flex cursor-pointer items-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-md justify-center"
                >
                    <div className="flex gap-4 justify-center items-center">
                        <Edit />
                        {!isUpdating ? <h3>Update Name</h3> : <h3>Close</h3>}
                    </div>
                </button>
            </section>

            {isUpdating && (
                <section className="flex flex-col gap-4 w-full">
                    <section className="flex gap-2">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            min={1}
                            max={30}
                            type="text"
                            id="firstName"
                            value={firstName}
                        />
                    </section>
                    <section className="flex gap-2">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            min={1}
                            max={30}
                            type="text"
                            id="lastName"
                            value={lastName}
                        />
                    </section>
                    <button
                        onClick={updateUserNames}
                        className="sm:w-72 text-gray-100 group flex cursor-pointer py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md justify-center"
                    >
                        Submit New Name
                    </button>
                </section>
            )}
        </section>
    );
}
