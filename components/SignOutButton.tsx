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
            className="text-sm sm:text-[16px] px-2 py-1 sm:px-4 sm:py-2 bg-red-600 rounded-md text-white hover:bg-red-700 font-semibold"
            onClick={signOutUser}
        >
            Sign out
        </button>
    );
}
