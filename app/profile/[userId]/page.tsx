import { Check } from "lucide-react";
import Link from "next/link";
import { SigmaSquare } from "lucide-react";

import SignOutButton from "@/components/profile/SignOutButton";
import { clerkClient, currentUser } from "@clerk/nextjs";
import StripeCheckOutButton from "@/components/profile/StripeCheckOutButton";
import UpdateUserComponent from "@/components/profile/UpdateUserComponent";
import { prisma } from "@/lib/client";

interface Props {
    params: {
        userId: string;
    };
}

export async function generateMetadata({ params }: Props) {
    const user = await clerkClient.users.getUser(params.userId);

    return {
        title: `${user?.firstName} ${user?.lastName} | FitHeroes`,
    };
}

async function ProfilePage({ params }: Props) {
    const user = await currentUser();
    const { userId } = params;

    const userOnProfile = await clerkClient.users.getUser(userId);
    const userIsSubscribed = await prisma.subscription.findFirst({
        where: { userId: userOnProfile.id },
    });

    return (
        <main className="w-full min-h-[calc(100vh-64px)] py-6 flex flex-col gap-4 px-1 lg:px-[4%]">
            <header className="bg-white border border-primary p-4 rounded-sm shadow-md flex justify-between">
                <h1 className="flex gap-2">
                    {`${userOnProfile?.firstName} ${userOnProfile?.lastName}`}
                    {userIsSubscribed && (
                        <span className="bg-primary h-9 w-9 rounded-full p-0.5 flex justify-center items-center">
                            <Check color="white" />
                        </span>
                    )}
                </h1>
                <SignOutButton />
            </header>

            {/* Upgrade Profile */}
            {!userIsSubscribed && userId === user?.id && (
                <section className="bg-white border border-primary p-4 rounded-sm shadow-md flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <section>
                        <h2 className="text-xl sm:text-2xl font-semibold text-secondary">
                            Upgrade account to premium
                        </h2>
                        <p>Get a cool verified check</p>
                    </section>
                    <StripeCheckOutButton />
                </section>
            )}

            <section className="bg-white border border-primary p-4 rounded-sm shadow-md flex justify-between">
                <section>
                    <h2 className="text-xl sm:text-2xl font-semibold text-primary">
                        Update Goals
                    </h2>
                    <p className="text-sm">Manage your goals</p>
                </section>
                <Link
                    className="btn bg-blue-500 hover:bg-blue-600 flex gap-2 text-white items-center"
                    href="/calculator"
                    passHref
                >
                    <SigmaSquare size={18} />
                    Calculator
                </Link>
            </section>

            {user?.id === userId && <UpdateUserComponent />}
        </main>
    );
}

export default ProfilePage;
