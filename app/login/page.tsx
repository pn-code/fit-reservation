import { SignIn } from "@clerk/nextjs/app-beta";

export default function LoginPage() {
	return (
		<main className="h-screen w-full flex justify-center items-center">
			<SignIn signUpUrl="/register" />
		</main>
	);
}