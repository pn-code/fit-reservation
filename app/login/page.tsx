import { SignIn } from "@clerk/nextjs/app-beta";

export default function LoginPage() {
	return (
		<main className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
			<SignIn signUpUrl="/register" />
		</main>
	);
}