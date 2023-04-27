import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
	return (
		<main className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
			<SignUp signInUrl="/login" />
		</main>
	);
}