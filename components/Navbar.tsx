"use client";
import {
    Calculator,
    ClipboardSignature,
    LayoutDashboard,
    Menu,
    Shield,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-amber-300";

    return (
        <>
            <nav className="relative h-[100px] bg-[#172554] text-white py-6 px-6 flex justify-between items-center w-full top-0 left-0 z-50">
                <header>
                    <Link
                        className="hover:underline font-medium flex gap-2 items-center"
                        href="/dashboard"
                    >
                        <Shield size={40} />
                        <h1 className="text-3xl font-bold ">FitHeroes</h1>
                    </Link>
                </header>

                <button
                    onClick={() => setOpenMobileNavbar((prev) => !prev)}
                    type="button"
                    className="sm:hidden p-2 hover:bg-blue-900 rounded-lg"
                >
                    {openMobileNavbar ? <X /> : <Menu />}
                </button>

                {/* Navbar on medium to larger devices */}
                <ul className="hidden sm:flex sm:gap-4">
                    <Link
                        className={`group relative ${
                            pathname === "/dashboard" ? currentPathStyles : ""
                        }`}
                        href="/dashboard"
                    >
                        <LayoutDashboard className="text-white/90 hover:text-white" />
                        <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-8 top-8">
                            Dashboard
                        </span>
                    </Link>
                    <Link
                        className={`group relative ${
                            pathname === "/calculator" ? currentPathStyles : ""
                        }`}
                        href="/calculator"
                    >
                        <Calculator className="text-white/90 hover:text-white" />
                        <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-7 top-8">
                            Calculator
                        </span>
                    </Link>
                    <Link
                        className={`group relative ${
                            pathname === "/tracker/overview" ||
                            pathname === "/tracker/exercise" ||
                            pathname === "/tracker/nutrition"
                                ? currentPathStyles
                                : ""
                        }`}
                        href="/tracker/overview"
                    >
                        <ClipboardSignature className="text-white/90 hover:text-white" />
                        <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                            Tracker
                        </span>
                    </Link>
                    <Link
                        className={`group relative ${
                            pathname === "/profile" ? currentPathStyles : ""
                        }`}
                        href="/profile"
                    >
                        <User className="text-white/90 hover:text-white" />
                        <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                            Profile
                        </span>
                    </Link>
                </ul>
            </nav>

            {/* Mobile Navbar */}
            {openMobileNavbar && (
                <section className="absolute h-[87%] w-full bg-black flex items-center justify-center flex-col pb-32 text-white font-semibold text-3xl">
                    <section className="flex flex-col gap-8">
                        <Link
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/dashboard"
                        >
                            <LayoutDashboard
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                Dashboard
                            </span>
                        </Link>
                        <Link
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/calculator"
                        >
                            <Calculator
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                Calculator
                            </span>
                        </Link>
                        <Link
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/tracker/overview"
                        >
                            <ClipboardSignature
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                Track Progress
                            </span>
                        </Link>
                        <Link
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/profile"
                        >
                            <User
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                View Profile
                            </span>
                        </Link>
                    </section>
                </section>
            )}
        </>
    );
};

export default Navbar;
