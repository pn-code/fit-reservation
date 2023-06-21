"use client";
import {
    Calculator,
    ClipboardSignature,
    LayoutDashboard,
    Rocket,
    Shield,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import NavbarMobile from "./NavbarMobile";

const Navbar = () => {
    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-amber-300";

    return (
        <>
            <nav className="relative h-[82px] bg-[#172554] text-white py-6 px-2 sm:px-6 flex justify-between items-center w-full top-0 left-0 z-[999]">
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
            <NavbarMobile />
        </>
    );
};

export default Navbar;
