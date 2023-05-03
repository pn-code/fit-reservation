import Image from "next/image";
import SignOutButton from "../../../components/SignOutButton";
import { clerkClient } from "@clerk/nextjs/app-beta";

interface Props {
    params: {
        userId: string;
    };
}

async function ProfilePage({ params }: Props) {
    const { userId } = params;
    const user = await clerkClient.users.getUser(userId);

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Profile</h1>
                <SignOutButton />
            </header>

            {/* User Information */}
            <section className="flex gap-4 items-center">
                <Image
                    className="rounded-full"
                    src={user?.profileImageUrl || ""}
                    alt={`${user?.firstName} profile picture`}
                    width={60}
                    height={60}
                />
                <h2 className="text-2xl font-semibold text-amber-300">
                    {`${user?.firstName} ${user?.lastName}`}
                </h2>
            </section>

            {/* User Stats */}

            {/* Upgrade Profile */}
            <section className="flex flex-col gap-4 sm:flex-row sm:justify-between">
                <section>
                    <h2 className="text-2xl font-semibold text-amber-300">
                        Upgrade account to premium
                    </h2>
                    <p>Gain immediate access to the Builder Page</p>
                </section>
                <button className="rounded-md px-4 py-2 bg-green-500 hover:bg-green-600 text-white/90 hover:text-white font-semibold">
                    Upgrade
                </button>
            </section>
        </main>
    );
}

export default ProfilePage;
