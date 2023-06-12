"use client";
import {
    Calculator,
    ClipboardSignature,
    LayoutDashboard,
    Menu,
    Rocket,
    Shield,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

const Navbar = () => {
    const [openMobileNavbar, setOpenMobileNavbar] = useState(false);
    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-amber-300";

    return (
        <>
            <nav className="relative h-[82px] bg-[#172554] text-white py-6 px-2 sm:px-6 flex justify-between items-center w-full top-0 left-0 z-50">
                <header>
                    <Link
                        className="hover:underline font-medium flex gap-2 items-center"
                        href="/"
                    >
                        <Shield size={40} />
                        <h1 className="text-3xl font-bold">FitHeroes</h1>
                    </Link>
                </header>

                {user && (
                    <button
                        onClick={() => setOpenMobileNavbar((prev) => !prev)}
                        type="button"
                        className="sm:hidden p-2 hover:bg-blue-900 rounded-lg"
                    >
                        {openMobileNavbar ? <X /> : <Menu />}
                    </button>
                )}

                {/* Navbar on medium to larger devices */}
                {user && (
                    <ul className="hidden sm:flex sm:gap-4">
                        <Link
                            className={`group relative ${
                                pathname === "/dashboard"
                                    ? currentPathStyles
                                    : ""
                            }`}
                            passHref={true}
                            href="/dashboard"
                        >
                            <LayoutDashboard className="text-white/90 hover:text-white" />
                            <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-8 top-8">
                                Dashboard
                            </span>
                        </Link>
                        <Link
                            className={`group relative ${
                                pathname === "/calculator"
                                    ? currentPathStyles
                                    : ""
                            }`}
                            passHref={true}
                            href="/calculator"
                        >
                            <Calculator className="text-white/90 hover:text-white" />
                            <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-7 top-8">
                                Calculator
                            </span>
                        </Link>
                        <Link
                            className={`group relative ${
                                pathname?.includes("/journal")
                                    ? currentPathStyles
                                    : ""
                            }`}
                            passHref={true}
                            href="/journal"
                        >
                            <ClipboardSignature className="text-white/90 hover:text-white" />
                            <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                                Journal
                            </span>
                        </Link>
                        {user != undefined && (
                            <Link
                                className={`group relative ${
                                    pathname?.includes("/plans")
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href={`/plans/${user?.id}`}
                            >
                                <Rocket className="text-white/90 hover:text-white" />
                                <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-3 top-8">
                                    Plans
                                </span>
                            </Link>
                        )}
                        {user != undefined && (
                            <Link
                                className={`group relative ${
                                    pathname?.includes("/profile")
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href={`/profile/${user?.id}`}
                            >
                                <User className="text-white/90 hover:text-white" />
                                <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                                    Profile
                                </span>
                            </Link>
                        )}
                    </ul>
                )}
            </nav>

            {/* Mobile Navbar */}
            {openMobileNavbar && user != undefined && (
                <section className="absolute h-[300%] w-full z-10 bg-black flex items-center pt-[25%] flex-col sm:pb-32 text-white font-semibold text-3xl">
                    <section className="flex flex-col gap-8">
                        <Link
                            onClick={() => setOpenMobileNavbar(false)}
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/dashboard"
                            passHref={true}
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
                            onClick={() => setOpenMobileNavbar(false)}
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/calculator"
                            passHref={true}
                        >
                            <Calculator
                                onClick={() => setOpenMobileNavbar(false)}
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                Calculator
                            </span>
                        </Link>
                        <Link
                            onClick={() => setOpenMobileNavbar(false)}
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href="/journal"
                            passHref={true}
                        >
                            <ClipboardSignature
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                Journal
                            </span>
                        </Link>
                        <Link
                            onClick={() => setOpenMobileNavbar(false)}
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href={`/plans/${user?.id}`}
                            passHref={true}
                        >
                            <Rocket
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                View Plans
                            </span>
                        </Link>
                        <Link
                            onClick={() => setOpenMobileNavbar(false)}
                            className="flex gap-4 items-center hover:text-white text-white/90 group"
                            href={`/profile/${user?.id}`}
                            passHref={true}
                        >
                            <User
                                className="text-white/90 group-hover:text-indigo-500"
                                size={45}
                            />
                            <span className="border-b-4 border-b-transparent group-hover:border-b-indigo-500">
                                My Profile
                            </span>
                        </Link>
                    </section>
                </section>
            )}
        </>
    );
};

export default Navbar;
