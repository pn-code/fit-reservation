"use client";
import axios from "axios";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    useEffect(() => {
        const checkForPayment = async () => {
            const res = await axios.put("/api/subscriptions", { sessionId });

            console.log(res);
        };
        checkForPayment();
    }, []);

    return <div>Success</div>;
}
