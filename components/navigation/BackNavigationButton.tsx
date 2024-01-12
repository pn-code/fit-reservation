"use client";

import { useRouter } from "next/navigation";

export default function BackNavigationButton() {
    const router = useRouter();
    return (
        <button
            className="btn btn--secondary"
            onClick={router.back}
        >
            Go Back
        </button>
    );
}
