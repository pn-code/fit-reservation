import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between my-6">
            <h1>FitHeroes</h1>
            <ul className="flex gap-4">
                    <Link className="hover:underline" href="/">Home</Link>
                    <Link className="hover:underline" href="/calculator">Calculator</Link>
                    <Link className="hover:underline" href="/tracker">Tracker</Link>
                    <Link className="hover:underline" href="/profile">Profile</Link>
            </ul>
        </nav>
    );
};

export default Navbar;
