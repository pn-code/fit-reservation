import { currentUser } from "@clerk/nextjs/app-beta";
import Stripe from "stripe";
import { prisma } from "../../../lib/client";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
});

export async function PUT(req: Request) {
    const user = await currentUser();
    const data = await req.json();

    if (!data) return NextResponse.error();

    // Check if session is paid...
    const sessionData = await stripe.checkout.sessions.retrieve(data.sessionId);

    if (sessionData.payment_status === "paid") {
        try {
            if (user) {
                const currentDate = Date.now();
                const futureDate = new Date(
                    currentDate + 30 * 24 * 60 * 60 * 1000
                );

                const subscription = await prisma.subscription.upsert({
                    create: {
                        userId: user.id,
                        lastPaymentDate: new Date(),
                        expirationDate: futureDate,
                    },
                    update: {
                        userId: user.id,
                        lastPaymentDate: new Date(),
                        expirationDate: futureDate,
                    },
                    where: {
                        userId: user.id,
                    },
                });
                return NextResponse.json({ subscription });
            }
        } catch (error) {
            console.error(error);
            return NextResponse.error();
        }
    } else {
        console.error("Error. Payment not received.");
        return NextResponse.error();
    }
}
