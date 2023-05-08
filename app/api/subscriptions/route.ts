import { currentUser } from "@clerk/nextjs/app-beta";
import Stripe from "stripe";
import { prisma } from "../../../lib/client";
import { NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY as string;

if (!STRIPE_SECRET_KEY) {
	console.error("STRIPE SECRET KEY NOT FOUND");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: "2022-11-15",
});

function checkIfRecentlyPurchased(purchaseDate: Date) {
	// Get the current date in the local time zone
	const currentDate = new Date();

	// Check if the purchase date is on the same day as the current date
	if (
		purchaseDate.getFullYear() === currentDate.getFullYear() &&
		purchaseDate.getMonth() === currentDate.getMonth() &&
		purchaseDate.getDate() === currentDate.getDate()
	) {
		// The purchase date is the same as the current date, so it's still recent
		return true;
	}

	// The purchase date is on a different day than the current date, so it's not recent
	return false;
}

export async function POST(req: Request) {
	const user = await currentUser();
	const data = await req.json();

	if (!data) return NextResponse.error();

	// Check if session is paid...
	const sessionData = await stripe.checkout.sessions.retrieve(data.sessionId);

	// Check if sessionData/payment was recent
	const purchaseDate = new Date(sessionData.created * 1000);

	if (!checkIfRecentlyPurchased(purchaseDate)) {
		return NextResponse.json({ message: "Old purchase detected" });
	}

	if (sessionData.payment_status === "paid") {
		try {
			if (user) {
				const subscription = await prisma.subscription.create({
					data: {
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
