import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { currentUser } from "@clerk/nextjs/app-beta";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

if (!STRIPE_SECRET_KEY) {
    console.error("STRIPE SECRET KEY NOT FOUND");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});

export async function POST() {
    const user = await currentUser();
    const headersList = headers();
    const currentDomain = headersList.get("origin");

    if (user) {
        try {
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        price: "price_1N3nl0HrkpXvdH0sWJTaKJhq",
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: `${currentDomain}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${currentDomain}/checkout/canceled`,
                metadata: {
                    userId: user?.id,
                },
            });

            return NextResponse.json(session.url);
        } catch (error) {
            return NextResponse.json(error);
        }
    }
}
