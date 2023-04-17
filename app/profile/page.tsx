"use client"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

function ProfilePage() {
	const { signOut } = useAuth();
    const router = useRouter();

    const signOutUser = async () => {
        await signOut();
        router.refresh();
    }

	return (
		<main className="h-screen w-full flex justify-center items-center">
			<button onClick={signOutUser}>Sign out</button>
		</main>
	);
}

export default ProfilePage;
