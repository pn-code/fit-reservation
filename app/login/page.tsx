import { SignIn } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Login | FitHeroes",
    description: "Login to your FitHeroes account.",
};

export default function LoginPage() {
	return (
		<main className="h-[calc(100vh-100px)] w-full flex justify-center items-center">
			<SignIn signUpUrl="/register" />
		</main>
	);
}