import { useUser } from "@clerk/nextjs";
import { Dumbbell, Gauge, PenLine, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarMobile() {
    const user = useUser().user;
    const pathname = usePathname();
    const currentPathStyles = "bg-blue-600";

    return (
        <nav className="lg:hidden fixed bottom-0 w-full bg-gray-900 z-[999] h-16 border-t-2 border-indigo-900">
            {user && (
                <ul className="flex justify-between py-1.5 px-2 items-center">
                    <Link
                        className={`flex flex-col items-center gap-1 flex-1 rounded-md py-1 ${
                            pathname === "/dashboard"
                                ? "bg-blue-600"
                                : "border-t-transparent"
                        }`}
                        passHref={true}
                        href="/dashboard"
                    >
                        <Gauge
                            className={
                                "group relative text-white/90 hover:text-white"
                            }
                        />
                        <span className="text-xs text-white">Dashboard</span>
                    </Link>
                    <Link
                        className={`flex flex-col items-center gap-1 flex-1 rounded-md py-1 ${
                            pathname === "/journal"
                                ? "bg-blue-600"
                                : "border-t-transparent"
                        }`}
                        passHref={true}
                        href="/journal"
                    >
                        <PenLine
                            className={`group relative text-white/90 hover:text-white`}
                        />
                        <span className="text-xs text-white">Journal</span>
                    </Link>
                    {user != undefined && (
                        <Link
                            className={`flex flex-col items-center gap-1 flex-1 rounded-md py-1 ${
                                pathname?.includes("/plans")
                                    ? "bg-blue-600"
                                    : "border-t-transparent"
                            }`}
                            passHref={true}
                            href={`/plans/${user?.id}`}
                        >
                            <Dumbbell
                                className={`group relative text-white/90 hover:text-white`}
                            />
                            <span className="text-xs text-white">Plans</span>
                        </Link>
                    )}
                    {user != undefined && (
                        <Link
                            className={`flex flex-col items-center gap-1 flex-1 rounded-md py-1 ${
                                pathname?.includes("/profile")
                                    ? "bg-blue-600"
                                    : "border-t-transparent"
                            }`}
                            passHref={true}
                            href={`/profile/${user?.id}`}
                        >
                            <User
                                className={`group relative text-white/90 hover:text-white`}
                            />
                            <span className="text-xs text-white">Profile</span>
                        </Link>
                    )}
                </ul>
            )}
        </nav>
    );
}
