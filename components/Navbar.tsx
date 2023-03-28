import React from "react";
import Link from "next/link";

const Navbar = () => {
    const navigationLinks = ["home", "calculator", "tracker", "profile"];
    return (
        <nav className="flex justify-between my-6">
            <h1>FitHeroes</h1>
            <ul className="flex gap-4">
                {navigationLinks.map((link) => (
                    <Link className="hover:underline" href={`/${link}`}>{link}</Link>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
