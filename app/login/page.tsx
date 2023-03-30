"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });

      const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email || !password) {
            setFormErrors({
                email: email ? "" : "Email is required",
                password: password ? "" : "Password is required",
            });
            return;
        }
        // TODO: Submit form data to server
        router.push("/");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Sign In</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        className={`appearance-none border ${
                            formErrors.email
                                ? "border-red-500"
                                : "border-gray-200"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {formErrors.email && (
                        <p className="text-red-500 text-xs italic">
                            {formErrors.email}
                        </p>
                    )}
                </div>
                <div className="mb-6">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className={`appearance-none border ${
                            formErrors.password
                                ? "border-red-500"
                                : "border-gray-200"
                        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {formErrors.password && (
                        <p className="text-red-500 text-xs italic">
                            {formErrors.password}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        href="/forgotpassword"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignInPage;
