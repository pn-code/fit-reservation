"use client";
import { useState } from "react";
import axios from "axios";

function RegisterPage() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [formError, setFormError] = useState("");

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            setFormError("Please fill in all fields");
            return;
        }

        // Submit form data to backend
        try {
            const response = await axios.post("/api/users/register", {
                fullName,
                email,
                password,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#F5F5F5]">
            <form
                className="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md"
                onSubmit={(e) => handleRegister(e)}
            >
                <h2 className="text-2xl font-bold text-center mb-4 text-blue-500">
                    Create an account
                </h2>
                {formError && (
                    <p className="text-red-500 text-sm mb-4">{formError}</p>
                )}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="fullName"
                    >
                        Full Name
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <section className="flex gap-2 mt-4">
                        <input
                            onClick={() => setShowPassword((show) => !show)}
                            checked={showPassword}
                            id="show-password"
                            type="checkbox"
                        />
                        <label htmlFor="show-password">Show Password</label>
                    </section>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
