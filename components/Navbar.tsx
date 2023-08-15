"use client";
import { Shield, Target } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import NavbarMobile from "./NavbarMobile";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
    const [calorieGoal, setCalorieGoal] = useState(2000);

    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-indigo-600";

    useEffect(() => {
        async function getCalorieGoal() {
            try {
                const res = await axios.get("/api/calorie_goal");
                if (res.status === 200) {
                    console.log(calorieGoal);
                    setCalorieGoal(res.data.goal);
                }
            } catch (error) {
                console.error();
            }
        }

        getCalorieGoal();
    }, []);

    return (
        <>
            <nav className="relative h-16 bg-[#172554] text-white py-6 px-2 sm:px-6 flex justify-between items-center w-full top-0 left-0 z-[999]">
                <header className="w-full flex gap-5 items-center justify-between sm:justify-start">
                    <Link
                        className="hover:underline font-medium flex gap-2 items-center"
                        href="/"
                    >
                        <Shield size={32} />
                        <h1 className="text-2xl lg:3xl font-bold">FitHeroes</h1>
                    </Link>
                    {user && <Link href="/calculator" className="group flex flex-col gap-2 hover:underline">
                        <span className="flex gap-1 items-center text-xs sm:text-sm">
                            <Target color="orange" size={20}/>
                            Calorie Goal - {calorieGoal} kCal
                        </span>
                    </Link>}
                </header>

                {!user && (<Link className="text-white bg-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-700" href={"/login"}>Login</Link>)}

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
            {user && <NavbarMobile />}
        </>
    );
};

export default Navbar;
