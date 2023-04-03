"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function RegisterPage() {
    const nameRef = useRef<HTMLInputElement>();
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const [fullName, setFullName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);


    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Autofocus on name when loaded.
    useEffect(() => {
        nameRef.current.focus();
    }, [])

    // Validate user's name
    useEffect(() => {
        const nameValidation = fullName.trim().length >= 4
        setValidName(nameValidation)
    }, [fullName])

    // Validate password
    useEffect(() => {
        const passwordValidation = PASSWORD_REGEX.test(password)
        setValidPassword(passwordValidation)
    }, [password])

    // Clear out error message if user is making changes
    useEffect(() => {
        setErrorMessage("")
    }, [fullName, email, password])


    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!fullName || !email || !password) {
            setErrorMessage("Please fill in all fields");
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
        <section className="flex flex-col items-center justify-center h-screen bg-[#F5F5F5]">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-500">
                Register
            </h1>

            {errorMessage && (
                <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <form
                className="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md"
                onSubmit={(e) => handleRegister(e)}
            >
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
                        ref={nameRef}
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="off"
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
                        autoComplete="off"
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
                        autoComplete="off"
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
        </section>
    );
}

export default RegisterPage;
