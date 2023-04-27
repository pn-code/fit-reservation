import { Shield } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/app-beta";

const Navbar = async () => {
    const user = await currentUser();

    return (
        <nav className="h-[100px] bg-[#172554] text-white py-6 px-6 flex justify-between items-center w-full top-0 left-0 z-50">
            <header>
                <Link
                    className="hover:underline font-medium flex gap-2 items-center"
                    href="/dashboard"
                >
                    <Shield size={40} />
                    <h1 className="text-3xl font-bold ">FitHeroes</h1>
                </Link>
            </header>

            {user && (
                <ul className="flex gap-4">
                    <Link
                        className="hover:underline font-medium"
                        href="/dashboard"
                    >
                        Dashboard
                    </Link>
                    <Link
                        className="hover:underline font-medium"
                        href="/calculator"
                    >
                        Calculator
                    </Link>
                    <Link
                        className="hover:underline font-medium"
                        href="/tracker/overview"
                    >
                        Tracker
                    </Link>
                    <Link
                        className="hover:underline font-medium"
                        href="/profile"
                    >
                        Profile
                    </Link>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
