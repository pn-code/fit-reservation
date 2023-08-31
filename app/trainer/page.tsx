import React from "react";
import ClientCard from "../../components/trainer/ClientCard";
import Link from "next/link";

export default function Trainer() {
    return (
        <main className="w-full min-h-[calc(100vh-180px)] mb-12 bg-gray-900 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 lg:px-[20%] text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <section className="flex gap-2 flex-col">
                    <h1 className="text-3xl">Your Clients</h1>
                    <span className="text-amber-300 text-[16px]">
                        3/3 clients
                    </span>
                </section>

                <section className="flex gap-2">
                    <Link
                        href=""
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    >
                        Upgrade
                    </Link>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md">
                        Add Client
                    </button>
                </section>
            </header>

            <ClientCard />
            <ClientCard />
            <ClientCard />
        </main>
    );
}
