"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StripeCheckOutButton() {
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
        <button
            onClick={handleCheckOut}
            className="rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-white/90 hover:text-white font-semibold"
        >
            Upgrade
        </button>
    );
}
