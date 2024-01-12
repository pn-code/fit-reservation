"use client";

import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

export default function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const signOutUser = async () => {
    await signOut();
    router.refresh();
  };
  return (
    <button
      className="btn btn--danger"
      onClick={signOutUser}
    >
      Sign out
    </button>
  );
}
