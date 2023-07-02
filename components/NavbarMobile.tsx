import { useUser } from "@clerk/nextjs";
import {
    Calculator,
    ClipboardSignature,
    HomeIcon,
    Rocket,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavbarMobile() {
    const user = useUser().user;

    const pathname = usePathname();
    const currentPathStyles = "border-amber-300";
    return (
        <nav className="sm:hidden fixed bottom-0 w-full bg-gray-900 z-[999] h-16">
            {user && <ul className="flex justify-between py-3">
                <Link
                    className="flex flex-col items-center gap-1 flex-1"
                    passHref={true}
                    href="/dashboard"
                >
                    <HomeIcon
                        className={`group relative text-white/90 hover:text-white border-t-2 ${
                            pathname === "/dashboard" ? currentPathStyles : "border-t-transparent"
                        }`}
                    />
                    <span className="text-xs text-white">Home</span>
                </Link>
                <Link
                    className="flex flex-col items-center gap-1 flex-1"
                    passHref={true}
                    href="/calculator"
                >
                    <Calculator
                        className={`group relative text-white/90 hover:text-white border-t-2 ${
                            pathname === "/calculator" ? currentPathStyles : "border-t-transparent"
                        }`}
                    />
                    <span className="text-xs text-white">Calculate</span>
                </Link>
                <Link
                    className="flex flex-col items-center gap-1 flex-1"
                    passHref={true}
                    href="/journal"
                >
                    <ClipboardSignature
                        className={`group relative text-white/90 hover:text-white border-t-2 ${
                            pathname === "/journal"
                                ? currentPathStyles
                                : "border-t-transparent"
                        }`}
                    />
                    <span className="text-xs text-white">Journal</span>
                </Link>
                {user != undefined && (
                    <Link
                        className="flex flex-col items-center gap-1 flex-1"
                        passHref={true}
                        href={`/plans/${user?.id}`}
                    >
                        <Rocket
                            className={`group relative text-white/90 hover:text-white border-t-2 ${
                                pathname.includes("/plans")
                                    ? currentPathStyles
                                    : "border-t-transparent"
                            }`}
                        />
                        <span className="text-xs text-white">Plans</span>
                    </Link>
                )}
                {user != undefined && (
                    <Link
                        className="flex flex-col items-center gap-1 flex-1"
                        passHref={true}
                        href={`/profile/${user?.id}`}
                    >
                        <User
                            className={`group relative text-white/90 hover:text-white border-t-2 ${
                                pathname.includes("/profile")
                                    ? currentPathStyles
                                    : "border-t-transparent"
                            }`}
                        />
                        <span className="text-xs text-white">Profile</span>
                    </Link>
                )}
            </ul>}
        </nav>
    );
}
