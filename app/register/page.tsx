import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
	return (
		<main className="h-screen w-full flex justify-center items-center">
			<SignUp signInUrl="/sign-in" />
		</main>
	);
}