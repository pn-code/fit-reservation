import { SignIn } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Login | FitHeroes",
    description: "Login to your FitHeroes account.",
};

export default function LoginPage() {
	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
			<SignIn signUpUrl="/register" />
		</main>
	);
}