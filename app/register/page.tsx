"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

function RegisterPage() {
    const nameRef = useRef<HTMLInputElement>();

    const router = useRouter();

    const NAME_REGEX = /^[a-zA-Z][a-zA-Z ]{2,28}[a-zA-Z]$/;
    const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const [fullName, setFullName] = useState("");
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    const [email, setEmail] = useState("");
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(false)

    // Autofocus on name when loaded.
    useEffect(() => {
        nameRef.current.focus();
    }, []);

    // Validate user's name
    useEffect(() => {
        const nameValidation = NAME_REGEX.test(fullName);
        setValidName(nameValidation);
    }, [fullName]);

    // Validate password
    useEffect(() => {
        const passwordValidation = PASSWORD_REGEX.test(password);
        setValidPassword(passwordValidation);
    }, [password]);

    // Clear out error message if user is making changes
    useEffect(() => {
        setErrorMessage("");
    }, [fullName, email, password]);

    useEffect(() => {
        if (registerSuccess) {
            router.push("/login")
        }
    }, [registerSuccess])

    const handleRegister = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (!validName || !email || !validPassword) {
            setErrorMessage(
                "Please fill in all fields with appropriate values."
            );
            return;
        }

        // Submit form data to backend
        try {
            const response = await axios.post("/api/users/register", {
                fullName,
                email,
                password,
            });
            if(response.status === 200) {
                setRegisterSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-[#F5F5F5]">
            <header>
                <h1 className="text-2xl font-bold text-center mb-4 text-blue-500">
                    Register
                </h1>

                {errorMessage && (
                    <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
                )}
                {registerSuccess && (
                    <p className="text-blue-500 text-sm mb-4">Register Success. Redirecting...</p>
                )}
            </header>

            <form
                className="bg-white rounded px-8 pt-6 pb-8 mb-4 shadow-md w-[300px]"
                autoComplete="off"
                onSubmit={(e) => handleRegister(e)}
            >
                <section className="mb-4">
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
                        onFocus={() => setNameFocus(true)}
                        onBlur={() => setNameFocus(false)}
                        required
                    />
                    <p
                        className={
                            nameFocus && fullName && !validName
                                ? "text-sm text-gray-500 mt-2"
                                : "absolute left-[-1000px]"
                        }
                    >
                        Must begin with a letter and 4-30 characters in length.
                    </p>
                </section>
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
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p
                        id="emailnote"
                        className={
                            emailFocus && email
                                ? "text-sm text-gray-500 mt-2"
                                : "absolute left-[-1000px]"
                        }
                    >
                        Please enter a valid email.
                    </p>
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
                        required
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                    />
                    <p
                        className={
                            passwordFocus && password && !validPassword
                                ? "text-sm text-gray-500 mt-2"
                                : "absolute left-[-1000px]"
                        }
                    >
                        Please enter at least 8 characters, 1 uppercase, 1
                        lowercase, 1 number, and 1 special character.
                    </p>
                    <section className="flex gap-2 mt-4">
                        <input
                            onChange={() => setShowPassword((show) => !show)}
                            checked={showPassword}
                            id="show-password"
                            type="checkbox"
                        />
                        <label htmlFor="show-password">Show Password</label>
                    </section>
                </div>

                <section className="flex flex-col gap-4">
                    <button
                        disabled={!validName || !email || !validPassword}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed"
                        type="submit"
                    >
                        Register
                    </button>
                    <span>
                        Already have an account?{" "}
                        <Link className="underline" href="/login">
                            Login.
                        </Link>
                    </span>
                </section>
            </form>
        </section>
    );
}

export default RegisterPage;
