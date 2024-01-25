"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Gauge, PenLine, Target, User } from "lucide-react";
import { useUser } from "@clerk/nextjs";

import NavbarMobile from "@/components/navigation/NavbarMobile";
import LogoImg from "@/public/assets/logo.png";
import Image from "next/image";

const Navbar = () => {
    const [calorieGoal, setCalorieGoal] = useState<number | "loading">(
        "loading"
    );

    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-b-2 border-slate-900";

    useEffect(() => {
        async function getCalorieGoal() {
            try {
                const res = await axios.get("/api/calorie_goal");
                if (res.status === 200) {
                    setCalorieGoal(res.data.goal);
                }
            } catch (error: any) {
                console.error(error.message);
            }
        }

        getCalorieGoal();
    }, []);

    return (
        <>
            <nav className="relative h-16 bg-white text-slate-900 py-6 px-4 md:px-[4%] flex justify-center md:justify-between md:items-center w-full top-0 left-0 z-[999]">
                <header className="w-full flex gap-5 justify-center md:items-center md:justify-between lg:justify-start">
                    <Link className="flex gap-2 items-center" href="/">
                        <Image
                            width={200}
                            height={20}
                            src={LogoImg}
                            alt="Fit Heroes"
                        />
                    </Link>
                </header>

                {!user && (
                    <Link className="btn btn--primary" href={"/login"}>
                        Join
                    </Link>
                )}

                {/* Navbar on medium to larger devices */}
                {user && (
                    <ul className="hidden lg:flex lg:gap-6 text-[14px] lg:text-[16px] font-semibold tracking-tighter">
                        <li>
                            <Link
                                className={`flex gap-2 group relative hover:text-slate-500 items-center ${
                                    pathname === "/dashboard"
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href="/dashboard"
                            >
                                <Gauge size={18} /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`flex gap-2 group relative hover:text-slate-500 items-center ${
                                    pathname?.includes("/journal")
                                        ? currentPathStyles
                                        : ""
                                }`}
                                passHref={true}
                                href="/journal"
                            >
                                <PenLine size={18} /> Journal
                            </Link>
                        </li>
                        {user != undefined && (
                            <li>
                                <Link
                                    className={`flex gap-2 group relative hover:text-slate-500 items-center ${
                                        pathname?.includes("/plans")
                                            ? currentPathStyles
                                            : ""
                                    }`}
                                    passHref={true}
                                    href={`/plans/${user?.id}`}
                                >
                                    <Dumbbell size={18} />
                                    Plans
                                </Link>
                            </li>
                        )}
                        {user != undefined && (
                            <li>
                                <Link
                                    className={`flex gap-2 items-center group relative hover:text-slate-500 ${
                                        pathname?.includes("/profile")
                                            ? currentPathStyles
                                            : ""
                                    }`}
                                    passHref={true}
                                    href={`/profile/${user?.id}`}
                                >
                                    <User size={18} /> Profile
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
