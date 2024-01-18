import { Dumbbell, Gauge, PenLine, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useUser } from "@clerk/nextjs";

export default function NavbarMobile() {
    const user = useUser().user;
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 w-full bg-white z-[999] h-16 px-1">
            {user && (
                <ul className="flex justify-between py-1.5 items-center">
                    <Link
                        className={`flex flex-col items-center gap-1 flex-1 py-1 border ${
                            pathname === "/dashboard"
                                ? "bg-primary text-white border-primary"
                                : "text-secondary border-secondary"
                        }`}
                        passHref={true}
                        href="/dashboard"
                    >
                        <Gauge className={"group relative"} />
                        <span className="text-xs">Dashboard</span>
                    </Link>
                    <Link
                        className={`flex flex-col items-center gap-1 flex-1 py-1 border-t border-b ${
                            pathname === "/journal"
                                ? "bg-primary text-white border-primary"
                                : "text-secondary border-secondary"
                        }`}
                        passHref={true}
                        href="/journal"
                    >
                        <PenLine className={`group relative`} />
                        <span className="text-xs">Journal</span>
                    </Link>
                    {user != undefined && (
                        <Link
                            className={`flex flex-col items-center gap-1 flex-1 py-1 border ${
                                pathname?.includes("/plans")
                                    ? "bg-primary text-white border-primary"
                                    : "text-secondary border-secondary"
                            }`}
                            passHref={true}
                            href={`/plans/${user?.id}`}
                        >
                            <Dumbbell className={`group relative`} />
                            <span className="text-xs">Plans</span>
                        </Link>
                    )}
                    {user != undefined && (
                        <Link
                            className={`flex flex-col items-center gap-1 flex-1 py-1 border-r border-t border-b ${
                                pathname?.includes("/profile")
                                    ? "bg-primary text-white border-primary"
                                    : "text-secondary border-secondary"
                            }`}
                            passHref={true}
                            href={`/profile/${user?.id}`}
                        >
                            <User className={`group relative`} />
                            <span className="text-xs">Profile</span>
                        </Link>
                    )}
                </ul>
            )}
        </nav>
    );
}
