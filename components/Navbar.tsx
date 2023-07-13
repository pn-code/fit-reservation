"use client";
import { Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-indigo-600";

    return (
        <>
            <nav className="relative h-16 bg-[#172554] text-white py-6 px-2 sm:px-6 flex justify-between items-center w-full top-0 left-0 z-[999]">
                <header>
                    <Link
                        className="hover:underline font-medium flex gap-2 items-center"
                        href="/"
                    >
                        <Shield size={40} />
                        <h1 className="text-3xl font-bold">FitHeroes</h1>
                    </Link>
                </header>

                {/* Navbar on medium to larger devices */}
                {user && (
                    <ul className="hidden sm:flex sm:gap-4 text-[16px]">
                        <li>
                            <Link
                                className={`group relative hover:text-gray-200 ${
                                    pathname === "/dashboard"
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`group relative hover:text-gray-200 ${
                                    pathname === "/calculator"
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href="/calculator"
                            >
                                Calculator
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`group relative hover:text-gray-200 ${
                                    pathname?.includes("/journal")
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href="/journal"
                            >
                                Journal
                            </Link>
                        </li>
                        {user != undefined && (
                            <li>
                                <Link
                                    className={`group relative hover:text-gray-200 ${
                                        pathname?.includes("/plans")
                                            ? currentPathStyles
                                            : ""
                                    }`}
                                    passHref={true}
                                    href={`/plans/${user?.id}`}
                                >
                                    Plans
                                </Link>
                            </li>
                        )}
                        {user != undefined && (
                            <li>
                                <Link
                                    className={`group relative hover:text-gray-200 ${
                                        pathname?.includes("/profile")
                                            ? currentPathStyles
                                            : ""
                                    }`}
                                    passHref={true}
                                    href={`/profile/${user?.id}`}
                                >
                                    Profile
                                </Link>
                            </li>
                        )}
                    </ul>
                )}
            </nav>

            {/* Mobile Navbar */}
            <NavbarMobile />
        </>
    );
};

export default Navbar;
