"use client";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

export default function CheckoutSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    const [subscription, setSubscription] = useState({
        expirationDate: "",
        lastPaymentDate: "",
        userId: "",
    });

    useEffect(() => {
        const checkForPayment = async () => {
            const res = await axios.put("/api/subscriptions", { sessionId });

            if (res.status === 200) {
                setSubscription(res.data.subscription);
            }
        };
        checkForPayment();
    }, []);

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Checkout Success</h1>
            </header>

            <section className="flex flex-col gap-2">
                <header>
                    <h2 className="text-2xl text-amber-400 font-semibold">
                        Order Details
                    </h2>
                </header>

                <section className="flex flex-col">
                    <h3 className="font-semibold text-lg">Session #</h3>
                    <p className="break-words">{sessionId?.substring(8)}</p>
                </section>

                <section className="flex gap-2">
                    <h3 className="font-semibold text-lg">Payment Status: </h3>
                    <p
                        className={`text-lg font-semibold ${
                            subscription.userId != ""
                                ? `text-green-400`
                                : `text-blue-400`
                        }`}
                    >
                        {subscription.userId != ""
                            ? "Success"
                            : "Pending Payment"}
                    </p>
                </section>

                {subscription.userId != "" && (
                    <section className="sm:flex sm:gap-2 sm:items-center font-semibold text-lg">
                        <h3 className="">Payment Received:</h3>

                        <p className="text-green-400">
                            {moment(subscription.lastPaymentDate).format("LL")}
                        </p>
                    </section>
                )}
            </section>
        </main>
    );
}
