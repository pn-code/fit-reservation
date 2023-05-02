"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
    const { signOut } = useAuth();
    const router = useRouter();

    const signOutUser = async () => {
        await signOut();
        router.refresh();
    };
    return (
        <button
            className="px-4 py-2 bg-red-600 rounded-md text-white hover:bg-red-700 font-semibold"
            onClick={signOutUser}
        >
            Sign out
        </button>
    );
}
