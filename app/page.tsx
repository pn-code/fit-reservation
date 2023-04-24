import Link from "next/link";

export default function Home() {
	return <main className="w-full h-full mt-24 bg-[#f3f3f3] px-4 py-6 rounded-md flex flex-col gap-4 shadow-md">
		<h1>Welcome to FitHeroes</h1>

		<section>
			<Link href={"/login"}>Login</Link>
		</section>
	</main>;
}
