"use client";
import { useAuth } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/app-beta";
import { useRouter } from "next/navigation";

function ProfilePage() {
    const { signOut } = useAuth();
    const router = useRouter();

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
            <section>
                <p>Currently, not much to see...</p>
            </section>
        </main>
    );
}

export default ProfilePage;
