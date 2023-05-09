import { SignUp } from "@clerk/nextjs/app-beta";

export const metadata = {
    title: "Register | FitHeroes",
    description: "Sign up for FitHeroes",
};

export default function Page() {
	return (
		<main className="w-full h-full bg-slate-800 py-6 rounded-md flex flex-col gap-4 shadow-md px-2 sm:px-10 text-white/90">
			<SignUp signInUrl="/login" />
		</main>
	);
}