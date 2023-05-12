import SignOutButton from "../../../components/SignOutButton";
import { clerkClient, currentUser } from "@clerk/nextjs/app-beta";
import StripeCheckOutButton from "../../../components/StripeCheckOutButton";
import { prisma } from "../../../lib/client";
import { Check } from "lucide-react";
import UpdateUserComponent from "../../../components/UpdateUserComponent";

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
        <main className="w-full min-h-[calc(100vh-90px)] bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Profile</h1>
                <SignOutButton />
            </header>

            {/* User Information */}
            <section className="flex gap-4 items-center">
                <h2 className="text-2xl font-semibold text-amber-300 flex gap-4">
                    {`${userOnProfile?.firstName} ${userOnProfile?.lastName}`}
                </h2>
                {userIsSubscribed && (
                    <span className="bg-indigo-600 rounded-full p-1 border-2 border-indigo-700 flex justify-center items-center">
                        <Check />
                    </span>
                )}
            </section>

            <section className="flex gap-4">
                {user?.id === userId && <UpdateUserComponent />}
            </section>

            {/* Upgrade Profile */}
            {!userIsSubscribed && userId === user?.id && (
                <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <section>
                        <h2 className="text-2xl font-semibold text-amber-300">
                            Upgrade account to premium
                        </h2>
                        <p>Gain immediate access to the Builder Page</p>
                    </section>
                    <StripeCheckOutButton />
                </section>
            )}
        </main>
    );
}

export default ProfilePage;
