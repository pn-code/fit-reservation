"use client";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function ProfilePage() {
    const { signOut } = useAuth();
    const router = useRouter();

    const user = useUser().user;
    console.log(user);

    const signOutUser = async () => {
        await signOut();
        router.refresh();
    };

    return (
        <main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-10 text-white/90">
            <header className="flex justify-between font-bold pb-2 border-b-2 border-b-indigo-600 items-center">
                <h1 className="text-3xl">Profile</h1>
                <button
                    className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 font-semibold"
                    onClick={signOutUser}
                >
                    Sign out
                </button>
            </header>

            {/* User Information */}
            <section className="flex gap-4 items-center">
                <Image
                    className="rounded-full"
                    src={user?.profileImageUrl || ""}
                    alt={`${user?.fullName} profile picture`}
                    width={60}
                    height={60}
                />
                <h2 className="text-2xl font-semibold text-amber-400">{user?.fullName}</h2>
            </section>
        </main>
    );
}

export default ProfilePage;
