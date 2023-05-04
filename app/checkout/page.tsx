"use client";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PreviewPage() {
    const router = useRouter();
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get("success")) {
            console.log(
                "Order placed! You will receive an email confirmation."
            );
        }

        if (query.get("canceled")) {
            console.log(
                "Order canceled -- continue to shop around and checkout when you’re ready."
            );
        }
    }, []);

    const handleCheckOut = async () => {
        try {
            const res = await axios.post("/api/checkout_sessions");
            router.push(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form>
            <section>
                <button onClick={handleCheckOut} type="button" role="link">
                    Checkout
                </button>
            </section>
        </form>
    );
}
