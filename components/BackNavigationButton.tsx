"use client";

import { useRouter } from "next/navigation";

export default function BackNavigationButton() {
    const router = useRouter();
    return (
        <button
            className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white px-2 py-1 sm:px-4 sm:py-2"
            onClick={router.back}
        >
            Go Back
        </button>
    );
}
