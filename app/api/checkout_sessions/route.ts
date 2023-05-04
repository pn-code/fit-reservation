import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST() {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2022-11-15",
    });

    const headersList = headers();
    const currentDomain = headersList.get("origin");

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1N3nl0HrkpXvdH0sWJTaKJhq",
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${currentDomain}/?success=true`,
            cancel_url: `${currentDomain}/?canceled=true`,
        });
        return NextResponse.json(session.url);
    } catch (error) {
        return NextResponse.json(error);
    }
}
