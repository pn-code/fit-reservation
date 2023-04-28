import {
    Calculator,
    ClipboardSignature,
    LayoutDashboard,
    Shield,
    User,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
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

            <ul className="flex gap-4">
                <Link className="group relative" href="/dashboard">
                    <LayoutDashboard className="text-white/90 hover:text-white" />
                    <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-8 top-8">
                        Dashboard
                    </span>
                </Link>
                <Link className="group relative" href="/calculator">
                    <Calculator className="text-white/90 hover:text-white" />
                    <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-7 top-8">
                        Calculator
                    </span>
                </Link>
                <Link
                    className="group relative"
                    href="/tracker/overview"
                >
                    <ClipboardSignature className="text-white/90 hover:text-white" />
                    <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                        Tracker
                    </span>
                </Link>
                <Link className="group relative" href="/profile">
                    <User className="text-white/90 hover:text-white" />
                    <span className="bg-indigo-700 py-0.5 px-2 rounded-lg hidden group-hover:flex text-sm font-semibold absolute -left-4 top-8">
                        Profile
                    </span>
                </Link>
            </ul>
        </nav>
    );
};

export default Navbar;
